import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'; //for courses
import "./courses.css" //courses styles

// Courses section
 const CoursesSection2 = () => {
  const courses = [
    {
      id: 1,
      title: "15-Days 5-Skills ",
     description: [
      "LinkedIn Profile Creation and Optimization",
      "Foundation of Generative AI",
      "Foundation of LLMs",
      "Foundation of Prompt Engineering",
      "7+ AI Tools Bootcamp"
    ],
      duration: "4 weeks",
     
      image: "../../src/assets/about-img2.jpg",
      category: "AI Skills",
      comingSoon:true,
      featured: true
    },
    {
      id: 2,
      title: "Communication Sessions",
      description: [
      "LinkedIn Profile Creation and Optimization",
      "Foundation of Generative AI",
      "Foundation of LLMs",
      "Foundation of Prompt Engineering",
      "7+ AI Tools Bootcamp"
    ],
      duration: "6 weeks",
      
      image: "../../src/assets/about_img3.jpg",
      category: "Professional Skills",
      featured: true
    },
    {
      id: 3,
      title: "Resume Building",
      description: [
      "LinkedIn Profile Creation and Optimization",
      "Foundation of Generative AI",
      "Foundation of LLMs",
      "Foundation of Prompt Engineering",
      "7+ AI Tools Bootcamp"
    ],
      duration: "3 weeks",
     
      image: "../../src/assets/about_img3.jpg",
      category: "Career Development",
      featured: false
    },
    {
      id: 4,
      title: "LinkedIn Optimization",
      description: [
      "LinkedIn Profile Creation and Optimization",
      "Foundation of Generative AI",
      "Foundation of LLMs",
      "Foundation of Prompt Engineering",
      "7+ AI Tools Bootcamp"
    ],
      duration: "4 weeks",
      
      image: "../../src/assets/about-img2.jpg",
      category: "Digital Presence",
      featured: false
    }
  ];

  return (
    <section className="courses-section py-5" id="courses">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center ">
            <h1 className="text-orange text-uppercase fw-bold">Our Programs</h1>
            <h2 className="mb-3">Accelerate Your Career Growth</h2>
            <p className="lead">Comprehensive programs designed to help you stand out in today's competitive job market</p>
          </Col>
        </Row>

       <Row className="g-4">
  {courses.map((course) => (
    <Col key={course.id} xs={10} md={6}>
      <Card className="h-100 border-0 shadow-lg hover-card" style={{ maxWidth: "500px", margin: "auto" }}>
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={course.image}
            alt={course.title}
            style={{ height: "180px", objectFit: "cover" }}
          />

          {/* Overlay Text - Coming Soon */}
          {course.comingSoon && (
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", color: "#fff", fontSize: "1.5rem", fontWeight: "bold", zIndex: 1 }}
            >
              Coming Soon
            </div>
          )}

          {course.featured && (
            <Badge bg="warning" className="position-absolute top-0 end-0 m-2">Featured</Badge>
          )}
          <Badge bg="primary" className="position-absolute bottom-0 start-0 m-2">{course.category}</Badge>
        </div>

        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between mb-0">
            <Badge bg="light" text="dark">{course.duration}</Badge>
            <span className="text-warning">
              <i className="bi bi-star-fill me-1"></i>
              {course.rating}
            </span>
          </div>
          <Card.Title className="mb-3">{course.title}</Card.Title>
          <ul className="mb-3 flex-grow-1 ps-3">
            {course.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <small className="text-muted">{course.students} students</small>
            <small className="text-muted">{course.level}</small>
          </div>
        </Card.Body>
        <Card.Footer className="bg-white border-0">
          <div className="d-grid">
            <Button variant="outline-primary">Enroll Now</Button>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  ))}
</Row>

        
        <Row className="mt-5">
          <Col className="text-center">
            <p className="lead mb-4">Not sure which course is right for you?</p>
            <Button variant="primary" size="lg" className="px-4">Schedule a Free Consultation</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CoursesSection2