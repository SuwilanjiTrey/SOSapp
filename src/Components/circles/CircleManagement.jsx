// src/components/circles/CircleManagement.jsx
import { mockCircles } from '../../data/data.jsx';
import CircleCard from './CircleCard';
import BottomNavigation from '../layout/bottomNavigation.jsx';
import useCurrentTime from '../ui/time.js';

export default function CircleManagement() {
const time = useCurrentTime();
  return (
    <div className="min-h-screen bg-white">
      <div className="text-right p-2.5 text-sm text-gray-600">{time}</div>
      <h1 className="text-center text-xl my-4">My Circle</h1>
      <div className="px-5">
        {mockCircles.map((c) => (
          <CircleCard key={c.id} circle={c} />
        ))}
        <button className="w-full p-3 bg-green-600 text-white rounded-lg mb-20">+ Create New Circle</button>
      </div>
      <BottomNavigation />
    </div>
  );
}
