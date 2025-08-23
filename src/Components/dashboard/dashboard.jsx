// src/components/dashboard/Dashboard.jsx
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import SOSButton from './SOSButton';
import CircleSummary from './CircleSummary';
import BottomNavigation from '../layout/bottomNavigation.jsx';


const useCurrentTime = () => {
  // Use state to hold the current time.
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Use an effect to set up and clean up the interval.
  useEffect(() => {
    // Set an interval to update the time every second.
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // This is the cleanup function. It runs when the component unmounts
    // or before the effect runs again. It's crucial for preventing memory leaks.
    return () => clearInterval(timer);
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  return time;
};


export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const currentTime = useCurrentTime();
 

  return (
    <div className="min-h-screen bg-white">
      <div className="text-right p-2.5 text-sm text-gray-600">
       
        <div className="text-black font-mono text-2xl animate-pulse-fast">
          {currentTime}
        </div>
      </div>
      <div className="px-5">
        <h2 className="text-lg text-gray-800">Welcome back, {user?.name || 'Jabulani'}!</h2>

        <div className="mb-5 mt-4">
          <div className="text-sm text-gray-500">Premium Account</div>
          <div className="bg-gray-100 rounded-2xl p-4 flex justify-between items-start">
            <div>
              <div className="font-bold">{user?.name || 'Jabulani'}</div>
              <div className="text-xs text-gray-500">{user?.location || 'Libala Stage 3, Lusaka'}</div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">Manage</button>
          </div>
        </div>

        <SOSButton />
        <CircleSummary />
      </div>
      <BottomNavigation />
    </div>
  );
}
