import React, { useState, useEffect } from "react";
import { Input, Button, DatePicker, message, Form, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

const AddSession = () => {
    const [title, setTitle] = useState("");
    const [timestamp, setTimestamp] = useState(null);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [recordingUrl, setRecordingUrl] = useState("");
    const [status, setStatus] = useState("Scheduled"); 
    const [courses, setCourses] = useState([]);

    // Fetch courses to select from
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/courses");
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
                message.error("Error fetching courses");
            }
        };
        fetchCourses();
    }, []);

    // Handle form submission
    const handleFormSubmit = async () => {
        if (!title || !timestamp || !category || !description || !status) {
            message.error("Please fill in all fields");
            console.log("Missing Fields:", { title, timestamp, category, description, status });
            return;
        }

        const requestData = {
            title,
            timestamp: new Date(timestamp).toISOString(), 
            courseId: category, 
            description,
            recordingUrl: (status === "Ongoing" || status === "Completed") ? recordingUrl : "", 
            status, 
        };

        console.log("Sending Data to Backend:", requestData);

        try {
            await axios.post("http://localhost:5000/api/sessions/add", requestData);
            message.success("Session added successfully");
            alert("session added successfully")

            // Clear form after submission
            setTitle("");
            setTimestamp(null);
            setCategory("");
            setDescription("");
            setRecordingUrl("");
            setStatus("Scheduled"); 
        } catch (error) {
            console.error("Error adding session:", error.response?.data || error);
            message.error("Error adding session");
            alert("error adding session")
        }
    };

    return (
        <div style={styles.container}>
            <Form layout="vertical" onFinish={handleFormSubmit} style={styles.form}>
                <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Session</h3>

                {/* Select Course */}
                <Form.Item label="Select Course" required>
                    <Select value={category} onChange={setCategory} placeholder="Choose a course">
                        {courses.map((course) => (
                            <Option key={course._id} value={course._id}>{course.title}</Option> 
                        ))}
                    </Select>
                </Form.Item>

                {/* Session Title */}
                <Form.Item label="Session Title" required>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter session title" />
                </Form.Item>

                {/* Session Date and Time */}
                <Form.Item label="Session Date and Time" required>
                    <DatePicker
                        showTime
                        value={timestamp ? dayjs(timestamp) : null}
                        onChange={(date, dateString) => setTimestamp(dateString)}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="Select session date and time"
                    />
                </Form.Item>

                {/* Session Description */}
                <Form.Item label="Session Description" required>
                    <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
                </Form.Item>

                {/* Session Status */}
                <Form.Item label="Session Status" required>
                    <Select value={status} onChange={setStatus}>
                        <Option value="Scheduled">Scheduled</Option>
                        <Option value="Ongoing">Ongoing</Option>
                        <Option value="Completed">Completed</Option>
                    </Select>
                </Form.Item>

                {/* Recording URL - Only appears when status is 'Ongoing' or 'Completed' */}
                {(status === "Ongoing" || status === "Completed") && (
                    <Form.Item label="Recording URL">
                        <Input 
                            value={recordingUrl} 
                            onChange={(e) => setRecordingUrl(e.target.value)} 
                            placeholder="Enter video URL (YouTube, Vimeo, etc.)" 
                        />
                    </Form.Item>
                )}

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add Session</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

// Style for the form and container
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: "-20px",
        height: '100vh',
        backgroundColor: '#bbe4e9',
    },
    form: {
        maxWidth: '500px',
        width: '100%',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
};

export default AddSession;
