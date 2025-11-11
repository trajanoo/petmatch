import { Compass, Settings } from "lucide-react";

interface BottomNavigationProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export default function BottomNavigation({ activeScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: "discover", icon: Compass, label: "Descobrir" },
    { id: "settings", icon: Settings, label: "Config" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all ${
                isActive ? "text-[#EE6724]" : "text-gray-400"
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-transform ${
                  isActive ? "scale-110 text-[#EE6724]" : "text-gray-400"
                }`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
