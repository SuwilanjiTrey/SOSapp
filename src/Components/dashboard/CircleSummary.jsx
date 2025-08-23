// src/components/dashboard/CircleSummary.jsx
import { mockCircles } from '../../data/data.jsx';
import { Link } from 'react-router-dom';

export default function CircleSummary() {
  const totalMembers = mockCircles.reduce((sum, c) => sum + c.members.length, 0);

  return (
    <div className="flex justify-between mt-5 gap-2">
      <div className="flex-1 bg-gray-100 rounded-2xl mx-1 p-2.5 text-center">
        <div className="text-base font-bold">{mockCircles.length}</div>
        <div className="text-sm text-gray-500">Circles</div>
      </div>
      <div className="flex-1 bg-gray-100 rounded-2xl mx-1 p-2.5 text-center">
        <div className="text-base font-bold">{totalMembers}</div>
        <div className="text-sm text-gray-500">Members</div>
      </div>
      <Link to="/circles" className="flex-1 bg-gray-200 rounded-2xl mx-1 p-2.5 text-center">
        <span className="text-xl">+</span>
        <div className="text-sm text-gray-500">Add</div>
      </Link>
    </div>
  );
}
