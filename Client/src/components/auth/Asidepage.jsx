// AuthAside.js
import React from 'react';
import './AuthPages.css';

const AuthAside = () => {
  return (
    <div className="auth-side">
      <div className="auth-side-content">
        <h2>XFACTOR</h2>
        <p>Accelerate your career with our expert-led courses</p>
        <div className="auth-features">
          <div className="feature">
            <div className="feature-icon">🚀</div>
            <div className="feature-text">
              <h3>Expert Courses</h3>
              <p>Learn from industry professionals</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">💻</div>
            <div className="feature-text">
              <h3>Flexible Learning</h3>
              <p>Study at your own pace, anywhere</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">🏆</div>
            <div className="feature-text">
              <h3>Career Success</h3>
              <p>92% of students report career advancement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthAside;
