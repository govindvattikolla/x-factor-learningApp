import React, { useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/dashboards/user/UserSideBar';
import './components/dashboards/user/UserStyles.css';
import UserHeader from './components/dashboards/user/UserHeader';
import UserDbContent from './components/dashboards/user/UserDbContent';
import AllCourses from './components/dashboards/user/AllCourses';

const { Sider, Header, Content } = Layout;

const TestUser = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                {/* Header Section */}
                <Header className='Header'>
                    <UserHeader />
                </Header>

                <Layout>
                    {/* Sidebar Section */}
                    <Sider
                        theme='light'
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        className='sider'
                        style={{ overflowY: "auto" }}
                        onMouseEnter={() => setCollapsed(false)}
                        onMouseLeave={() => setCollapsed(true)}
                    >
                        <Sidebar />
                    </Sider>

                    {/* Main Content Section */}
                    <Layout style={{ marginLeft: collapsed ? '80px' : '250px', transition: 'margin-left 0.3s' }}>
                        <Content className='Content'>
                            <Routes>
                                <Route path="/" element={<UserDbContent />} />
                                <Route path="/User" element={<UserDbContent />} />
                                <Route path="/allCourses" element={<AllCourses />} />
                                
                                
                               
                                {/* Add a 404 Page Not Found Route */}
                                <Route path="*" element={<h2>Page Not Found</h2>} />
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </Router>
    );
}

export default TestUser;