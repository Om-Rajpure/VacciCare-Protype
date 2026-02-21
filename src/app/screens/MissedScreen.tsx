import { useNavigate } from "react-router";
import { ArrowLeft, AlertTriangle, MapPin, Calendar, Phone, CheckCircle, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const missedVaccines = [
  {
    name: "Rotavirus 1",
    dueDate: "Sep 15, 2025",
    daysMissed: 156,
    disease: "Rotavirus infection",
    urgency: "critical" as const,
  },
  {
    name: "PCV 1",
    dueDate: "Sep 15, 2025",
    daysMissed: 156,
    disease: "Pneumococcal disease",
    urgency: "critical" as const,
  },
];

const urgencyConfig = {
  critical: {
    badgeClass: "bg-red-100 text-red-700 border-red-200",
    borderClass: "border-l-4 border-red-500",
    label: (days: number) => days >= 7 ? `⚠ ${days} days overdue – High Priority` : `${days} days overdue`,
  },
  high: {
    badgeClass: "bg-orange-100 text-orange-700 border-orange-200",
    borderClass: "border-l-4 border-orange-400",
    label: (days: number) => `${days} days overdue`,
  },
  moderate: {
    badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-200",
    borderClass: "border-l-4 border-yellow-400",
    label: (days: number) => `${days} days overdue`,
  },
};

export default function MissedScreen() {
  const navigate = useNavigate();
  const [markedDone, setMarkedDone] = useState<Set<string>>(new Set());

  const handleMarkDone = (name: string) => {
    setMarkedDone(prev => new Set([...prev, name]));
  };

  const remaining = missedVaccines.filter(v => !markedDone.has(v.name));
  const highPriority = remaining.filter(v => v.daysMissed >= 7);

  return (
    <div className="min-h-screen bg-[#fafbfd] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#c53030] to-[#fc4444] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-white mb-1">Missed Vaccines</h2>
        <div className="flex items-center space-x-2">
          <p className="text-white/90 text-sm">
            {remaining.length === 0 ? "All caught up! ✓" : `${remaining.length} requiring immediate action`}
          </p>
          {remaining.length > 0 && (
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              {highPriority.length} HIGH PRIORITY
            </span>
          )}
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Alert Banner */}
        {remaining.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-3xl shadow-lg p-5 mb-6 border-l-4 border-[#fc4444]"
          >
            <div className="flex items-start space-x-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0"
              >
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </motion.div>
              <div>
                <h3 className="text-[#2d3748] mb-1 font-semibold">Action Required — Urgent</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {remaining.length} missed vaccination{remaining.length > 1 ? "s" : ""}. Daily reminders will continue
                  until you press <strong>"Mark Done"</strong>. After 5 ignored reminders,
                  your ASHA worker will be notified.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {remaining.length === 0 && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-3xl shadow-lg p-8 mb-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">All Caught Up!</h3>
            <p className="text-gray-500 text-sm">Great work keeping vaccinations on track. Keep it up!</p>
          </motion.div>
        )}

        {/* Missed Vaccines List */}
        <div className="space-y-4 mb-6">
          {remaining.map((vaccine, index) => {
            const cfg = urgencyConfig[vaccine.urgency];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg p-5 ${cfg.borderClass}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-[#2d3748] font-semibold mb-0.5">{vaccine.name}</h4>
                    <p className="text-gray-500 text-sm">{vaccine.disease}</p>
                  </div>
                  <motion.div
                    animate={vaccine.daysMissed >= 7 ? { opacity: [1, 0.5, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className={`text-xs px-3 py-1 rounded-full border font-semibold ${cfg.badgeClass}`}
                  >
                    {cfg.label(vaccine.daysMissed)}
                  </motion.div>
                </div>

                {/* Details */}
                <div className={`rounded-xl p-4 mb-4 ${vaccine.urgency === "critical" ? "bg-red-50" : "bg-orange-50"}`}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-red-400" />
                      <span className="text-gray-500">Due Date:</span>
                    </div>
                    <span className="text-[#2d3748] font-medium">{vaccine.dueDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-red-400" />
                      <span className="text-gray-500">Days Overdue:</span>
                    </div>
                    <span className={`font-bold ${vaccine.daysMissed >= 7 ? "text-red-600" : "text-orange-600"}`}>
                      {vaccine.daysMissed} days
                    </span>
                  </div>
                  {vaccine.daysMissed >= 7 && (
                    <div className="flex items-center space-x-2 pt-2 border-t border-red-100">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-red-600 font-medium">Severity: HIGH PRIORITY — Do not delay further</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate("/centers")}
                    className="flex-1 bg-[#6b9bd1] text-white py-3 rounded-xl hover:bg-[#5a8bc1] transition-colors flex items-center justify-center space-x-2"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Find Center</span>
                  </button>
                  <button className="flex-1 bg-[#e8f4f8] text-[#6b9bd1] py-3 rounded-xl hover:bg-[#d0e8f0] transition-colors flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Call Doctor</span>
                  </button>
                </div>

                {/* Mark Done Button */}
                <button
                  onClick={() => handleMarkDone(vaccine.name)}
                  className="w-full mt-3 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Mark as Vaccinated (closes reminder loop)</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Already Marked Done */}
        {markedDone.size > 0 && (
          <div className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-200">
            <h4 className="text-green-700 font-semibold text-sm mb-2 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Marked as Done ({markedDone.size})</span>
            </h4>
            {[...markedDone].map(name => (
              <p key={name} className="text-green-600 text-xs flex items-center space-x-1">
                <span>✓</span><span>{name} — reminder loop closed</span>
              </p>
            ))}
          </div>
        )}

        {/* Info Cards */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-r from-[#e8f4f8] to-[#d0e8f0] rounded-2xl shadow-md p-5">
            <h4 className="text-[#2d3748] mb-3 font-semibold">💙 Why It Matters</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2"><span className="text-[#6b9bd1]">•</span><span>Vaccines protect against serious, preventable diseases</span></li>
              <li className="flex items-start space-x-2"><span className="text-[#6b9bd1]">•</span><span>Delayed vaccination can reduce immunity window</span></li>
              <li className="flex items-start space-x-2"><span className="text-[#6b9bd1]">•</span><span>Catch-up schedules are available — consult your doctor</span></li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-[#c7f0db] to-[#a8e6cf] rounded-2xl shadow-md p-5">
            <h4 className="text-[#2d3748] mb-3 font-semibold">✅ What to Do Next</h4>
            <ol className="space-y-2 text-sm text-gray-700">
              {["Contact your pediatrician or ASHA worker immediately", "Schedule the missed vaccinations", "Follow the catch-up schedule provided", "Press 'Mark Done' here after vaccination to stop reminders"].map((step, i) => (
                <li key={i} className="flex items-start space-x-2"><span className="text-[#48bb78] font-bold">{i + 1}.</span><span>{step}</span></li>
              ))}
            </ol>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gradient-to-r from-[#6b9bd1] to-[#5a8bc1] rounded-2xl shadow-lg p-5">
            <h4 className="text-white mb-2 font-semibold">Need Help?</h4>
            <p className="text-white/80 text-sm mb-4">Our vaccination support team is here to help you schedule and understand your baby's needs. ASHA worker notified after 5 ignored reminders.</p>
            <button className="w-full bg-white text-[#6b9bd1] py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 font-medium">
              <Phone className="w-4 h-4" /><span>Call Support Helpline</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
