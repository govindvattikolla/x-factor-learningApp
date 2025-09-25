
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from 'react-bootstrap';//reviews

// reviews section

 const ReviewsSection2 = () => {
    const reviews = [
      {
        id: 1,
        name: "Michael Chen",
        position: "Software Developer",
        company: "Tech Innovations",
        image: "/api/placeholder/100/100",
        course: "Fundamentals of Prompts",
        text: "This course completely transformed my approach to working with AI. The prompt engineering techniques I learned have made me significantly more productive at work. Our team now uses these methods for all our AI interactions.",
        rating: 5,
        date: "January 15, 2025"
      },
      {
        id: 2,
        name: "Priya Sharma",
        position: "Marketing Manager",
        company: "Global Brands Inc.",
        image: "/api/placeholder/100/100",
        course: "Communication Sessions",
        text: "The communication sessions helped me overcome my anxiety about public speaking. The instructor provided personalized feedback that addressed my specific challenges. I've since led three successful product launches with confidence.",
        rating: 5,
        date: "December 8, 2024"
      },
      {
        id: 3,
        name: "James Wilson",
        position: "Recent Graduate",
        company: "University of Technology",
        image: "../src/assets/about_img3.jpg",
        course: "Resume Building",
        text: "After struggling for months to get interviews, I took this resume building course and everything changed. Within two weeks of updating my resume with the techniques taught, I received callbacks from 5 companies and landed my dream job!",
        rating: 5,
        date: "February 3, 2025"
      },
      {
        id: 4,
        name: "Sophia Rodriguez",
        position: "Freelance Consultant",
        company: "Self-employed",
        image: "/api/placeholder/100/100",
        course: "LinkedIn Optimization",
        text: "The LinkedIn Optimization course was a game-changer for my freelance business. I've seen a 200% increase in inbound leads and have been able to raise my rates. The instructor's insights on content strategy were particularly valuable.",
        rating: 4,
        date: "January 22, 2025"
      }
    ];
  
    // Function to render stars based on rating
    const renderStars = (rating) => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(
          <i 
            key={i} 
            className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'} text-warning me-1`}
          ></i>
        );
      }
      return stars;
    };
  
    return (
      <section className="reviews-section py-5 bg-light" id="reviews">
        <Container>
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h2 className=" text-uppercase fw-bold" style={{color:"orange"}}>Student Reviews</h2>
              <h3 className="mb-3">What Our Students Say</h3>
              <p className="lead">Hear from professionals who have transformed their careers with our courses</p>
            </Col>
          </Row>
  
          <Row className="g-4">
            {reviews.map((review) => (
              <Col key={review.id} md={6} lg={3}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="d-flex mb-3">
                      {renderStars(review.rating)}
                    </div>
                    
                    <Card.Text className="mb-4">"{review.text}"</Card.Text>
                    
                    <div className="d-flex align-items-center">
                      <img 
                        src={review.image} 
                        alt={review.name} 
                        className="rounded-circle me-3"
                        width="60"
                        height="60"
                        style={{ objectFit: "cover" }}
                      />
                      <div>
                        <h5 className="mb-0">{review.name}</h5>
                        <p className="mb-0 text-muted">{review.position}</p>
                        <small className="" style={{color:"orange"}}>{review.course}</small>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white text-muted border-0 pt-0">
                    <small>Posted on {review.date}</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
  
          <Row className="mt-5">
            <Col lg={8} className="mx-auto text-center">
              <div className="review-stats d-flex flex-wrap justify-content-center">
                <div className="px-4 py-2 text-center">
                  <h3 className="mb-0 fw-bold text-primary">100+</h3>
                  <p className="mb-0">Satisfied Students</p>
                </div>
                <div className="px-4 py-2 text-center">
                  <h3 className="mb-0 fw-bold text-primary">4.8</h3>
                  <p className="mb-0">Average Rating</p>
                </div>
                <div className="px-4 py-2 text-center">
                  <h3 className="mb-0 fw-bold text-primary">92%</h3>
                  <p className="mb-0">Completion Rate</p>
                </div>
                <div className="px-4 py-2 text-center">
                  <h3 className="mb-0 fw-bold text-primary">87%</h3>
                  <p className="mb-0">Career Advancement</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  };

  export default ReviewsSection2;