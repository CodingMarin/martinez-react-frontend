import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  FileText,
  Users,
  BarChart3,
  Settings,
  Calculator,
} from "lucide-react";
import { cn } from "@/utils/cn";

interface SidebarProps {
  className?: string;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      icon: <Home size={20} />,
      label: "Home",
      href: "/",
    },
    {
      icon: <Package size={20} />,
      label: "Productos",
      href: "/products",
    },
    {
      icon: <FileText size={20} />,
      label: "Proformas",
      href: "/proformas",
    },
    {
      icon: <Calculator size={20} />,
      label: "Ventas",
      href: "/sales",
    },
    {
      icon: <Users size={20} />,
      label: "Clientes",
      href: "/clients",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Reportes",
      href: "/reports",
    },
    {
      icon: <Settings size={20} />,
      label: "Configuración",
      href: "/settings",
    },
  ];

  const isActiveItem = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div
      className={cn(
        "w-64 h-screen bg-white border-r border-gray-200 flex flex-col",
        className
      )}
    >
      <div className="flex-shrink-0 px-6 py-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Ferretería Martinez
            </h1>
            <p className="text-sm text-gray-500">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = isActiveItem(item.href);

          return (
            <Link
              key={item.label}
              to={item.href}
              className={`w-full group flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span
                className={`mr-3 transition-colors duration-200 ${
                  isActive
                    ? "text-blue-700"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              >
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-shrink-0 p-4 border-t border-gray-100">
        <div className="text-center text-xs text-gray-500">
          <p>Versión 1.0</p>
          <p>© 2024 Ferretería Martinez</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
