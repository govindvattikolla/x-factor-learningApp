import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthAside from "./Authside";
import "./Auth.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8000"; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/signup`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      alert("Signup successful! Please login.");
      navigate("/login");

    } catch (err) {
      console.error("Signup error:", err);

      if (err.response?.status === 400) {
        setError(err.response.data.message); // iff email/phno aleady exist
      } else {
        setError("Signup failed. Please try again later.");
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <AuthAside />

        <div className="auth-form-container">
          <div className="tabs">
            <div className="tab" onClick={handleLoginRedirect}>
              Login
            </div>
            <div className="tab active">Sign Up</div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <p className="form-subtitle">
              Please fill out the form to get started
            </p>

            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email"> Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone"> Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password"> Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>

            <p className="toggle-form-prompt">
              Already have an account?
              <button
                type="button"
                className="toggle-form-btn"
                onClick={handleLoginRedirect}
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
