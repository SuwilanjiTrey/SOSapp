import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import PhoneInputScreen from './Components/auth/PhoneInputScreen';
import OTPScreen from './Components/auth/OTPScreen';
import RegisterScreen from './Components/auth/RegisterScreen';
import LoginScreen from './Components/auth/Login';
import ResetPasswordScreen from './Components/auth/ResetPasswordScreen';
import Dashboard from './Components/dashboard/dashboard';
import CircleManagement from './Components/circles/CircleManagement';
import SOSRecords from './Components/records/SOSRecords';
import SettingsScreen from './Components/settings/settings';
import Profile from './Components/profile/Profile';
import ProtectedRoute from './pages/ProtectedRoute';

export default function App() {
  return (
    // BrowserRouter should wrap the entire application to enable routing.
    // It is no longer aliased as Routes.
    <BrowserRouter>
      <AuthProvider>
        <div className="max-w-sm mx-auto bg-white min-h-screen">
          {/* Routes component is a container for all the Route components.
              It selects the first matching Route based on the URL. */}
          <Routes>
            <Route path="/" element={<PhoneInputScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/otp" element={<OTPScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/reset-password" element={<ResetPasswordScreen />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/circles" element={<ProtectedRoute><CircleManagement /></ProtectedRoute>} />
            <Route path="/records" element={<ProtectedRoute><SOSRecords /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
