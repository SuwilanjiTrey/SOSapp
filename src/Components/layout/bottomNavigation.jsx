import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Users,
  AlertCircle, 
  Settings,
  User
} from 'lucide-react';

export default function BottomNavigation () {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const navItems = [
    { path: '/dashboard', icon: Shield, label: 'Home' },
    { path: '/circles', icon: Users, label: 'Circles' },
    { path: '/records', icon: AlertCircle, label: 'Records' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white flex justify-around border-t border-gray-300 py-2.5 z-50">
      {navItems.map(({ path, icon: Icon, label }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={`text-center flex-1 ${
            currentPath === path ? 'text-blue-600' : 'text-gray-700'
          }`}
        >
          <Icon className="mx-auto mb-1" size={18} />
          <div className="text-xs">{label}</div>
        </button>
      ))}
    </div>
  );
};
