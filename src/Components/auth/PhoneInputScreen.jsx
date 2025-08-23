// src/components/auth/PhoneInputScreen.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import useCurrentTime from '../ui/time.js';

export default function PhoneInputScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const { findUserByPhone } = useContext(AuthContext);
  const time = useCurrentTime();

  const handleSubmit = () => {
    if (phoneNumber.length >= 10) {
      const exists = findUserByPhone(phoneNumber);
      navigate('/otp', { state: { phoneNumber, userExists: !!exists } });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-5">
      <div className="self-start text-sm text-gray-600 mb-8">{time}</div>
      <h1 className="text-xl font-medium mb-10 text-center">SOS Emergency Circle</h1>
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full max-w-sm p-3.5 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        disabled={phoneNumber.length < 10}
        className="w-full max-w-sm p-3.5 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
      >
        Continue
      </button>
      <div className="mt-8 text-xs text-gray-500 text-center">
        By continuing, you agree to our{' '}
        <a href="#" className="text-blue-600 underline">Terms & Conditions</a>
      </div>
    </div>
  );
}
