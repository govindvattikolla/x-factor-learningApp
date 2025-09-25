import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminDashboard from "./components/dashboards/admindashboard";
import UserDashboard from "./components/dashboards/userdashboard";
import { AuthProvider } from "./context/AuthContext";
import SignupPage from "./components/auth/SignUpPage";
import LoginPage from "./components/auth/LoginPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Use ProtectedRoute to protect the routes */}
          <Route
            path="/admin"
            element={<ProtectedRoute element={AdminDashboard} />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={UserDashboard} />}
          />

          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
