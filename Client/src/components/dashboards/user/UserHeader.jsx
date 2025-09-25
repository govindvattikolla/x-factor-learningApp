import React from "react";
import { Avatar, Layout, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logo from "../../../assets/XFactor_mainLogo.jpg";

const { Header } = Layout;
const { Search } = Input;

const UserHeader = () => {
    return (
        <Header
            className="admin-header"
            style={{
                padding: '0 24px', 
                backgroundColor: '#fff', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                position: 'sticky', 
                top: 0, 
                zIndex: 1000, 
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', 
                marginLeft:'-30px'
            }}
        >
            {/* Logo */}
            <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="XFactor Logo" className="logo" style={{ height: '50px', objectFit: 'contain' }} />
            </div>

            {/* Title */}
            <Typography.Title level={4} style={{ margin: 0, flex: 1, textAlign: 'center' }}>
                Welcome User
            </Typography.Title>

            {/* Search & User Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Search
                    placeholder="Search Dashboard"
                    allowClear
                    style={{ width: 250 }}
                />
                <Avatar icon={<UserOutlined />} />
            </div>
        </Header>
    );
};

export default UserHeader;
