import React, { useEffect, useState } from 'react';
import { Card, Row, Col, message, Table, Avatar } from 'antd';
import axios from 'axios';

function DashboardContent() {
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0); // State for courses
    const [totalFeedbacks, setTotalFeedbacks] = useState(0);
    const [students, setStudents] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [courses, setCourses] = useState([]); // State for courses
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const studentsResponse = await axios.get("http://localhost:5000/api/students");
                const sessionsResponse = await axios.get("http://localhost:5000/api/sessions");
                const coursesResponse = await axios.get("http://localhost:5000/api/courses");

                // Log the response to ensure data structure is as expected
                console.log("Students Response:", studentsResponse.data);
                console.log("Sessions Response:", sessionsResponse.data);
                console.log("Courses Response:", coursesResponse.data);

                // Flatten the session data (assuming it's divided by course)
                const allSessions = Object.values(sessionsResponse.data).flat(); // Combine all course-wise sessions into a single array

                // Update the state
                setStudents(Array.isArray(studentsResponse.data) ? studentsResponse.data : []);
                setSessions(allSessions); // Flattened sessions
                setCourses(Array.isArray(coursesResponse.data) ? coursesResponse.data : []); // Set courses data
                setTotalStudents(studentsResponse.data.length);
                setTotalSessions(allSessions.length); // Updated session count
                setTotalCourses(coursesResponse.data.length); // Set total courses count
            } catch (error) {
                console.error("Error fetching data:", error);
                message.error("Error fetching dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Columns for the students table
    const studentColumns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <Avatar
                    src={
                        image && typeof image === "string" && image.startsWith("http")
                            ? image
                            : image
                            ? `http://localhost:5000${image}`
                            : "https://via.placeholder.com/50"
                    }
                    onError={(e) => {
                        if (e && e.target) {
                            e.target.src = "https://via.placeholder.com/50";
                        }
                    }}
                />
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
    ];

    // Columns for the sessions table
    const sessionColumns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Timestamp",
            dataIndex: "timestamp",
            key: "timestamp",
            render: (timestamp) => new Date(timestamp).toLocaleString(),
        },
        // Add more columns if needed for other session details
    ];

    // Updated columns for the courses table (replacing instructor and duration with image and price)
    const courseColumns = [
        {
            title: "title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <Avatar
                    src={
                        image && typeof image === "string" && image.startsWith("http")
                            ? image
                            : image
                            ? `http://localhost:5000${image}`
                            : "https://via.placeholder.com/50"
                    }
                    onError={(e) => {
                        if (e && e.target) {
                            e.target.src = "https://via.placeholder.com/50";
                        }
                    }}
                />
            )
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => (
                <span>{price ? `$${price.toFixed(2)}` : "$0.00"}</span> // Format price
            )
        },
    ];

    return (
        <>
            <Row gutter={[16, 16]} style={{ padding: '20px', textAlign: 'center' }}>
                <Col span={6}>
                    <Card title="Total Students" className="dashboard-card" loading={loading}>
                        <p>{totalStudents}</p>
                    </Card>
                </Col>

                <Col span={6}>
                    <Card title="Total Courses" className="dashboard-card" loading={loading}>
                        <p>{totalCourses}</p> {/* Showing total number of courses */}
                    </Card>
                </Col>

                <Col span={6}>
                    <Card title="Total Sessions" className="dashboard-card" loading={loading}>
                        <p>{totalSessions}</p>
                    </Card>
                </Col>
                
                <Col span={6}>
                    <Card title="Feedbacks" className="dashboard-card" loading={loading}>
                        <p>{totalFeedbacks}</p>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="Student Details">
                        <Table
                            columns={studentColumns}
                            dataSource={students}
                            loading={loading}
                            rowKey="_id"
                            pagination={{ pageSize: 5 }}
                        />
                    </Card>
                </Col>
            </Row>

              {/* Display Courses in a Table */}
              <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col span={24}>
                    <Card title="Course Details">
                        <Table
                            columns={courseColumns}
                            dataSource={courses}
                            loading={loading}
                            rowKey="_id"
                            pagination={{ pageSize: 5 }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Display Sessions in a Table */}
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col span={24}>
                    <Card title="Session Details">
                        <Table
                            columns={sessionColumns}
                            dataSource={sessions}
                            loading={loading}
                            rowKey="_id"
                            pagination={{ pageSize: 5 }}
                        />
                    </Card>
                </Col>
            </Row>

          
        </>
    );
}

export default DashboardContent;
