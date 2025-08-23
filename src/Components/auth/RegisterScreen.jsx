import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../../context/authContext';
import useCurrentTime from '../ui/time.js';


// Register Screen Component
export default function RegisterScreen (){
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { registerUser, login } = React.useContext(AuthContext);
  const time = useCurrentTime();
  
  const phoneNumber = location.state?.phoneNumber || '';

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const completeRegistration = () => {
    const { name, age, gender, location, password, confirmPassword } = formData;
    
    if (!name || !age || !gender || !location || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const userData = {
      name,
      age,
      gender,
      location: location,
      phoneNumber,
      password,
      profilePicture: null
    };

    const newUser = registerUser(userData);
    login(newUser);
    navigate('/dashboard');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      completeRegistration();
    }
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="text-right text-sm text-gray-600 mb-8">{time}</div>
      
      <h1 className="text-xl font-medium mb-4 text-center text-gray-800">Create Account</h1>
      
      <div className="text-sm text-gray-600 mb-5 text-center px-2">
        Complete your profile for {phoneNumber}
      </div>
      
      <div className="max-w-sm mx-auto">
        <div className="mb-4">
          <label className="block mb-1.5 text-sm text-gray-700">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            autoComplete="name"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1.5 text-sm text-gray-700">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your age"
            min="1"
            max="120"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1.5 text-sm text-gray-700">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1.5 text-sm text-gray-700">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="City, Country"
            className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="address-level2"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1.5 text-sm text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Create a password"
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
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Confirm your password"
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
        
        <div className="w-full p-3.5 text-center border border-dashed border-gray-400 text-gray-700 text-sm mb-6 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
          Change Profile Picture
        </div>
        
        <button
          onClick={completeRegistration}
          className="w-full p-3 text-base bg-blue-500 text-white border-none rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};
