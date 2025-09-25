import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Button } from 'react-bootstrap'; //for about section

// About section

  const AboutSection2 = () => {
  return (
    <section className="about-section py-5 bg-light" id="about">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="about-image-container">
              <img
                src="../src/assets/about_img3.jpg"
                alt="Students learning online"
                className="img-fluid rounded shadow  w-100 "
                
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="about-content ps-lg-4">
              <h2 className=" text-uppercase fw-bold" style={{ color: "orange" }}>About Us</h2>
              <h3 className="mb-4">Transform Your Future With Our Modern Learning Experience</h3>
              <p className="lead mb-4">
                We're dedicated to making education accessible, engaging, and effective for learners worldwide.
              </p>
              <p className="mb-4">
                Founded in 2025, our platform combines cutting-edge knowledge with expert-led instruction to deliver 
                high-quality courses across various disciplines. Whether you're looking to advance your career, 
                acquire a new skill, or explore a passion, our flexible learning environment is designed to 
                help you succeed at your own pace.
              </p>
              <Row className="mb-4">
                <Col sm={6}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <p className="mb-0">Expert Instructors</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <p className="mb-0">Flexible Learning</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <p className="mb-0">Interactive Content</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <p className="mb-0">Industry Recognized</p>
                  </div>
                </Col>
              </Row>
              <div className="d-flex">
                <Button variant="primary" className="me-3">Explore Courses</Button>
                <Button variant="outline-secondary">Learn More</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection2;