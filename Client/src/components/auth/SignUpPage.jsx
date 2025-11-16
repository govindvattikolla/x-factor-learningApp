import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, doc, getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';
import AuthAside from './Asidepage'; // Import AuthAside
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './AuthPages.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log('User signed up:', user.email);
      alert("Signup success");
      navigate('/login')

      alert("please log in now")

      // Check if the email is an admin (use hardcoded list or Firestore collection)
      const adminEmails = ['govind@gamil.com', 'rajesh@gmail.com']; // Hardcoded list of admin emails
      const role = adminEmails.includes(formData.email) ? 'admin' : 'user';

      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        role: role // Assign role based on admin list
      });

      console.log('User data saved in Firestore.');
      navigate('/login'); // Redirect to home page after successful signup
    } catch (err) {
      setError('Sign up failed. Please try again later.');
      alert("Signup failed");
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('User signed in with Google:', user.email);

      // Check if the user email is in the admin list
      const adminEmails = ['vattikollagovind@gamil.com', 'admin2@example.com']; //  list of admin emails
      const role = adminEmails.includes(user.email) ? 'admin' : 'user';

      // Save user to Firestore with the determined role
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || formData.name, // Use displayName if available
        email: user.email,
        role: role // Assign role based on admin list
      });

      console.log('User data saved in Firestore.');
      alert("Google Sign-up success");

      // Navigate to the home page after successful sign-up
      navigate('/home');
    } catch (err) {
      console.error('Error with Google sign-up:', err.message);
      alert('Google Sign-up failed. Please try again later.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <AuthAside /> 
        <div className="auth-form-container">
          <div className="tabs">
            <div
              className="tab" onClick={handleLoginRedirect}
            >
              Login
            </div>
            <div
              className="tab active"
            >
              Sign Up
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Create account</h2>
            <p className="form-subtitle">Please fill out the form to get started</p>

            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label htmlFor="name">  Full Name</label>
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

            <button type="submit" className="submit-btn">Create Account</button>

            <div className="separator">
              <span>OR</span>
            </div>

            <button type="button" className="social-btn google-btn" onClick={handleGoogleSignIn}>
              <i className="bi bi-google"></i> Continue with Google
            </button>

            <p className="toggle-form-prompt">
              Already have an account? 
              <button 
                type="button" 
                className="toggle-form-btn"
                onClick={handleLoginRedirect} // Call handleLoginRedirect when clicked
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
