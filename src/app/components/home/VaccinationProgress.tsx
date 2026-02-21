import { useStore } from '../../store/useStore';
import { Activity, CheckCircle, Clock, AlertCircle, AlertTriangle, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { differenceInDays } from 'date-fns';

// Weighted compliance formula:
// each overdue vaccine reduces score more than just uncompleted.
// Penalty multiplier: 1–3 days = 1.5x, 4–7 days = 2x, 7+ days = 3x
function computeWeightedCompliance(
  completed: number,
  total: number,
  overdueVaccines: { overdueDays: number }[]
): number {
  if (total === 0) return 100;
  let penalty = 0;
  for (const v of overdueVaccines) {
    if (v.overdueDays >= 7) penalty += 2; // 3x effectively = 1 base + 2 extra
    else if (v.overdueDays >= 4) penalty += 1; // 2x = 1 base + 1 extra
    else penalty += 0.5; // 1.5x = 1 base + 0.5 extra
  }
  const score = Math.max(0, ((completed - penalty) / total) * 100);
  return Math.round(score);
}

type BarState = 'green' | 'yellow' | 'orange' | 'red';

function getBarState(
  missedCount: number,
  upcomingWithin3Days: number,
  overdueWithin3: number,
  overdue4Plus: number
): BarState {
  if (missedCount === 0 && upcomingWithin3Days === 0) return 'green';
  if (overdueWithin3 > 0 || overdue4Plus > 0) {
    if (overdue4Plus > 0) return 'red';
    return 'orange';
  }
  if (upcomingWithin3Days > 0) return 'yellow';
  return 'green';
}

const barColors: Record<BarState, string> = {
  green: 'from-[#38a169] to-[#48bb78]',
  yellow: 'from-[#d69e2e] to-[#ecc94b]',
  orange: 'from-[#c05621] to-[#ed8936]',
  red: 'from-[#c53030] to-[#fc4444]',
};

const barBgColors: Record<BarState, string> = {
  green: '#48bb78',
  yellow: '#ecc94b',
  orange: '#ed8936',
  red: '#fc4444',
};

export function VaccinationProgress() {
  const selectedMemberId = useStore(state => state.selectedMemberId);
  const vaccines = useStore(state => state.vaccines);
  const familyMembers = useStore(state => state.familyMembers);

  const member = familyMembers.find(m => m.id === selectedMemberId);
  const memberVaccines = vaccines.filter(v => v.memberId === selectedMemberId);

  const completed = memberVaccines.filter(v => v.status === 'completed').length;
  const upcoming = memberVaccines.filter(v => v.status === 'upcoming').length;
  const missed = memberVaccines.filter(v => v.status === 'missed').length;
  const total = memberVaccines.length;

  const today = new Date();

  // Compute overdue breakdown
  const overdueVaccines = memberVaccines
    .filter(v => v.status === 'missed')
    .map(v => ({
      ...v,
      overdueDays: differenceInDays(today, new Date(v.dueDate)),
    }));

  const overdueWithin3 = overdueVaccines.filter(v => v.overdueDays >= 1 && v.overdueDays <= 3);
  const overdue4Plus = overdueVaccines.filter(v => v.overdueDays >= 4);
  const overdue7Plus = overdueVaccines.filter(v => v.overdueDays >= 7);

  // Upcoming within 3 days
  const upcomingWithin3Days = memberVaccines.filter(v => {
    if (v.status !== 'upcoming') return false;
    const days = differenceInDays(new Date(v.dueDate), today);
    return days >= 0 && days <= 3;
  }).length;

  const barState = getBarState(missed, upcomingWithin3Days, overdueWithin3.length, overdue4Plus.length);
  const weightedCompliance = computeWeightedCompliance(completed, total, overdueVaccines);
  const simplePercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const hasMultipleOverdue = missed >= 2;
  const hasSevereOverdue = overdue7Plus.length > 0;

  if (!member) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Select a family member to view progress</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Vaccination Progress</h2>
        <div className="w-10 h-10 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center">
          <Activity className="w-5 h-5 text-[#2EC4B6]" />
        </div>
      </div>

      {/* Compliance Score */}
      <div className="mb-2 flex items-end justify-between">
        <div>
          <span className="text-sm font-medium text-gray-500">Compliance Score</span>
          {missed > 0 && (
            <div className="flex items-center space-x-1 mt-0.5">
              <TrendingDown className="w-3 h-3 text-red-500" />
              <span className="text-[10px] text-red-500 font-medium">Overdue penalty applied</span>
            </div>
          )}
        </div>
        <div className="text-right">
          <span
            className="text-3xl font-bold"
            style={{ color: barBgColors[barState] }}
          >
            {weightedCompliance}%
          </span>
          {missed > 0 && (
            <div className="text-[10px] text-gray-400 text-right">
              {simplePercentage}% raw
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Progress Bar */}
      <div className="mb-2">
        <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${simplePercentage}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${barColors[barState]} rounded-full relative`}
          >
            {/* Pulsing overlay when multiple overdue */}
            {hasMultipleOverdue && (
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 rounded-full bg-white/30"
              />
            )}
          </motion.div>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">{completed} of {total} vaccines completed</p>
          {barState === 'red' && (
            <span className="text-xs font-semibold text-red-600 flex items-center space-x-1">
              <AlertTriangle className="w-3 h-3" />
              <span>Urgent</span>
            </span>
          )}
          {barState === 'orange' && (
            <span className="text-xs font-semibold text-orange-600">Overdue</span>
          )}
          {barState === 'yellow' && (
            <span className="text-xs font-semibold text-yellow-600">Due Soon</span>
          )}
          {barState === 'green' && (
            <span className="text-xs font-semibold text-green-600">On Track ✓</span>
          )}
        </div>
      </div>

      {/* Severe Overdue Banner */}
      {hasSevereOverdue && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 mt-2 flex items-start space-x-2 bg-red-50 border border-red-200 rounded-xl p-3"
        >
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          </motion.div>
          <div>
            <p className="text-xs font-bold text-red-700">
              ⚠ {overdue7Plus.length} vaccine{overdue7Plus.length > 1 ? 's' : ''} 7+ days overdue – High Priority
            </p>
            <p className="text-[10px] text-red-500 mt-0.5">
              Contact your health worker or vaccination center immediately.
            </p>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="space-y-3 mt-4">
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Completed</p>
              <p className="text-xs text-gray-500">Successfully administered</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-green-600">{completed}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Upcoming</p>
              <p className="text-xs text-gray-500">
                {upcomingWithin3Days > 0
                  ? `${upcomingWithin3Days} due within 3 days!`
                  : 'Scheduled for future'}
              </p>
            </div>
          </div>
          <span className="text-2xl font-bold text-blue-600">{upcoming}</span>
        </div>

        {missed > 0 && (
          <div
            className={`flex items-center justify-between p-4 rounded-lg border ${
              overdue4Plus.length > 0
                ? 'bg-red-50 border-red-300'
                : 'bg-orange-50 border-orange-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  overdue4Plus.length > 0 ? 'bg-red-100' : 'bg-orange-100'
                }`}
              >
                <AlertCircle
                  className={`w-5 h-5 ${
                    overdue4Plus.length > 0 ? 'text-red-600' : 'text-orange-600'
                  }`}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Overdue</p>
                <div className="flex flex-col gap-0.5">
                  {overdueWithin3.length > 0 && (
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full w-fit">
                      {overdueWithin3.length} overdue 1–3 days
                    </span>
                  )}
                  {overdue4Plus.filter(v => v.overdueDays < 7).length > 0 && (
                    <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full w-fit">
                      {overdue4Plus.filter(v => v.overdueDays < 7).length} overdue 4–6 days
                    </span>
                  )}
                  {overdue7Plus.length > 0 && (
                    <span className="text-[10px] bg-red-200 text-red-800 font-bold px-2 py-0.5 rounded-full w-fit">
                      ⚠ {overdue7Plus.length} HIGH PRIORITY (7+ days)
                    </span>
                  )}
                </div>
              </div>
            </div>
            <span
              className={`text-2xl font-bold ${
                overdue4Plus.length > 0 ? 'text-red-600' : 'text-orange-600'
              }`}
            >
              {missed}
            </span>
          </div>
        )}
      </div>

      {simplePercentage === 100 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
          <p className="text-center text-green-700 font-medium">
            🎉 All vaccinations completed! Great job keeping {member.name} protected!
          </p>
        </div>
      )}
    </div>
  );
}
