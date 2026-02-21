import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Bell, MessageSquare, Calendar, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import * as Switch from "@radix-ui/react-switch";

interface Notification {
  id: number;
  type: "vaccine" | "reminder" | "article";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const [smsReminders, setSmsReminders] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const notifications: Notification[] = [
    {
      id: 1,
      type: "vaccine",
      title: "BCG Booster Due Soon",
      message: "Your baby's BCG booster is scheduled for Feb 21, 2026",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "reminder",
      title: "Vaccination Reminder",
      message: "Don't forget to bring vaccination card tomorrow",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "article",
      title: "New Article Available",
      message: "Dr. Sharma posted about post-vaccine care tips",
      time: "2 days ago",
      read: true,
    },
    {
      id: 4,
      type: "vaccine",
      title: "Vaccination Completed",
      message: "DTP 1 vaccination completed successfully",
      time: "1 week ago",
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "vaccine":
        return Calendar;
      case "reminder":
        return Bell;
      case "article":
        return MessageSquare;
      default:
        return Bell;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "vaccine":
        return "from-[#6b9bd1] to-[#5a8bc1]";
      case "reminder":
        return "from-[#f6ad55] to-[#ed8936]";
      case "article":
        return "from-[#48bb78] to-[#38a169]";
      default:
        return "from-gray-400 to-gray-500";
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
        <h2 className="text-white mb-2">Notifications</h2>
        <p className="text-white/90 text-sm">Manage your alerts & reminders</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Settings Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-[#2d3748] mb-4">Reminder Settings</h3>

          {/* SMS Reminders */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex-1">
              <h4 className="text-[#2d3748] text-sm mb-1">SMS Reminders</h4>
              <p className="text-gray-600 text-xs">Get vaccination reminders via SMS</p>
            </div>
            <Switch.Root
              checked={smsReminders}
              onCheckedChange={setSmsReminders}
              className="w-12 h-7 bg-gray-300 rounded-full relative data-[state=checked]:bg-[#6b9bd1] transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform translate-x-1 data-[state=checked]:translate-x-6" />
            </Switch.Root>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between py-4">
            <div className="flex-1">
              <h4 className="text-[#2d3748] text-sm mb-1">Push Notifications</h4>
              <p className="text-gray-600 text-xs">Get in-app notifications</p>
            </div>
            <Switch.Root
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
              className="w-12 h-7 bg-gray-300 rounded-full relative data-[state=checked]:bg-[#6b9bd1] transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform translate-x-1 data-[state=checked]:translate-x-6" />
            </Switch.Root>
          </div>
        </motion.div>

        {/* Upcoming Vaccines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#fff5e6] to-[#ffe8cc] rounded-2xl shadow-md p-5 mb-6 border-l-4 border-[#f6ad55]"
        >
          <div className="flex items-start space-x-3">
            <Calendar className="w-6 h-6 text-[#f6ad55] flex-shrink-0" />
            <div>
              <h4 className="text-[#2d3748] mb-1">Next Vaccination</h4>
              <p className="text-gray-600 text-sm mb-2">BCG Booster - Feb 21, 2026</p>
              <button className="text-[#f6ad55] text-sm hover:underline">
                View Details →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          <h3 className="text-[#2d3748]">Recent Notifications</h3>

          {notifications.map((notification, index) => {
            const Icon = getIcon(notification.type);
            const color = getColor(notification.type);

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow ${
                  !notification.read ? "border-l-4 border-[#6b9bd1]" : ""
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-[#2d3748] text-sm">{notification.title}</h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#6b9bd1] rounded-full" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                    <p className="text-gray-400 text-xs">{notification.time}</p>
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
          className="w-full mt-6 bg-white text-[#6b9bd1] border border-[#6b9bd1] py-4 rounded-2xl hover:bg-[#6b9bd1] hover:text-white transition-colors flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Mark All as Read</span>
        </motion.button>
      </div>
    </div>
  );
}
