import { useNavigate } from "react-router";
import { ArrowLeft, AlertTriangle, MapPin, Calendar, Phone } from "lucide-react";
import { motion } from "motion/react";

export default function MissedScreen() {
  const navigate = useNavigate();

  const missedVaccines = [
    {
      name: "Rotavirus 1",
      dueDate: "Sep 15, 2025",
      daysMissed: 156,
      disease: "Rotavirus infection",
    },
    {
      name: "PCV 1",
      dueDate: "Sep 15, 2025",
      daysMissed: 156,
      disease: "Pneumococcal disease",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfd] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#fc8181] to-[#f56565] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-white mb-2">Missed Vaccines</h2>
        <p className="text-white/90 text-sm">Important: Schedule immediately</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Alert Banner */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-lg p-6 mb-6 border-l-4 border-[#fc8181]"
        >
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-[#fc8181] rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-[#2d3748] mb-2">Action Required</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your baby has {missedVaccines.length} missed vaccinations. These are important for your baby's health and development. Please schedule them as soon as possible.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Missed Vaccines List */}
        <div className="space-y-4 mb-6">
          {missedVaccines.map((vaccine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-[#2d3748] mb-1">{vaccine.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{vaccine.disease}</p>
                </div>
                <div className="bg-[#fff5f5] text-[#fc8181] text-xs px-3 py-1 rounded-full">
                  Overdue
                </div>
              </div>

              {/* Details */}
              <div className="bg-[#fff5f5] rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#fc8181]" />
                    <span className="text-gray-600">Due Date:</span>
                  </div>
                  <span className="text-[#2d3748]">{vaccine.dueDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Days Overdue:</span>
                  <span className="text-[#fc8181]">{vaccine.daysMissed} days</span>
                </div>
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
            </motion.div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
          {/* Why It Matters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-[#e8f4f8] to-[#d0e8f0] rounded-2xl shadow-md p-5"
          >
            <h4 className="text-[#2d3748] mb-3">💙 Why It Matters</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-[#6b9bd1]">•</span>
                <span>Vaccines protect against serious diseases</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#6b9bd1]">•</span>
                <span>Delayed vaccination may reduce immunity</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#6b9bd1]">•</span>
                <span>Catch-up schedules are available</span>
              </li>
            </ul>
          </motion.div>

          {/* What to Do */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-[#c7f0db] to-[#a8e6cf] rounded-2xl shadow-md p-5"
          >
            <h4 className="text-[#2d3748] mb-3">✅ What to Do Next</h4>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-[#48bb78]">1.</span>
                <span>Contact your pediatrician immediately</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#48bb78]">2.</span>
                <span>Schedule the missed vaccinations</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#48bb78]">3.</span>
                <span>Follow the catch-up schedule given</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#48bb78]">4.</span>
                <span>Set up reminders for upcoming doses</span>
              </li>
            </ol>
          </motion.div>

          {/* Emergency Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-[#6b9bd1] to-[#5a8bc1] rounded-2xl shadow-lg p-5"
          >
            <h4 className="text-white mb-3">Need Help?</h4>
            <p className="text-white/90 text-sm mb-4">
              Our vaccination support team is here to help you schedule and understand your baby's vaccination needs.
            </p>
            <button className="w-full bg-white text-[#6b9bd1] py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call Support</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
