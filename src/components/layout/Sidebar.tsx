import { NavLink } from "react-router-dom";
import { Home, Users, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  path: string;
  icon: LucideIcon;
  label: string;
}

function Sidebar() {
  const menuItems: MenuItem[] = [
    { path: "/", icon: Home, label: "대시보드" },
    { path: "/users", icon: Users, label: "사용자 관리" },
    { path: "/settings", icon: Settings, label: "설정" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">관리자</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : ""
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
