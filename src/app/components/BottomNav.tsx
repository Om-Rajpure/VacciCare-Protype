import { Home, Calendar, MapPin, BookOpen, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: MapPin, label: "Centers", path: "/centers" },
    { icon: BookOpen, label: "Articles", path: "/articles" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? "text-[#6b9bd1]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? "scale-110" : ""}`} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
