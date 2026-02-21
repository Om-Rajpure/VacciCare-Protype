import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface Vaccine {
  name: string;
  date: string;
  status: "completed" | "upcoming" | "missed";
  disease: string;
}

export default function ScheduleScreen() {
  const [selectedDate] = useState("2025-06-15"); // Baby's birthdate

  const vaccines: Vaccine[] = [
    { name: "BCG", date: "Jun 15, 2025", status: "completed", disease: "Tuberculosis" },
    { name: "Hepatitis B (Birth Dose)", date: "Jun 15, 2025", status: "completed", disease: "Hepatitis B" },
    { name: "OPV 0", date: "Jun 15, 2025", status: "completed", disease: "Polio" },
    { name: "DTP 1", date: "Aug 15, 2025", status: "completed", disease: "Diphtheria, Tetanus, Pertussis" },
    { name: "IPV 1", date: "Aug 15, 2025", status: "completed", disease: "Polio" },
    { name: "Hib 1", date: "Aug 15, 2025", status: "completed", disease: "Haemophilus influenzae" },
    { name: "Rotavirus 1", date: "Sep 15, 2025", status: "missed", disease: "Rotavirus" },
    { name: "PCV 1", date: "Sep 15, 2025", status: "missed", disease: "Pneumococcal" },
    { name: "DTP 2", date: "Oct 15, 2025", status: "upcoming", disease: "Diphtheria, Tetanus, Pertussis" },
    { name: "IPV 2", date: "Oct 15, 2025", status: "upcoming", disease: "Polio" },
    { name: "Measles", date: "Mar 15, 2026", status: "upcoming", disease: "Measles" },
    { name: "MMR 1", date: "Jun 15, 2026", status: "upcoming", disease: "Measles, Mumps, Rubella" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#48bb78]";
      case "upcoming":
        return "bg-[#f6ad55]";
      case "missed":
        return "bg-[#fc8181]";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-white" />;
      case "upcoming":
        return <Clock className="w-5 h-5 text-white" />;
      case "missed":
        return <AlertCircle className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfd] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6b9bd1] to-[#5a8bc1] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <h2 className="text-white mb-2">Vaccine Schedule</h2>
        <p className="text-white/90 text-sm">Auto-generated based on birthdate</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Birth Date Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#a8d8ea] to-[#6b9bd1] rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Baby's Birthdate</p>
              <p className="text-[#2d3748]">June 15, 2025</p>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-around bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#48bb78] rounded-full" />
            <span className="text-gray-600 text-sm">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#f6ad55] rounded-full" />
            <span className="text-gray-600 text-sm">Upcoming</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#fc8181] rounded-full" />
            <span className="text-gray-600 text-sm">Missed</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {vaccines.map((vaccine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative"
            >
              {/* Timeline line */}
              {index !== vaccines.length - 1 && (
                <div className="absolute left-[18px] top-12 w-0.5 h-12 bg-gray-200" />
              )}

              <div className="flex items-start space-x-4">
                {/* Status Icon */}
                <div className={`w-9 h-9 ${getStatusColor(vaccine.status)} rounded-full flex items-center justify-center flex-shrink-0 shadow-md z-10`}>
                  {getStatusIcon(vaccine.status)}
                </div>

                {/* Vaccine Card */}
                <div className="flex-1 bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-[#2d3748]">{vaccine.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(vaccine.status)}`}>
                      {vaccine.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{vaccine.disease}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{vaccine.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-[#6b9bd1] to-[#5a8bc1] rounded-3xl shadow-lg p-6 mt-6"
        >
          <h3 className="text-white mb-4">Overall Progress</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">6</div>
              <p className="text-white/80 text-sm">Completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">4</div>
              <p className="text-white/80 text-sm">Upcoming</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">2</div>
              <p className="text-white/80 text-sm">Missed</p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
