import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"
import { Link } from "react-router-dom";

// Navbar component
export default  function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fw-bold" href="#">
          <img src="../src/assets/XFactor_mainLogo.jpg" alt="Logo" height={70} className="me-2" />
        </a>

        {/* Mobile Toggle Button */}
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><a className="nav-link fs-5" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link fs-5" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link fs-5" href="#">Programs</a></li>
            <li className="nav-item"><a className="nav-link fs-5" href="#">Trainers</a></li>
            <li className="nav-item"><a className="nav-link fs-5" href="#reviews">Reviews</a></li>
            <li className="nav-item"><a className="nav-link fs-5" href="#contact">Contact us</a></li>
          </ul>

          {/* Login Button - Visible in Large Screens */}
          <div className="d-none d-lg-block m-2">
           <Link to={"/login"}> <a className="btn btn-primary px-4 m-2" href="#">Login</a></Link> 
          </div>
          <div className="d-none d-lg-block">
           <Link to={"/signup"}> <a className="btn btn-primary px-4" href="#">SignUp</a></Link> 
          </div>

          

        </div>

        {/* Login Button - Visible in Small Screens */}
        {isOpen && (
          <div className="d-lg-none text-center mt-3">
           <Link to={"/login"}><a className="btn btn-primary px-4 m-2" href="#">Login</a></Link> 
            <Link to={"/signup"}><a className="btn btn-primary px-4" href="#">SignUp</a></Link>
          </div>
        )}
      </div>
    </nav>
  );
}