import React, { useState, useEffect } from "react";
import { Table, Card, Row, Col, message, Tag } from "antd";
import axios from "axios";

function Notifications() {
    const [sessions, setSessions] = useState([]);
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/sessions");
                console.log("Sessions Response:", response.data);
                const allSessions = Object.values(response.data).flat(); // Flatten array in case it's divided by course

                // Filter upcoming sessions based on timestamp
                const now = new Date();
                const filteredSessions = allSessions.filter(session => {
                    const sessionDate = new Date(session.timestamp);
                    return sessionDate > now; // upcoming sessions
                });

                // Sort by timestamp
                filteredSessions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                setSessions(allSessions); // Store all sessions (optional, for complete info)
                setUpcomingSessions(filteredSessions); // Store only upcoming sessions
            } catch (error) {
                console.error("Error fetching sessions:", error);
                message.error("Error fetching sessions data");
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    // Function to determine the session status (Live Now, Upcoming, Completed)
    const getSessionStatus = (sessionTimestamp) => {
        const sessionDate = new Date(sessionTimestamp);
        const now = new Date();
        const sessionStartTime = new Date(sessionDate.getTime() - 60 * 60 * 1000); // 1 hour before session starts
        const sessionEndTime = new Date(sessionDate.getTime() + 60 * 60 * 1000); // 1 hour after session starts

        // Determine the status
        if (now >= sessionStartTime && now <= sessionEndTime) {
            return <Tag color="green">Live Now</Tag>;
        } else if (now < sessionDate) {
            return <Tag color="blue">Upcoming</Tag>;
        }
        return <Tag color="red">Completed</Tag>;
    };

    // Table columns for upcoming sessions
    const columns = [
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
            title: "Session Date",
            dataIndex: "timestamp",
            key: "timestamp",
            render: (timestamp) => new Date(timestamp).toLocaleString(), // Format the session timestamp to readable format
        },
        {
            title: "Status",
            key: "status",
            render: (record) => getSessionStatus(record.timestamp),
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="Upcoming Sessions" loading={loading}>
                        <Table
                            columns={columns}
                            dataSource={upcomingSessions}
                            rowKey="_id"
                            pagination={{ pageSize: 5 }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                <Col span={24}>
                    <Card title="Notifications" loading={loading}>
                        {upcomingSessions.length === 0 ? (
                            <p>No upcoming sessions at the moment.</p>
                        ) : (
                            upcomingSessions.map((session) => {
                                const sessionDate = new Date(session.timestamp);
                                const now = new Date();
                                const sessionStartTime = new Date(sessionDate.getTime() - 60 * 60 * 1000); // 1 hour before session starts

                                return (
                                    <div key={session._id} style={{ marginBottom: "10px" }}>
                                        <Tag color={now >= sessionStartTime && now <= sessionDate ? "green" : "blue"}>
                                            {now >= sessionStartTime && now <= sessionDate ? "Live Now!" : "Upcoming"}
                                        </Tag>
                                        <p>{session.title} is scheduled for {sessionDate.toLocaleString()}</p>
                                    </div>
                                );
                            })
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Notifications;
