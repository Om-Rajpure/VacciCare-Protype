import { useNavigate } from "react-router";
import { BottomNav } from "../components/BottomNav";
import {
  Bell, Heart, MapPin, Calendar, BookOpen, AlertTriangle, Syringe, CircleCheck, Clock
} from "lucide-react";
import { motion } from "motion/react";
import { useStore } from "../store/useStore";
import { differenceInDays } from "date-fns";

export default function HomeScreen() {
  const navigate = useNavigate();
  const currentUser = useStore(state => state.currentUser);
  const selectedMemberId = useStore(state => state.selectedMemberId);
  const familyMembers = useStore(state => state.familyMembers);
  const vaccines = useStore(state => state.vaccines);

  const member = familyMembers.find(m => m.id === selectedMemberId);
  const memberVaccines = vaccines.filter(v => v.memberId === selectedMemberId);

  const today = new Date();
  const completed = memberVaccines.filter(v => v.status === "completed").length;
  const missed = memberVaccines.filter(v => v.status === "missed").length;
  const total = memberVaccines.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const nextUpcoming = memberVaccines
    .filter(v => v.status === "upcoming")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

  const daysUntilNext = nextUpcoming
    ? differenceInDays(new Date(nextUpcoming.dueDate), today)
    : null;

  const barColor =
    missed > 0 && memberVaccines.filter(v => v.status === "missed").some(v => differenceInDays(today, new Date(v.dueDate)) >= 4)
      ? "from-red-500 to-red-400"
      : missed > 0
        ? "from-orange-400 to-orange-300"
        : daysUntilNext !== null && daysUntilNext <= 3
          ? "from-yellow-400 to-yellow-300"
          : "from-[#2EC4B6] to-[#48bb78]";

  const quickActions = [
    { icon: Heart, label: "Side Effect Care", color: "from-[#ffccd5] to-[#f8b4d8]", path: "/side-effects" },
    { icon: MapPin, label: "Search Centers", color: "from-[#a8d8ea] to-[#6b9bd1]", path: "/centers" },
    { icon: Calendar, label: "Vaccine Schedule", color: "from-[#c7f0db] to-[#a8e6cf]", path: "/schedule" },
    { icon: BookOpen, label: "Doctor Articles", color: "from-[#ffd4a3] to-[#f6ad55]", path: "/articles" },
    { icon: AlertTriangle, label: "Missed Vaccine", color: "from-[#fc8181] to-[#f56565]", path: "/missed" },
    { icon: Syringe, label: "Painless Info", color: "from-[#d5c9f7] to-[#b8a8e6]", path: "/painless" },
  ];

  const firstName = currentUser?.username?.split(" ")[0] || "User";

  return (
    <div className="min-h-screen bg-[#fafbfd] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a5276] to-[#2980b9] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm mb-0.5">Hello,</p>
            <h2 className="text-white font-bold">{firstName} 👋</h2>
          </div>
          <button
            onClick={() => navigate("/notifications")}
            className="relative w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <Bell className="w-6 h-6 text-white" />
            {missed > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-400 rounded-full ring-2 ring-white" />
            )}
          </button>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Member Profile Card */}
        {member ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl shadow-lg p-6 mb-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ffccd5] to-[#f8b4d8] rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-md">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-[#2d3748] font-bold mb-0.5">{member.name}</h3>
                <p className="text-gray-500 text-sm mb-0.5">{member.age} years old · {member.relationship}</p>
                {nextUpcoming && (
                  <div className="flex items-center space-x-1 text-sm">
                    <Clock className="w-3.5 h-3.5 text-[#f6ad55]" />
                    <span className="text-gray-500 text-xs">Next: {nextUpcoming.vaccineName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Vaccination Progress */}
            <div className="bg-[#f7fafc] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">Vaccination Progress</span>
                <span className={`text-sm font-bold ${missed > 0 ? "text-red-600" : "text-[#2EC4B6]"}`}>
                  {percentage}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className={`h-full bg-gradient-to-r ${barColor} rounded-full relative`}
                >
                  {missed >= 2 && (
                    <motion.div
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 rounded-full bg-white/30"
                    />
                  )}
                </motion.div>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs">
                <div className="flex items-center space-x-1">
                  <CircleCheck className="w-3.5 h-3.5 text-[#48bb78]" />
                  <span className="text-gray-500">{completed} Completed</span>
                </div>
                {missed > 0 && (
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-red-500 font-semibold">{missed} Overdue</span>
                  </div>
                )}
                {missed === 0 && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#f6ad55]" />
                    <span className="text-gray-500">{memberVaccines.filter(v => v.status === "upcoming").length} Upcoming</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-3xl shadow-lg p-6 mb-6 text-center">
            <p className="text-gray-400 text-sm">Add a family member to see progress</p>
          </motion.div>
        )}

        {/* Quick Actions */}
        <h3 className="text-[#2d3748] font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.07 }}
                onClick={() => navigate(action.path)}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-700 text-sm text-left leading-snug font-medium">{action.label}</p>
                {action.path === "/missed" && missed > 0 && (
                  <span className="mt-1 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-semibold">
                    {missed} overdue
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Upcoming / Overdue Vaccine Alert */}
        {missed > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-5 shadow-md border-l-4 border-red-500 mb-4"
          >
            <div className="flex items-start space-x-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <AlertTriangle className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h4 className="text-red-800 font-bold mb-0.5">⚠ {missed} Vaccine{missed > 1 ? "s" : ""} Overdue</h4>
                <p className="text-red-600 text-sm mb-2">Immediate action required. Daily reminders active.</p>
                <button
                  onClick={() => navigate("/missed")}
                  className="text-red-600 text-sm font-semibold hover:text-red-800 transition-colors"
                >
                  View & Mark Done →
                </button>
              </div>
            </div>
          </motion.div>
        ) : nextUpcoming ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className={`rounded-2xl p-5 shadow-md border-l-4 mb-4 ${daysUntilNext !== null && daysUntilNext <= 3
                ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-400"
                : "bg-gradient-to-r from-[#fff5e6] to-[#ffe8cc] border-[#f6ad55]"
              }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${daysUntilNext !== null && daysUntilNext <= 3 ? "bg-yellow-400" : "bg-[#f6ad55]"}`}>
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-[#2d3748] font-bold mb-0.5">Upcoming Vaccine</h4>
                <p className="text-gray-600 text-sm mb-2">
                  {nextUpcoming.vaccineName} —{" "}
                  {daysUntilNext === 0 ? "Due Today!" : daysUntilNext === 1 ? "Due Tomorrow!" : `in ${daysUntilNext} days`}
                </p>
                <button
                  onClick={() => navigate("/notifications")}
                  className="text-[#f6ad55] text-sm font-medium hover:underline"
                >
                  Set Reminder →
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>

      <BottomNav />
    </div>
  );
}
