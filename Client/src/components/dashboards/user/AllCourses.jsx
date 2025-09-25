import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Collapse } from "antd";

const { Panel } = Collapse;

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [expandedCourse, setExpandedCourse] = useState(null);

    useEffect(() => {
        // Fetch all courses with their respective sessions
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/courses");
                setCourses(response.data);
            } catch (error) {
    if (error.response) {
        console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
        console.error("No response received:", error.request);
    } else {
        console.error("Error setting up request:", error.message);
    }
}

        };

        fetchCourses();
    }, []);

    const toggleSessions = (courseId) => {
        setExpandedCourse(expandedCourse === courseId ? null : courseId);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>All Available Courses </h2>
            <div style={styles.courseGrid}>
                {courses.map((course) => (
                    <Card
                        key={course._id}
                        hoverable
                        style={styles.card}
                        cover={<img alt={course.title} src={`http://localhost:5000${course.image}`} style={styles.image} />}
                    >
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p><strong>Price:</strong> ₹{course.price}</p>
                        <Button onClick={() => toggleSessions(course._id)} type="primary">
                            {expandedCourse === course._id ? "Hide Sessions" : "View All Sessions"}
                        </Button>

                        {/* Show sessions when button is clicked */}
                        {expandedCourse === course._id && (
                            <Collapse style={styles.sessionContainer}>
                                {course.sessions.length > 0 ? (
                                    course.sessions.map((session) => (
                                        <Panel header={session.title} key={session._id}>
                                            <p><strong>Date:</strong> {session.timestamp}</p>
                                            <p><strong>Description:</strong> {session.description}</p>
                                        </Panel>
                                    ))
                                ) : (
                                    <p>No sessions available for this course.</p>
                                )}
                            </Collapse>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
    },
    heading: {
        marginBottom: "20px",
    },
    courseGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "10px",
        justifyContent: "center",
    },
    card: {
        width: "100%",
        maxWidth: "350px",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    image: {
        width: "100%",
        height: "180px",
        objectFit: "cover",
        borderRadius: "8px",
    },
    sessionContainer: {
        marginTop: "10px",
    },
};

export default AllCourses;
