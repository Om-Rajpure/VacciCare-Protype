import { useState } from "react";
import { useNavigate } from "react-router";
import { Phone, Globe } from "lucide-react";
import { motion } from "motion/react";

export default function LoginScreen() {
  const [mobile, setMobile] = useState("");
  const [language, setLanguage] = useState("english");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (mobile.length === 10) {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafbfd] to-[#e8f4f8] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Illustration */}
          <div className="mb-8 flex justify-center">
            <div className="w-40 h-40 bg-gradient-to-br from-[#a8d8ea] to-[#6b9bd1] rounded-3xl shadow-2xl flex items-center justify-center">
              <Phone className="w-20 h-20 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center mb-2 text-[#2d3748]">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Login to continue protecting your baby
          </p>

          {/* Language Selection */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 text-gray-700 mb-3">
              <Globe className="w-5 h-5 text-[#6b9bd1]" />
              <span>Select Language</span>
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6b9bd1] transition-all"
            >
              <option value="english">🇬🇧 English</option>
              <option value="hindi">🇮🇳 हिंदी (Hindi)</option>
              <option value="marathi">🇮🇳 मराठी (Marathi)</option>
            </select>
          </div>

          {/* Mobile Input */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 text-gray-700 mb-3">
              <Phone className="w-5 h-5 text-[#6b9bd1]" />
              <span>Mobile Number</span>
            </label>
            <div className="flex space-x-2">
              <div className="w-16 p-4 bg-white border border-gray-200 rounded-2xl flex items-center justify-center">
                <span className="text-gray-600">+91</span>
              </div>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                placeholder="9876543210"
                className="flex-1 p-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6b9bd1] transition-all"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={mobile.length !== 10}
            className="w-full bg-[#6b9bd1] text-white py-4 rounded-2xl shadow-lg hover:bg-[#5a8bc1] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send OTP
          </button>

          {/* Info Text */}
          <p className="text-center text-gray-500 mt-6 text-sm">
            We'll send you a verification code via SMS
          </p>
        </motion.div>
      </div>
    </div>
  );
}
