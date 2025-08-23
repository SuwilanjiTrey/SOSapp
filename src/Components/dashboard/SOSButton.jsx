// src/components/dashboard/SOSButton.jsx
import { useState } from 'react';

export default function SOSButton() {
  const [isEmergency, setIsEmergency] = useState(false);

  const triggerSOS = () => {
    setIsEmergency(true);
    setTimeout(() => setIsEmergency(false), 3000);
  };

  return (
    <div className="text-center my-8">
      <button
        onClick={triggerSOS}
        disabled={isEmergency}
        className={`text-white text-xl px-10 py-5 rounded-full font-bold ${
          isEmergency ? 'bg-orange-500 animate-pulse' : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {isEmergency ? 'SENDING...' : 'SOS'}
      </button>
      {isEmergency && (
        <div className="mt-4 text-sm text-orange-600 animate-pulse">
          Emergency in Progress...
        </div>
      )}
    </div>
  );
}
