import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext.jsx';
import BottomNavigation from '../layout/bottomNavigation.jsx';
import { ChevronRight } from 'lucide-react';
import useCurrentTime from '../ui/time.js';

// Profile Component
export default function Profile (){
  const { user, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const time = useCurrentTime();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="text-right p-2.5 text-sm text-gray-600">{time}</div>
      <h1 className="text-center text-xl my-4">Profile</h1>
      
      <div className="px-5 pb-20">
        {/* Profile Card */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-5 flex justify-between items-center">
          <div>
            <div className="text-lg font-bold mb-1">{user?.name || 'John Doe'}</div>
            <div className="text-sm text-gray-500">
              Joined {user?.joinDate || '2024-01-15'}
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors">
            Edit
          </button>
        </div>
        
        {/* Profile Options */}
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-base shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
            Account Information
            <ChevronRight className="float-right mt-0.5" size={16} />
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-base shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
            Emergency Contacts
            <ChevronRight className="float-right mt-0.5" size={16} />
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-base shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
            Location History
            <ChevronRight className="float-right mt-0.5" size={16} />
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-base shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
            Help & Support
            <ChevronRight className="float-right mt-0.5" size={16} />
          </div>
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 p-3 rounded-lg text-red-600 text-base shadow-sm hover:bg-red-100 transition-colors text-left"
          >
            Logout
          </button>
        </div>
        
        {/* Subscription Box */}
        <div className="bg-cyan-50 p-5 mt-5 rounded-2xl text-center">
          <div className="text-base text-gray-700 mb-2">Upgrade to Premium</div>
          <div className="text-sm text-gray-800 mb-3">Get advanced safety features</div>
          <button className="bg-red-600 text-white px-5 py-3 rounded-lg text-base hover:bg-red-700 transition-colors">
            Subscribe Now
          </button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};
