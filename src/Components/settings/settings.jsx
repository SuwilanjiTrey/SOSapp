import BottomNavigation from '../layout/bottomNavigation.jsx';
import useCurrentTime from '../ui/time.js';


// Settings Component
export default function SettingsScreen() {
const time = useCurrentTime();
  return (
    <div className="min-h-screen bg-white">
      <div className="text-right p-2.5 text-sm text-gray-600">{time}</div>
      <h1 className="text-center text-xl my-4">Settings</h1>
      
      <div className="px-5 pb-20">
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
            <div className="font-bold text-base mb-1">Emergency Settings</div>
            <div className="text-sm text-gray-600">Configure SOS alert preferences</div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
            <div className="font-bold text-base mb-1">Location Services</div>
            <div className="text-sm text-gray-600">Manage location sharing settings</div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
            <div className="font-bold text-base mb-1">Notifications</div>
            <div className="text-sm text-gray-600">Push notification preferences</div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
            <div className="font-bold text-base mb-1">Privacy & Security</div>
            <div className="text-sm text-gray-600">Data protection settings</div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
            <div className="font-bold text-base mb-1">Account Settings</div>
            <div className="text-sm text-gray-600">Profile and account management</div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};
