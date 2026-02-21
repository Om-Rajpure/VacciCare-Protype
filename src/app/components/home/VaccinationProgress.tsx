import { useStore } from '../../store/useStore';
import { Activity, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

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
  
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

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

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Overall Completion</span>
          <span className="text-3xl font-bold text-[#2EC4B6]">{percentage}%</span>
        </div>
        
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#2EC4B6] to-[#4CC9F0] rounded-full"
          />
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          {completed} of {total} vaccines completed
        </p>
      </div>

      <div className="space-y-3">
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
              <p className="text-xs text-gray-500">Scheduled for future</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-blue-600">{upcoming}</span>
        </div>

        {missed > 0 && (
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Missed</p>
                <p className="text-xs text-gray-500">Requires attention</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-red-600">{missed}</span>
          </div>
        )}
      </div>

      {percentage === 100 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
          <p className="text-center text-green-700 font-medium">
            🎉 All vaccinations completed! Great job keeping {member.name} protected!
          </p>
        </div>
      )}
    </div>
  );
}
