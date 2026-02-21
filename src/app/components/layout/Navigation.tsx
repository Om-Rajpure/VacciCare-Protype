import { Home, Calendar, MapPin, BookOpen, Bell, User } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  activeView: 'home' | 'schedule' | 'centers' | 'education' | 'reminders' | 'profile';
  onViewChange: (view: 'home' | 'schedule' | 'centers' | 'education' | 'reminders' | 'profile') => void;
}

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, color: 'text-[#2EC4B6]' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, color: 'text-[#4CC9F0]' },
    { id: 'centers', label: 'Centers', icon: MapPin, color: 'text-[#FF6B6B]' },
    { id: 'education', label: 'Articles', icon: BookOpen, color: 'text-[#FFD166]' },
    { id: 'reminders', label: 'Reminders', icon: Bell, color: 'text-[#FF6B6B]' },
    { id: 'profile', label: 'Profile', icon: User, color: 'text-[#2EC4B6]' },
  ] as const;

  return (
    <div className="fixed bottom-6 left-0 right-0 px-4 z-50 flex justify-center">
      <nav className="bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-white/50 px-2 py-2 flex items-center justify-between max-w-lg w-full">
        {tabs.map((tab) => {
          const isActive = activeView === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className="relative flex flex-col items-center justify-center w-full h-14 rounded-full transition-all duration-300 group"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#F7FBFF] rounded-full shadow-inner"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              <div className={`relative z-10 flex flex-col items-center transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-1' : 'group-hover:scale-105'}`}>
                <Icon 
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isActive ? tab.color : 'text-gray-400 group-hover:text-gray-600'
                  }`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] font-medium mt-1 transition-all duration-300 ${
                  isActive ? 'text-gray-800 opacity-100' : 'text-gray-400 opacity-0 h-0 overflow-hidden group-hover:opacity-100'
                }`}>
                  {tab.label}
                </span>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className={`absolute bottom-1 w-1 h-1 rounded-full ${tab.color.replace('text-', 'bg-')}`}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
