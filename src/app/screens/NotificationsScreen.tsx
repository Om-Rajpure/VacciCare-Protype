import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Bell, MessageSquare, Calendar, CheckCircle, AlertTriangle, Clock, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as Switch from "@radix-ui/react-switch";

interface Notification {
  id: number;
  type: "vaccine" | "reminder" | "article" | "urgent";
  title: string;
  message: string;
  time: string;
  read: boolean;
  daysOverdue?: number;
}

type ReminderStage = "before" | "due" | "overdue" | "critical";

const REMINDER_STAGES: Array<{ stage: ReminderStage; label: string; description: string; color: string; icon: typeof Bell }> = [
  { stage: "before", label: "3 Days Before Due", description: "Auto-reminder sent to schedule appointment", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Calendar },
  { stage: "due", label: "Due Day", description: "Vaccination due today — please visit your center", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Bell },
  { stage: "overdue", label: "Overdue (every 24h)", description: "Daily reminders until vaccine is marked done", color: "bg-orange-100 text-orange-700 border-orange-200", icon: AlertTriangle },
  { stage: "critical", label: "5+ Days Ignored", description: "High urgency — Contact ASHA Health Worker", color: "bg-red-100 text-red-700 border-red-200", icon: PhoneCall },
];

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const [smsReminders, setSmsReminders] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoReminders, setAutoReminders] = useState(true);

  const notifications: Notification[] = [
    {
      id: 1,
      type: "urgent",
      title: "⚠ HIGH URGENCY: Rotavirus 1 Overdue",
      message: "Rotavirus 1 is now 5 days overdue. Reminders have been ignored. Please contact your ASHA Health Worker or visit a vaccination center immediately.",
      time: "1 hour ago",
      read: false,
      daysOverdue: 5,
    },
    {
      id: 2,
      type: "vaccine",
      title: "BCG Booster Due Soon",
      message: "Your baby's BCG booster is scheduled for Feb 21, 2026 — 3 days from now. Please book your appointment.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "reminder",
      title: "Vaccination Reminder",
      message: "PCV 1 is overdue by 2 days. Mark as done once vaccinated to stop reminders.",
      time: "8 hours ago",
      read: false,
      daysOverdue: 2,
    },
    {
      id: 4,
      type: "reminder",
      title: "Reminder: Bring Vaccination Card",
      message: "Don't forget to bring your vaccination card tomorrow to your center visit.",
      time: "1 day ago",
      read: true,
    },
    {
      id: 5,
      type: "article",
      title: "New Article Available",
      message: "Dr. Sharma posted about post-vaccine care tips for infants",
      time: "2 days ago",
      read: true,
    },
    {
      id: 6,
      type: "vaccine",
      title: "Vaccination Completed ✓",
      message: "DTP 1 vaccination marked as complete. Well done! Compliance score updated.",
      time: "1 week ago",
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "vaccine": return Calendar;
      case "reminder": return Bell;
      case "article": return MessageSquare;
      case "urgent": return AlertTriangle;
      default: return Bell;
    }
  };

  const getCardStyle = (n: Notification) => {
    if (n.type === "urgent") return "border-l-4 border-red-500 bg-red-50";
    if (!n.read && n.daysOverdue && n.daysOverdue >= 4) return "border-l-4 border-orange-400 bg-orange-50";
    if (!n.read && n.daysOverdue) return "border-l-4 border-yellow-400";
    if (!n.read) return "border-l-4 border-[#6b9bd1]";
    return "";
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "vaccine": return "from-[#6b9bd1] to-[#5a8bc1]";
      case "reminder": return "from-[#f6ad55] to-[#ed8936]";
      case "article": return "from-[#48bb78] to-[#38a169]";
      case "urgent": return "from-[#fc4444] to-[#c53030]";
      default: return "from-gray-400 to-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfd] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6b9bd1] to-[#5a8bc1] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-white mb-1">Notifications</h2>
        <p className="text-white/80 text-sm">Closed-loop reminder system</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Settings Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h3 className="text-[#2d3748] mb-4 font-semibold">Reminder Settings</h3>

          {[
            { label: "SMS Reminders", sublabel: "Get vaccination reminders via SMS", value: smsReminders, setter: setSmsReminders },
            { label: "Push Notifications", sublabel: "Get in-app notifications", value: pushNotifications, setter: setPushNotifications },
            { label: "Auto-Reminders", sublabel: "3 days before, due day, and daily if overdue", value: autoReminders, setter: setAutoReminders },
          ].map(({ label, sublabel, value, setter }) => (
            <div key={label} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
              <div className="flex-1">
                <h4 className="text-[#2d3748] text-sm font-medium mb-0.5">{label}</h4>
                <p className="text-gray-500 text-xs">{sublabel}</p>
              </div>
              <Switch.Root
                checked={value}
                onCheckedChange={setter}
                className="w-12 h-7 bg-gray-300 rounded-full relative data-[state=checked]:bg-[#6b9bd1] transition-colors"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform translate-x-1 data-[state=checked]:translate-x-6" />
              </Switch.Root>
            </div>
          ))}
        </motion.div>

        {/* Closed-Loop Reminder Lifecycle */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-[#6b9bd1]" />
            <h3 className="text-[#2d3748] font-semibold">Reminder Lifecycle</h3>
          </div>
          <p className="text-gray-500 text-xs mb-4">Auto-reminders stop only when you press "Mark Done" or ASHA worker confirms.</p>
          <div className="space-y-2">
            {REMINDER_STAGES.map(({ label, description, color, icon: Icon }) => (
              <div key={label} className={`flex items-start space-x-3 p-3 rounded-xl border ${color}`}>
                <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold">{label}</p>
                  <p className="text-[10px] opacity-80 mt-0.5">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Vaccines Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-r from-[#fff5e6] to-[#ffe8cc] rounded-2xl shadow-md p-5 mb-6 border-l-4 border-[#f6ad55]"
        >
          <div className="flex items-start space-x-3">
            <Calendar className="w-6 h-6 text-[#f6ad55] flex-shrink-0" />
            <div>
              <h4 className="text-[#2d3748] mb-1 font-semibold">Next Vaccination</h4>
              <p className="text-gray-600 text-sm mb-2">BCG Booster — Feb 21, 2026 (3 days)</p>
              <button className="text-[#f6ad55] text-sm font-medium hover:underline">View Schedule →</button>
            </div>
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          <h3 className="text-[#2d3748] font-semibold">Recent Notifications</h3>

          {notifications.map((notification, index) => {
            const Icon = getIcon(notification.type);
            const color = getIconColor(notification.type);
            const cardStyle = getCardStyle(notification);

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow ${cardStyle}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    {notification.type === "urgent" ? (
                      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                    ) : (
                      <Icon className="w-6 h-6 text-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className={`text-sm font-semibold ${notification.type === "urgent" ? "text-red-700" : "text-[#2d3748]"}`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ml-2 mt-1 ${notification.type === "urgent" ? "bg-red-500" : "bg-[#6b9bd1]"}`} />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{notification.message}</p>

                    {notification.daysOverdue && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold mr-2 ${notification.daysOverdue >= 5 ? "bg-red-100 text-red-700" : notification.daysOverdue >= 4 ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {notification.daysOverdue >= 7 ? `⚠ 7+ days overdue – High Priority` : `${notification.daysOverdue} days overdue`}
                      </span>
                    )}

                    <div className="flex items-center space-x-3 mt-2">
                      <p className="text-gray-400 text-xs">{notification.time}</p>
                      {(notification.type === "vaccine" || notification.type === "urgent" || notification.type === "reminder") && !notification.read && (
                        <button className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-lg font-medium hover:bg-green-200 transition-colors flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Mark Done</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mark All Read */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full mt-6 bg-white text-[#6b9bd1] border border-[#6b9bd1] py-4 rounded-2xl hover:bg-[#6b9bd1] hover:text-white transition-colors flex items-center justify-center space-x-2 shadow-md"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Mark All as Read</span>
        </motion.button>
      </div>
    </div>
  );
}
