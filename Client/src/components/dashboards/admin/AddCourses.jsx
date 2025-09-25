import React, { useState } from "react";
import { Input, Button, Upload, message, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const AddCourse = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    // Handle image upload
    const handleImageChange = (info) => {
        if (info.file.status === "done") {
            setImage(info.file.response.filePath); 
        }
    };

    // Handle form submission
    const handleFormSubmit = async () => {
        if (!image || !title || !description || !price) {
            message.error("Please fill in all fields");
            return;
        }

        const requestData = {
            image,
            title,
            description,
            price: Number(price), // Ensure price is sent as a number
        };

        console.log("Sending Data to Backend:", requestData); // Debugging log

        try {
            const response = await axios.post("http://localhost:5000/api/courses/add", requestData);
            message.success("Course added successfully");
            alert("✅ Course added successfully!");

            // Clear form after submission
            setImage(null);
            setTitle("");
            setDescription("");
            setPrice("");
        } catch (error) {
            console.error("Error adding course:", error.response?.data || error);
            
            // Check if the error is due to a duplicate title
            if (error.response?.data?.error === "Course with this title already exists") {
                alert("⚠️ Course with this title already exists. Please use a different name.");
            } else {
                message.error("Error adding course");
            }
        }
    };

    return (
        <div style={styles.container}>
            <Form layout="vertical" onFinish={handleFormSubmit} style={styles.form}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Course</h2>

                <Form.Item label="Course Title" required>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter course title"
                    />
                </Form.Item>

                <Form.Item label="Course Image" required>
                    <Upload
                        name="image"
                        action="http://localhost:5000/api/upload/course"
                        listType="picture"
                        onChange={handleImageChange}
                        showUploadList={false}
                    >
                        <Button icon={<PlusOutlined />}>Upload Image</Button>
                    </Upload>
                    {image && <p>Selected File: {image.split('/').pop()}</p>}
                </Form.Item>

                <Form.Item label="Course Description" required>
                    <Input.TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter course description"
                    />
                </Form.Item>

                <Form.Item label="Course Price" required>
                    <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Add Course</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#bbe4e9',
        margin: '-25px'
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

export default AddCourse;
