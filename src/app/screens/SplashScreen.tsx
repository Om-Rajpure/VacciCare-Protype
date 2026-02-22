import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Shield, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function SplashScreen() {
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        navigate("/onboarding");
      }
    }, 3200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white">
      {/* Soft blue background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f7ff] via-white to-[#e6f9f2]" />

      {/* Subtle decorative circles */}
      <div className="absolute top-16 left-8 w-48 h-48 bg-[#2F80ED]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-24 right-8 w-56 h-56 bg-[#27AE60]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#2F80ED]/3 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Shield + Cross Icon */}
          <div className="relative">
            {/* Outer glow ring */}
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-32 h-32 rounded-3xl bg-[#2F80ED]/15 blur-md"
            />
            {/* Main icon box */}
            <div className="relative w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-[#2F80ED]/10">
              {/* Shield icon */}
              <div className="relative">
                <Shield
                  className="w-16 h-16 text-[#2F80ED]"
                  strokeWidth={1.5}
                />
                {/* Green checkmark overlay */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border border-[#27AE60]/20">
                  <CheckCircle
                    className="w-5 h-5 text-[#27AE60]"
                    strokeWidth={2}
                    fill="none"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mb-3"
        >
          <h1 className="text-4xl font-bold text-[#1a2b4a] tracking-tight mb-1">
            VacciCare
          </h1>
          <div className="flex items-center justify-center space-x-1.5">
            <div className="h-[2px] w-8 bg-[#27AE60] rounded-full" />
            <span className="text-[#27AE60] text-xs font-semibold tracking-widest uppercase">
              Immunization
            </span>
            <div className="h-[2px] w-8 bg-[#27AE60] rounded-full" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-gray-500 text-sm text-center px-8 max-w-xs leading-relaxed mb-14"
        >
          Smart Immunization Compliance System
        </motion.p>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex space-x-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: ["#d1d5db", "#2F80ED", "#d1d5db"],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full bg-gray-300"
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 flex items-center space-x-2"
      >
        <Shield className="w-3.5 h-3.5 text-[#2F80ED]/50" />
        <p className="text-[11px] text-gray-400 font-medium tracking-wide">
          Powered by India's UIP Guidelines
        </p>
      </motion.div>
    </div>
  );
}
