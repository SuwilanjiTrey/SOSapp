import { useState } from 'react';
import { mockSOSRecords } from '../../data/data.jsx';
import { MapPin } from 'lucide-react';
import BottomNavigation from '../layout/bottomNavigation.jsx';
import useCurrentTime from '../ui/time.js';

// SOS Records Component
const SOSRecords = () => {
  const [sosRecords] = useState(mockSOSRecords);
  const time = useCurrentTime();

  return (
    <div className="min-h-screen bg-white">
      <div className="text-right p-2.5 text-sm text-gray-600">{time}</div>
      <h1 className="text-center text-xl my-4">SOS Records</h1>
      
      <div className="px-5 pb-20">
        {sosRecords.map(record => (
          <div key={record.id} className="bg-gray-50 rounded-lg p-4 mb-3 shadow-sm">
            <div className="font-bold text-base mb-1">{record.title}</div>
            <div className="text-sm text-gray-500 mb-1">{record.date}</div>
            <div className="text-sm text-gray-600 mb-2">
              <MapPin size={14} className="inline mr-1" />
              {record.location}
            </div>
            <div className={`inline-block px-2 py-1 text-xs rounded ${
              record.resolved 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {record.resolved ? 'Resolved' : 'Active'}
            </div>
          </div>
        ))}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SOSRecords;
