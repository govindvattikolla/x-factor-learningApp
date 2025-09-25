import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const AddstudentForm = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleFinish = async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("address", values.address);
        formData.append("description", values.description);
    
        if (fileList.length > 0) {
            formData.append("image", fileList[0].originFileObj);
        }
    
        try {
            await axios.post("http://localhost:5000/api/students/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            message.success("Student added successfully");
            alert("Student added successfully");
            form.resetFields();
            setFileList([]);
        } catch (error) {
            message.error("Error adding student");
            alert("Error adding student");
            console.error("Upload error:", error);
        }
    };
    
    
    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
      <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            encType="multipart/form-data"
            style={{ maxWidth: 500, margin: "0 auto", padding: 20, background: "#bbe4e9", borderRadius: 8 }}
                >

            <Form.Item>
                <div className="upload-container">
                    <Upload listType="picture-circle" fileList={fileList} onChange={handleChange}>
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                </div>
            </Form.Item>

            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter the name" }]}>
                <Input placeholder="Enter Name" />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ type: "email", message: "Enter a valid email" }]}>
                <Input placeholder="Enter Email" />
            </Form.Item>

            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Please enter the phone number" }]}>
                <Input placeholder="Enter Phone" />
            </Form.Item>

            <Form.Item label="Address" name="address">
                <Input placeholder="Enter Address" />
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Input.TextArea placeholder="Additional Notes" rows={4} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Add student
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddstudentForm;

