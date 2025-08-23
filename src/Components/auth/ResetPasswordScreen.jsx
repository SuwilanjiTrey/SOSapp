import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../../context/authContext';
import useCurrentTime from '../ui/time.js';

// Reset Password Screen Component
export default function ResetPasswordScreen () {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { users, setUsers } = React.useContext(AuthContext);
  const time = useCurrentTime();
  const phoneNumber = location.state?.phoneNumber || '';

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Update user password in the users array
    const updatedUsers = users.map(user => 
      user.phoneNumber === phoneNumber 
        ? { ...user, password: newPassword }
        : user
    );
    
    setUsers(updatedUsers);
    
    alert('Password reset successfully!');
    navigate('/login', { state: { phoneNumber, userExists: true } });
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="text-right text-sm text-gray-600 mb-8">{time}</div>
      
      <h1 className="text-xl font-medium mb-4 text-center text-gray-800">Reset Password</h1>
      
      <div className="text-sm text-gray-600 mb-5 text-center px-2">
        Create a new password for {phoneNumber}
      </div>
      
      <div className="max-w-sm mx-auto">
        <div className="mb-4">
          <label className="block mb-1.5 text-sm text-gray-700">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1.5 text-sm text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">
            {error}
          </div>
        )}
        
        <button
          onClick={handleResetPassword}
          className="w-full p-3 text-base bg-blue-500 text-white border-none rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

