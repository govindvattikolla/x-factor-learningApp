import React, { useEffect, useState } from "react";
import { Table, Avatar, message, Space, Button, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from "axios";

const ViewStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editStudent, setEditStudent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/students");
                setStudents(response.data);
            } catch (error) {
                message.error("Error fetching students");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Handle Edit Button Click
    const handleEdit = (student) => {
        setEditStudent(student);
        setFormData({
            name: student.name,
            email: student.email,
            phone: student.phone,
        });
        setIsModalVisible(true); // Show the modal
    };

    // Handle form data change
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle the Edit form submission
    const handleEditSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/students/${editStudent._id}`, formData);
            message.success("Student updated successfully");

            // Update the students list after successful edit
            setStudents(students.map(student => student._id === editStudent._id ? response.data : student));
            setIsModalVisible(false); // Close the modal
        } catch (error) {
            message.error("Error updating student");
        }
    };

    // Handle Delete functionality
    // Handle Delete functionality
const handleDelete = async (id, image) => {
    try {
        // Sending request to delete the student and their image
        const response = await axios.delete(`http://localhost:5000/api/students/${id}`, {
            data: { image }, // Pass the image path or URL
        });

        // Remove the student from the list
        setStudents(students.filter(student => student._id !== id));
        message.success("Student and image deleted successfully");
    } catch (error) {
        message.error("Error deleting student");
    }
};

         
    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <Avatar
                     src={
                         image && typeof image === "string" && image.startsWith("http")
                             ? image // If the image is already an absolute URL, use it directly
                             : image
                             ? `http://localhost:5000${image}` // If the image is a relative path, prepend the base URL
                             : "https://via.placeholder.com/50" // Fallback image if no image is available
                     }
                     onError={(e) => {
                         if (e && e.target) {
                             e.target.src = "https://via.placeholder.com/50"; // Fallback image in case of error
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
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        type="primary"
                    >
                        Edit
                    </Button>
                    <Button
                       icon={<DeleteOutlined />}
                       onClick={() => handleDelete(record._id, record.image)} // Pass the image path here
                       style={{ backgroundColor: 'red', borderColor: 'red', color: 'white' }} 
                    >
                       Delete
                    </Button>
                                
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <h2>Manage Students</h2>
            <Table columns={columns} dataSource={students} loading={loading} rowKey="_id" pagination={{ pageSize: 5 }} />

            {/* Edit Modal */}
            <Modal
                title="Edit Student"
                open={isModalVisible}
                onOk={handleEditSubmit}
                onCancel={() => setIsModalVisible(false)}
                okText="Update"
                cancelText="Cancel"
            >
                <Input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ marginBottom: 10 }}
                />
                <Input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ marginBottom: 10 }}
                />
                <Input
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{ marginBottom: 10 }}
                />
            </Modal>
        </div>
    );
};

export default ViewStudents;
