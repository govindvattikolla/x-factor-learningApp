import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Header.css"; // Import the CSS file for header
import backgroundImage from "../../assets/header_image1.jpg";

// Header Component

export default function Header2() {
  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    id="home">
      <div className="container text-center text-white">
        <h1 className="hero-title">Unlock Your Potential with XFactor</h1>
        <p className="hero-subtitle">
          Join our platform and master new skills with expert-led courses.
        </p>
        <a href="#" className="btn btn-primary btn-lg mt-3">Get Started</a>
      </div>
    </section>
  );
}
