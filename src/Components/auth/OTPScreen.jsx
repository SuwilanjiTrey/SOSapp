import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCurrentTime from '../ui/time.js';

// OTP Screen Component
const OTPScreen = () => {
  const [otpCode, setOtpCode] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const time = useCurrentTime();
  const phoneNumber = location.state?.phoneNumber || '+260123456789';
  const userExists = location.state?.userExists || false;
  const resetPassword = location.state?.resetPassword || false;

  useEffect(() => {
    // Generate random 6-digit OTP for testing
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
  }, []);

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setOtpCode(value);
    }
  };

  const verifyOTP = () => {
    if (otpCode === generatedOTP) {
      if (resetPassword) {
        navigate('/reset-password', { state: { phoneNumber } });
      } else {
        navigate('/register', { state: { phoneNumber } });
      }
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && otpCode.length === 6) {
      verifyOTP();
    }
  };

  const getTitle = () => {
    if (resetPassword) return 'Reset Password';
    return userExists ? 'Verify Phone Number' : 'Verify Phone Number';
  };

  const getMessage = () => {
    if (resetPassword) return 'Enter the verification code to reset your password';
    return 'We sent a verification code to verify your phone number';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-5">
      <div className="self-start text-sm text-gray-600 mb-8">{time}</div>
      
      <h1 className="text-xl font-medium mb-4 text-center text-gray-800">{getTitle()}</h1>
      
      <div className="text-sm text-center mb-2">
        {getMessage()}
      </div>
      <div className="text-base font-bold mb-4 text-center">
        {phoneNumber}
      </div>
      
      {/* Testing Mode - Show Generated OTP */}
      <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 mb-6 text-center">
        <div className="text-sm text-yellow-800 mb-1">Testing Mode</div>
        <div className="text-lg font-mono font-bold text-yellow-900">
          OTP: {generatedOTP}
        </div>
      </div>
      
      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otpCode}
        onChange={handleOTPChange}
        onKeyPress={handleKeyPress}
        className="w-full max-w-xs p-3 text-center text-xl border border-gray-300 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest"
        maxLength="6"
        autoComplete="one-time-code"
      />
      
      <button
        onClick={verifyOTP}
        disabled={otpCode.length !== 6}
        className="w-full max-w-xs p-3 text-base bg-blue-500 text-white border-none rounded-lg cursor-pointer hover:bg-blue-600 transition-colors mb-5 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Verify
      </button>
      
      <div className="text-sm text-gray-500 text-center">
        Didn't receive a code?{' '}
        <button 
          onClick={() => {
            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOTP(newOtp);
            setOtpCode('');
          }}
          className="text-blue-600 underline bg-none border-none cursor-pointer"
        >
          Resend
        </button>
      </div>
    </div>
  );
};

export default OTPScreen;
