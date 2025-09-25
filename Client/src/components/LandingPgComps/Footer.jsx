import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap'; //footer
import "bootstrap-icons/font/bootstrap-icons.css"; //footer icons

// footer section

 const Footer2 = () => {
  return (
    <footer className="bg-dark text-white py-5" id="contact">
      <Container>
        <Row className="gy-4">
          {/* Logo and About Column */}
          <Col lg={4} md={6}>
            <div className="footer-logo mb-3">
              {/* Replace with your actual logo */}
              <img src="../../src/assets/XFactor_mainLogo.jpg" alt="xfaxtor Logo" className="img-fluid" style={{height:"150px"}}/>
            </div>
            <p className="mb-4">
              Empowering professionals through expert-led courses designed to accelerate career growth
              and unlock new opportunities in today's competitive job market.
            </p>
            <div className="social-links">
              <a href="#" className="me-3 text-white fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="me-3 text-white fs-5">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="me-3 text-white fs-5">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="me-3 text-white fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white fs-5">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </Col>

          {/* Quick Links Column */}
          <Col lg={2} md={6}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right me-1 small"></i> Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#about" className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right me-1 small"></i> About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#courses" className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right me-1 small"></i> Courses
                </a>
              </li>
              <li className="mb-2">
                <a href="#reviews" className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right me-1 small"></i> Blog
                </a>
              </li>
              <li className="mb-2">
                <a href="#contact" className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right me-1 small"></i> Contact
                </a>
              </li>
            </ul>
          </Col>

          {/* Courses Column */}
          <Col lg={2} md={6}>
            <h5 className="mb-3">Our Courses</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <a href="#courses" className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right me-1 small"></i> Fundamentals of Prompts
                </a>
              </li>
              <li className="mb-2">
                <a href="#courses" className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right me-1 small"></i> Communication Sessions
                </a>
              </li>
              <li className="mb-2">
                <a href="#courses" className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right me-1 small"></i> Resume Building
                </a>
              </li>
              <li className="mb-2">
                <a href="#courses" className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right me-1 small"></i> LinkedIn Optimization
                </a>
              </li>
              <li className="mb-2">
                <a href="#courses" className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right me-1 small"></i> All Courses
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Info Column */}
          <Col lg={4} md={6}>
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled contact-info">
              <li className="mb-3 d-flex">
                <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                <span>123 Education Street, Learning City, 10001</span>
              </li>
              <li className="mb-3 d-flex">
                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                <a href="mailto:govindvattikolla@gamil.com" className="text-white-50 text-decoration-none">
                  info@example.com
                </a>
              </li>
              <li className="mb-3 d-flex">
                <i className="bi bi-telephone-fill me-2 text-primary"></i>
                <a href="tel:+1234567890" className="text-white-50 text-decoration-none">
                  +1 (91) 567-890
                </a>
              </li>
              <li className="mb-4 d-flex">
                <i className="bi bi-clock-fill me-2 text-primary"></i>
                <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
            <h5 className="mb-3">Subscribe</h5>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Your email"
                aria-label="Your email"
                aria-describedby="subscribe-button"
              />
              <Button variant="primary" id="subscribe-button">
                Subscribe
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {/* Copyright Bar */}
        <Row className="mt-4 pt-4 border-top border-secondary">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">&copy; 2025 XFACTOR. All rights reserved. Developed by govind</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#" className="text-white-50 text-decoration-none">Privacy Policy</a>
              </li>
              <li className="list-inline-item ms-3">
                <a href="#" className="text-white-50 text-decoration-none">Terms of Service</a>
              </li>
              <li className="list-inline-item ms-3">
                <a href="#" className="text-white-50 text-decoration-none">Cookie Policy</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer2