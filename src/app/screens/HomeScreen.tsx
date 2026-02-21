import { useNavigate } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { 
  Bell, 
  Heart, 
  MapPin, 
  Calendar, 
  BookOpen, 
  AlertTriangle, 
  Syringe,
  CircleCheck,
  Clock
} from "lucide-react";
import { motion } from "motion/react";

export default function HomeScreen() {
  const navigate = useNavigate();

  const quickActions = [
    { icon: Heart, label: "Side Effect Care", color: "from-[#ffccd5] to-[#f8b4d8]", path: "/side-effects" },
    { icon: MapPin, label: "Search Centers", color: "from-[#a8d8ea] to-[#6b9bd1]", path: "/centers" },
    { icon: Calendar, label: "Vaccine Schedule", color: "from-[#c7f0db] to-[#a8e6cf]", path: "/schedule" },
    { icon: BookOpen, label: "Doctor Articles", color: "from-[#ffd4a3] to-[#f6ad55]", path: "/articles" },
    { icon: AlertTriangle, label: "Missed Vaccine", color: "from-[#fc8181] to-[#f56565]", path: "/missed" },
    { icon: Syringe, label: "Painless Info", color: "from-[#d5c9f7] to-[#b8a8e6]", path: "/painless" },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfd] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6b9bd1] to-[#5a8bc1] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/90 text-sm mb-1">Hello,</p>
            <h2 className="text-white">Priya Sharma 👋</h2>
          </div>
          <button 
            onClick={() => navigate("/notifications")}
            className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
          >
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-10 right-6 w-2 h-2 bg-[#fc8181] rounded-full" />
          </button>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Baby Profile Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#ffccd5] to-[#f8b4d8] rounded-2xl flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1603298624547-e38905ce21d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYmFieSUyMHNtaWxpbmclMjBoYXBweXxlbnwxfHx8fDE3NzE0MjQ1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Baby Aarav"
                className="w-20 h-20 rounded-2xl object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-[#2d3748] mb-1">Baby Aarav</h3>
              <p className="text-gray-600 text-sm mb-1">8 months old</p>
              <div className="flex items-center space-x-1 text-sm">
                <Clock className="w-4 h-4 text-[#f6ad55]" />
                <span className="text-gray-600">Next: BCG Booster</span>
              </div>
            </div>
          </div>

          {/* Vaccination Progress */}
          <div className="bg-[#f7fafc] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700">Vaccination Progress</span>
              <span className="text-[#6b9bd1]">60%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[#6b9bd1] to-[#48bb78] rounded-full"
              />
            </div>
            <div className="flex items-center justify-between mt-3 text-sm">
              <div className="flex items-center space-x-1">
                <CircleCheck className="w-4 h-4 text-[#48bb78]" />
                <span className="text-gray-600">6 Completed</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-[#f6ad55]" />
                <span className="text-gray-600">4 Upcoming</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <h3 className="text-[#2d3748] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => navigate(action.path)}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-gray-700 text-sm text-left leading-snug">
                  {action.label}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Upcoming Vaccine Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-gradient-to-r from-[#fff5e6] to-[#ffe8cc] rounded-2xl p-5 shadow-md border-l-4 border-[#f6ad55]"
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-[#f6ad55] rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-[#2d3748] mb-1">Upcoming Vaccine</h4>
              <p className="text-gray-600 text-sm mb-2">
                BCG Booster due in 3 days (Feb 21, 2026)
              </p>
              <button className="text-[#f6ad55] text-sm hover:underline">
                Set Reminder →
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
