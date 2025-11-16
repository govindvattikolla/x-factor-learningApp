import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthAside from "./Authside";
import "./Auth.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [role, setRole] = useState("user"); 
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8000"; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        role,
        login: formData.login,
        password: formData.password,
      });

      const { token, role: userRole } = response.data;

      // Save token & role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);

     
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid login or password.");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <AuthAside />

        <div className="auth-form-container">
          <div className="tabs">
            <div className="tab active">Login</div>
            <div className="tab" onClick={handleSignupRedirect}>
              Sign Up
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Welcome  Back</h2>
            <p className="form-subtitle">Please enter your details to sign in</p>

            {/* Role Switch */}
            <div className="form-group">
              <label>Login as</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-control"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone or Email</label>
              <input
                type="text"
                name="login"
                placeholder="Enter phone or email"
                value={formData.login}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-btn">
              Login
            </button>

            <div className="separator">
              <span>OR</span>
            </div>

       

            <p className="toggle-form-prompt">
              Don't have an account?
              <button
                type="button"
                className="toggle-form-btn"
                onClick={handleSignupRedirect}
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
