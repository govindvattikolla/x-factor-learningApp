import React, { useEffect, useState } from "react";
import { Card, Button, List, message, Modal } from "antd";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const ViewAllSessions = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/courses");
            console.log("Fetched Courses:", response.data); // 🔍 Debugging
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
            message.error("Failed to load courses");
        }
    };
    
    

    return (
        <div style={styles.container}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>All Courses & Sessions</h2>
            <div style={styles.grid}>
                {courses.map((course) => (
                    <Card
                        key={course._id}
                        style={styles.card}
                        cover={<img alt={course.title} src={`http://localhost:5000${course.image}`} style={styles.image} />}
                        actions={[
                            <Button 
                                type="link" 
                                onClick={() => navigate(`/courses/${course._id}/sessions`)}
                            >
                                View All Sessions
                            </Button>,
                            
                        ]}
                    >
                        <Card.Meta title={<div style={styles.title}>{course.title}</div>} description={course.description} />
                    </Card>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
    },
    card: {
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
    },
    image: {
        height: "200px",
        objectFit: "cover",
    },
    title: {
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
    }
};

export default ViewAllSessions;
