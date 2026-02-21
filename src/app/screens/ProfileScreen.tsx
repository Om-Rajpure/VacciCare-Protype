import { BottomNav } from "../components/BottomNav";
import { User, Baby, Bell, Globe, Shield, HelpCircle, LogOut, ChevronRight, QrCode, CheckCircle, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const TODAY = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

export default function ProfileScreen() {
  const [showQR, setShowQR] = useState(false);

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
        <h2 className="text-white mb-1">Profile</h2>
        <p className="text-white/80 text-sm">Manage your account & vaccination record</p>
      </div>

      <div className="px-6 -mt-8">
        {/* User Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-3xl shadow-lg p-6 mb-5">
          <div className="flex items-center space-x-4 mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6b9bd1] to-[#5a8bc1] rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#2d3748] font-bold mb-0.5">Priya Sharma</h3>
              <p className="text-gray-500 text-sm">+91 98765 43210</p>
              <p className="text-gray-400 text-xs">priya.sharma@email.com</p>
              <div className="mt-1.5 flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs text-green-600 font-medium">Verified Account</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-[#e8f4f8] text-[#6b9bd1] py-3 rounded-xl hover:bg-[#d0e8f0] transition-colors font-medium">
            Edit Profile
          </button>
        </motion.div>

        {/* Baby Info Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-r from-[#ffccd5] to-[#f8b4d8] rounded-2xl shadow-lg p-5 mb-5">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md">
              <Baby className="w-8 h-8 text-pink-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold mb-0.5">Baby Aarav</h3>
              <p className="text-white/90 text-sm">8 months old · Male</p>
              <p className="text-white/70 text-xs">Born: June 15, 2025</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-lg p-5 mb-5">
          <h4 className="text-[#2d3748] mb-4 font-semibold">Vaccination Summary</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center bg-green-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-green-600 mb-1">6</div>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            <div className="text-center bg-blue-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-blue-600 mb-1">4</div>
              <p className="text-xs text-gray-500">Upcoming</p>
            </div>
            <div className="text-center bg-red-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-red-600 mb-1">2</div>
              <p className="text-xs text-gray-500">Missed</p>
            </div>
          </div>
        </motion.div>

        {/* Digital Vaccination Certificate */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl shadow-lg overflow-hidden mb-5">
          {/* Certificate Header */}
          <div className="bg-gradient-to-r from-[#1a365d] to-[#2b6cb0] px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-yellow-300" />
                <div>
                  <p className="text-white font-bold text-sm">Digital Vaccination Summary</p>
                  <p className="text-blue-200 text-[10px]">Government of India · Ministry of Health</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-200 text-[9px]">Issued by</p>
                <p className="text-white text-[10px] font-semibold">VacciTrack Platform</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {/* Beneficiary Details */}
            <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
              <p className="text-[10px] text-blue-500 uppercase tracking-wider font-semibold mb-2">Beneficiary Details</p>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="font-semibold text-gray-800">Baby Aarav Sharma</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Date of Birth</p>
                  <p className="font-semibold text-gray-800">15 Jun 2025</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Gender</p>
                  <p className="font-semibold text-gray-800">Male</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Guardian</p>
                  <p className="font-semibold text-gray-800">Priya Sharma</p>
                </div>
              </div>
            </div>

            {/* Vaccination Count */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-1 bg-green-50 rounded-xl p-3 text-center border border-green-100">
                <p className="text-2xl font-bold text-green-600">6</p>
                <p className="text-[10px] text-green-600 font-medium">Vaccines Completed</p>
              </div>
              <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                <p className="text-2xl font-bold text-blue-600">14</p>
                <p className="text-[10px] text-blue-600 font-medium">Vaccines Scheduled</p>
              </div>
            </div>

            {/* QR Code Section */}
            <div
              className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-[#6b9bd1] transition-colors"
              onClick={() => setShowQR(!showQR)}
            >
              {showQR ? (
                <>
                  {/* Realistic QR placeholder */}
                  <div className="w-40 h-40 mx-auto mb-3 bg-white border border-gray-200 rounded-lg p-2 shadow-inner">
                    <div className="w-full h-full grid grid-cols-7 gap-[2px]">
                      {Array.from({ length: 49 }).map((_, i) => (
                        <div
                          key={i}
                          className="rounded-[1px]"
                          style={{
                            backgroundColor: Math.random() > 0.45 ? '#1a202c' : 'transparent'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 mb-0.5">Scan to verify authenticity</p>
                  <p className="text-[10px] text-gray-400">Certificate ID: VT-2025-AA-78234</p>
                </>
              ) : (
                <>
                  <QrCode className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#6b9bd1]">Tap to reveal QR code</p>
                  <p className="text-[10px] text-gray-400">Digital vaccination certificate</p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <p className="text-[10px] text-gray-400">Last updated: {TODAY}</p>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                <p className="text-[10px] text-green-600 font-medium">Digitally Verified</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-3 mb-5">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="w-full bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-all flex items-center space-x-4 border border-gray-50"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="flex-1 text-left text-[#2d3748] font-medium">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </motion.button>
            );
          })}
        </div>

        {/* App Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl shadow-sm p-4 mb-4 text-center border border-gray-50">
          <p className="text-gray-500 text-sm font-medium">VacciTrack v2.0</p>
          <p className="text-xs text-gray-400">Smart Family Immunization Compliance Platform</p>
          <p className="text-xs text-gray-400 mt-0.5">Made with ❤️ for Indian families</p>
        </motion.div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full bg-white border border-red-200 text-red-500 py-4 rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center space-x-2 shadow-sm"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
