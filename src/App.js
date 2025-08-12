import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Users, AlertCircle, Settings, User, Plus, MapPin, Camera, Mic, Shield, Edit, Bell, ChevronRight, Eye, EyeOff } from 'lucide-react';

// Authentication Context
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]); // Store registered users in memory

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const registerUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split('T')[0],
      subscription: false
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const findUserByPhone = (phoneNumber) => {
    return users.find(user => user.phoneNumber === phoneNumber);
  };

  const validateCredentials = (phoneNumber, password) => {
    const user = findUserByPhone(phoneNumber);
    return user && user.password === password ? user : null;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      users,
      login, 
      logout, 
      registerUser, 
      findUserByPhone, 
      validateCredentials 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock Data
const mockCircles = [
  {
    id: '1',
    name: 'Family',
    type: 'family',
    members: [
      { id: '2', name: 'Jane Doe', phone: '+260987654321', relation: 'Mother' },
      { id: '3', name: 'Mike Doe', phone: '+260555123456', relation: 'Father' }
    ]
  },
  {
    id: '2', 
    name: 'Close Friends',
    type: 'friends',
    members: [
      { id: '4', name: 'Alice Smith', phone: '+260444777888', relation: 'Friend' },
      { id: '5', name: 'Bob Johnson', phone: '+260333666999', relation: 'Friend' }
    ]
  }
];

const mockSOSRecords = [
  {
    id: '1',
    title: 'Emergency Alert',
    date: '2024-08-08 14:30',
    location: 'Lusaka City Center',
    resolved: true
  },
  {
    id: '2',
    title: 'Safety Check',
    date: '2024-08-05 09:15',
    location: 'University of Zambia',
    resolved: false
  }
];

// Phone Input Screen Component
const PhoneInputScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const { findUserByPhone } = React.useContext(AuthContext);

  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 10) {
      const existingUser = findUserByPhone(phoneNumber);
      if (existingUser) {
        // User exists, go to login
        navigate('/login', { state: { phoneNumber, userExists: true } });
      } else {
        // New user, go to OTP verification for registration
        navigate('/otp', { state: { phoneNumber, userExists: false } });
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePhoneSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start p-5">
      <div className="self-start text-sm text-gray-600 mb-8">9:41 AM</div>
      
      <div className="w-full max-w-sm flex flex-col items-center pt-10">
        <h1 className="text-xl font-medium mb-10 text-center text-gray-800">SOS Emergency Circle</h1>
        
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-3.5 text-base border border-gray-300 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="tel"
        />
        
        <button
          onClick={handlePhoneSubmit}
          disabled={phoneNumber.length < 10}
          className="w-full p-3.5 text-base bg-blue-600 text-white border-none rounded-lg cursor-pointer hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continue
        </button>
        
        <div className="mt-8 text-xs text-gray-500 text-center leading-relaxed">
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-600 underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-blue-600 underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

// Login Screen Component
const LoginScreen = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { validateCredentials, login } = React.useContext(AuthContext);
  
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
      <div className="self-start text-sm text-gray-600 mb-8">9:41 AM</div>
      
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

// OTP Screen Component
const OTPScreen = () => {
  const [otpCode, setOtpCode] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
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
      <div className="self-start text-sm text-gray-600 mb-8">9:41 AM</div>
      
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

// Reset Password Screen Component
const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { users, setUsers } = React.useContext(AuthContext);
  
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
      <div className="text-right text-sm text-gray-600 mb-8">9:41 AM</div>
      
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

// Register Screen Component
const RegisterScreen = () => {
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
      <div className="text-right text-sm text-gray-600 mb-8">9:41 AM</div>
      
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

// Dashboard Component
const Dashboard = () => {
  const [circles] = useState(mockCircles);
  const [sosRecords, setSosRecords] = useState(mockSOSRecords);
  const [isEmergency, setIsEmergency] = useState(false);
  const { user } = React.useContext(AuthContext);

  const sendSOSAlert = () => {
    setIsEmergency(true);
    setTimeout(() => {
      const newRecord = {
        id: Date.now().toString(),
        title: 'Emergency SOS Alert',
        date: new Date().toLocaleString(),
        location: 'Current Location',
        resolved: false
      };
      setSosRecords(prev => [newRecord, ...prev]);
      setIsEmergency(false);
      alert('SOS Alert sent to all your emergency circles!');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="text-right p-2.5 text-sm text-gray-600">9:41 AM</div>
      
      <div className="px-5">
        {/* Welcome Message */}
        <div className="mb-5">
          <h2 className="text-lg text-gray-800">Welcome back, {user?.name || 'User'}!</h2>
        </div>

        {/* Premium Section */}
        <div className="mb-5">
          <div className="text-sm text-gray-500 mb-1.5">Premium Circle</div>
          <div className="bg-gray-100 rounded-2xl p-4 flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-700">Family</div>
              <div className="text-xs text-gray-500">Lusaka, Zambia</div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors">
              Manage
            </button>
          </div>
        </div>
        
        {/* SOS Button */}
        <div className="text-center my-8">
          <button
            onClick={sendSOSAlert}
            disabled={isEmergency}
            className={`text-white text-xl px-10 py-5 border-none rounded-full font-bold cursor-pointer transition-all ${
              isEmergency 
                ? 'bg-orange-500 animate-pulse' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isEmergency ? 'SENDING...' : 'SOS'}
          </button>
          {isEmergency && (
            <div className="mt-4 text-sm text-orange-600 animate-pulse">
              Sending emergency alert to all circles...
            </div>
          )}
        </div>
        
        {/* Circles Summary */}
        <div className="flex justify-between mt-5 gap-2">
          <div className="flex-1 bg-gray-100 rounded-2xl mx-1 p-2.5 text-center">
            <div className="text-base font-bold">{circles.length}</div>
            <div className="text-sm text-gray-500">Circles</div>
          </div>
          <div className="flex-1 bg-gray-100 rounded-2xl mx-1 p-2.5 text-center">
            <div className="text-base font-bold">
              {circles.reduce((total, circle) => total + circle.members.length, 0)}
            </div>
            <div className="text-sm text-gray-500">Members</div>
          </div>
          <div className="flex-1 bg-gray-200 rounded-2xl mx-1 p-2.5 text-center cursor-pointer hover:bg-gray-300 transition-colors">
            <Plus className="mx-auto mb-1" size={20} />
            <div className="text-sm text-gray-500">Add</div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

// Circle Management Component
const CircleManagement = () => {
  const [circles] = useState(mockCircles);

  return (
    <div className="min-h-screen bg-white">
      <div className="text-right p-2.5 text-sm text-gray-600">9:41 AM</div>
      <h1 className="text-center text-xl my-4">My Circles</h1>
      
      <div className="px-5">
        {circles.map(circle => (
          <div key={circle.id} className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">{circle.name}</h2>
              <button className="text-blue-600 text-sm">
                <Edit size={16} className="inline mr-1" />
                Edit
              </button>
            </div>
            
            <div className="space-y-2">
              {circle.members.map(member => (
                <div key={member.id} className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center">
                    <User className="mr-3 text-gray-600" size={24} />
                    <div>
                      <div className="font-semibold text-base">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.phone}</div>
                      <div className="text-sm text-gray-600">{member.relation}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Plus size={16} className="inline mr-2" />
              Add Member
            </button>
          </div>
        ))}
        
        <button className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-20">
          <Plus size={16} className="inline mr-2" />
          Create New Circle
        </button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

// SOS Records Component
const SOSRecords = () => {
  const [sosRecords] = useState(mockSOSRecords);

  return (
    <div className="min-h-screen bg-white">
      <div className="text-right p-2.5 text-sm text-gray-600">9:41 AM</div>
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

// Settings Component
const SettingsScreen = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="text-right p-2.5 text-sm text-gray-600">9:41 AM</div>
      <h1 className="text-center text-xl my-4">Settings</h1>
      
      <div className="px-5 pb-20">
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
            <div className="font-bold text-base mb-1">Emergency Settings</div>
            <div className="text-sm text-gray-600">Configure SOS alert preferences</div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
            <div className="font-bold text-base mb-1">Location Services</div>
            <div className="text-sm text-gray-600">Manage location sharing settings</div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
            <div className="font-bold text-base mb-1">Notifications</div>
            <div className="text-sm text-gray-600">Push notification preferences</div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
            <div className="font-bold text-base mb-1">Privacy & Security</div>
            <div className="text-sm text-gray-600">Data protection settings</div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
            <div className="font-bold text-base mb-1">Account Settings</div>
            <div className="text-sm text-gray-600">Profile and account management</div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

// Profile Component
const Profile = () => {
  const { user, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="text-right p-2.5 text-sm text-gray-600">9:41 AM</div>
      <h1 className="text-center text-xl my-4">Profile</h1>
      
      <div className="px-5 pb-20">
        {/* Profile Card */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-5 flex justify-between items-center">
          <div>
            <div className="text-lg font-bold mb-1">{user?.name || 'John Doe'}</div>
            <div className="text-sm text-gray-500">
              Joined {user?.joinDate || '2024-01-15'}
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors">
            Edit
          </button>
        </div>
        
        {/* Profile Options */}
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-base shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
            Account Information
            <ChevronRight className="float-right mt-0.5" size={16} />
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-base shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
            Emergency Contacts
            <ChevronRight className="float-right mt-0.5" size={16} />
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-base shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
            Location History
            <ChevronRight className="float-right mt-0.5" size={16} />
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-base shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
            Help & Support
            <ChevronRight className="float-right mt-0.5" size={16} />
          </div>
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 p-3 rounded-lg text-red-600 text-base shadow-sm hover:bg-red-100 transition-colors text-left"
          >
            Logout
          </button>
        </div>
        
        {/* Subscription Box */}
        <div className="bg-cyan-50 p-5 mt-5 rounded-2xl text-center">
          <div className="text-base text-gray-700 mb-2">Upgrade to Premium</div>
          <div className="text-sm text-gray-800 mb-3">Get advanced safety features</div>
          <button className="bg-red-600 text-white px-5 py-3 rounded-lg text-base hover:bg-red-700 transition-colors">
            Subscribe Now
          </button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

// Bottom Navigation Component
const BottomNavigation = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const navItems = [
    { path: '/dashboard', icon: Shield, label: 'Home' },
    { path: '/circles', icon: Users, label: 'Circles' },
    { path: '/records', icon: AlertCircle, label: 'Records' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white flex justify-around border-t border-gray-300 py-2.5 z-50">
      {navItems.map(({ path, icon: Icon, label }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={`text-center flex-1 ${
            currentPath === path ? 'text-blue-600' : 'text-gray-700'
          }`}
        >
          <Icon className="mx-auto mb-1" size={18} />
          <div className="text-xs">{label}</div>
        </button>
      ))}
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Main App Component
const SOSEmergencyApp = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="max-w-sm mx-auto bg-white min-h-screen">
          <Routes>
            <Route path="/" element={<PhoneInputScreen />} />
            <Route path="/SOSapp" element={<PhoneInputScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/otp" element={<OTPScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/reset-password" element={<ResetPasswordScreen />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/circles" 
              element={
                <ProtectedRoute>
                  <CircleManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/records" 
              element={
                <ProtectedRoute>
                  <SOSRecords />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <SettingsScreen />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default SOSEmergencyApp;
