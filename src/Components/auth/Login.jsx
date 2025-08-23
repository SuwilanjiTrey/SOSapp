import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../../context/authContext';
import useCurrentTime from '../ui/time.js';

// Login Screen Component
export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { validateCredentials, login } = React.useContext(AuthContext);
  const time = useCurrentTime();
  const phoneNumber = location.state?.phoneNumber || '';

  const handleLogin = () => {
    if (!password) {
      setError('Please enter your password');
      return;
    }

    const user = validateCredentials(phoneNumber, password);
    if (user) {
      login(user);
      navigate('/dashboard');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const goToForgotPassword = () => {
    navigate('/otp', { state: { phoneNumber, userExists: true, resetPassword: true } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-5">
      <div className="self-start text-sm text-gray-600 mb-8">{time}</div>
      
      <h1 className="text-xl font-medium mb-4 text-center text-gray-800">Welcome Back</h1>
      
      <div className="text-sm text-center mb-2">
        Logging in with
      </div>
      <div className="text-base font-bold mb-6 text-center">
        {phoneNumber}
      </div>
      
      <div className="w-full max-w-sm">
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">
            {error}
          </div>
        )}
        
        <button
          onClick={handleLogin}
          disabled={!password}
          className="w-full p-3 text-base bg-blue-500 text-white border-none rounded-lg cursor-pointer hover:bg-blue-600 transition-colors mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Login
        </button>
        
        <div className="text-center">
          <button 
            onClick={goToForgotPassword}
            className="text-blue-600 underline bg-none border-none cursor-pointer text-sm"
          >
            Forgot Password?
          </button>
        </div>
        
        <div className="text-center mt-4">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-600 underline bg-none border-none cursor-pointer text-sm"
          >
            Use different phone number
          </button>
        </div>
      </div>
    </div>
  );
};
