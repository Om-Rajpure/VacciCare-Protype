import { BottomNav } from "../components/BottomNav";
import { User, Baby, Bell, Globe, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function ProfileScreen() {
  const menuItems = [
    { icon: Baby, label: "Baby Profile", color: "from-[#ffccd5] to-[#f8b4d8]" },
    { icon: Bell, label: "Notifications", color: "from-[#ffd4a3] to-[#f6ad55]" },
    { icon: Globe, label: "Language", color: "from-[#a8d8ea] to-[#6b9bd1]" },
    { icon: Shield, label: "Privacy & Security", color: "from-[#c7f0db] to-[#a8e6cf]" },
    { icon: HelpCircle, label: "Help & Support", color: "from-[#d5c9f7] to-[#b8a8e6]" },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfd] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6b9bd1] to-[#5a8bc1] px-6 pt-12 pb-16 rounded-b-[2rem] shadow-lg">
        <h2 className="text-white mb-2">Profile</h2>
        <p className="text-white/90 text-sm">Manage your account</p>
      </div>

      <div className="px-6 -mt-8">
        {/* User Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6b9bd1] to-[#5a8bc1] rounded-2xl flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#2d3748] mb-1">Priya Sharma</h3>
              <p className="text-gray-600 text-sm mb-1">+91 98765 43210</p>
              <p className="text-gray-500 text-xs">priya.sharma@email.com</p>
            </div>
          </div>

          <button className="w-full bg-[#e8f4f8] text-[#6b9bd1] py-3 rounded-xl hover:bg-[#d0e8f0] transition-colors">
            Edit Profile
          </button>
        </motion.div>

        {/* Baby Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#ffccd5] to-[#f8b4d8] rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1603298624547-e38905ce21d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYmFieSUyMHNtaWxpbmclMjBoYXBweXxlbnwxfHx8fDE3NzE0MjQ1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Baby Aarav"
                className="w-16 h-16 rounded-2xl object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1">Baby Aarav</h3>
              <p className="text-white/90 text-sm mb-1">8 months old</p>
              <p className="text-white/80 text-xs">Born: June 15, 2025</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="w-full bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all flex items-center space-x-4"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="flex-1 text-left text-[#2d3748]">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            );
          })}
        </div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h4 className="text-[#2d3748] mb-4">Vaccination Summary</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e8f4f8] rounded-2xl flex items-center justify-center mx-auto mb-2">
                <span className="text-xl text-[#6b9bd1]">6</span>
              </div>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#fff5e6] rounded-2xl flex items-center justify-center mx-auto mb-2">
                <span className="text-xl text-[#f6ad55]">4</span>
              </div>
              <p className="text-xs text-gray-600">Upcoming</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#fff5f5] rounded-2xl flex items-center justify-center mx-auto mb-2">
                <span className="text-xl text-[#fc8181]">2</span>
              </div>
              <p className="text-xs text-gray-600">Missed</p>
            </div>
          </div>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-5 mb-4"
        >
          <div className="text-center text-gray-600 text-sm space-y-1">
            <p>BabyCare+ Version 1.0.0</p>
            <p className="text-xs text-gray-500">Made with ❤️ for Indian parents</p>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full bg-white border border-[#fc8181] text-[#fc8181] py-4 rounded-2xl hover:bg-[#fff5f5] transition-colors flex items-center justify-center space-x-2 shadow-md"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
