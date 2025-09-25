import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInAnonymously } from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import AuthAside from './Asidepage'; // Import AuthAside
import { useNavigate } from 'react-router-dom'; 
import './AuthPages.css';
import "bootstrap-icons/font/bootstrap-icons.css";



const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // List of admin emails
        const adminEmails = ['govind@gmail.com', 'rajesh@gmail.com'];

        // Sign in the user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        console.log('User logged in:', formData.email);

        let role = "user"; // Default role

        // Check if the user is in the hardcoded admin list
        if (adminEmails.includes(formData.email)) {
            role = "admin";
        } else {
            // Fetch user data from Firestore
            const userDocRef = doc(db, "users", userCredential.user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                role = userDoc.data().role || "user"; // Fallback to user if role isn't set
            } else {
                setError('User data not found.');
                alert('User data not found.');
                return;
            }
        }

        // Navigate based on role
        if (role === 'admin') {
            navigate('/admin'); // Admin dashboard route
        } else {
            navigate('/user'); // User dashboard route
        }
    } catch (err) {
        console.error('Login error:', err);
        setError('Login failed. Please check your credentials.');
        alert('Login failed. Please check your credentials.');
    }
};


  const handleSignupRedirect = () => {
    navigate('/signup'); // Redirect to the signup page when clicked
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address to reset your password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formData.email);
      alert('Password reset email sent. Please check your inbox.');
    } catch (err) {
      console.error('Error sending password reset email:', err);
      setError('Failed to send password reset email. Please try again.');
    }
  };

  // Handle Guest Login
  const handleGuestLogin = async () => {
    try {
      // Sign in anonymously
      const userCredential = await signInAnonymously(auth);
      console.log('Guest logged in:', userCredential.user);

     
      navigate('/user'); // redirect to user dashboard or any other page.
    } catch (err) {
      console.error('Error with guest login:', err);
      setError('Guest login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <AuthAside /> {/* Use AuthAside here */}

        <div className="auth-form-container">
          <div className="tabs">
            <div className="tab active">
              Login
            </div>
            <div
              className="tab"
              onClick={handleSignupRedirect} // Redirect to signup page when clicked
            >
              Sign Up
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Welcome back</h2>
            <p className="form-subtitle">Please enter your details to sign in</p>

            <div className="form-group">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
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

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-btn">Login</button>

            {/* Forgot Password Link */}
            <div style={{ textAlign: 'center', marginTop: '5px', marginBottom: '5px' }}>
              <a
                className="forgot-password-link"
                onClick={handleForgotPassword}
                style={{
                  color: '#007bff',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Forgot Password?
              </a>
            </div>

            <div className="separator">
              <span>OR</span>
            </div>

            {/* Guest Login Button */}
            <button type="button" className="social-btn google-btn" onClick={handleGuestLogin}>
            
            <i className="bi bi-person "></i>       Continue as Guest
            </button>

            <p className="toggle-form-prompt">
              Don't have an account? 
              <button 
                type="button" 
                className="toggle-form-btn"
                onClick={handleSignupRedirect} // Call handleLoginRedirect when clicked
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
