import React, { useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/dashboards/admin/sidebar';
import './components/dashboards/admin/adminStyles.css';
import AdminHeader from './components/dashboards/admin/adm_header';
import DashboardContent from './components/dashboards/admin/DashboardCont';

import Appointments from './components/dashboards/admin/appointment';
import MedicalRecords from './components/dashboards/admin/MedicalRec';


import ViewStudents from './components/dashboards/admin/StudentManagement/ViewStudents';


import AddSession from './components/dashboards/admin/AddNewSession';
import AddstudentForm from './components/dashboards/admin/StudentManagement/addStudents';
import AddCourse from './components/dashboards/admin/AddCourses';
import ViewAllSessions from './components/dashboards/admin/ViewAllSessions';
import SessionsPage from './components/dashboards/admin/specificSession';
import Notifications from './components/dashboards/admin/AdminNotifications';
const { Sider, Header, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                {/* Header Section */}
                <Header className='Header'>
                    <AdminHeader />
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
                                <Route path="/" element={<DashboardContent />} />
                                <Route path="/Admin" element={<DashboardContent />} />
                                <Route path="/students/add" element={<AddstudentForm />} />
                                <Route path="/sessions/view" element={<ViewAllSessions />} />
                                
                                <Route path="/sessions/add" element={<AddSession />} />
                                <Route path="/courses/:courseId/sessions" element={<SessionsPage />} /> 
                                <Route path="/courses/add" element={<AddCourse />} />

                                <Route path="/students/view" element={<ViewStudents/>} />
                                <Route path="/appointments" element={<Appointments />} />
                                <Route path="/medicalRecords" element={<MedicalRecords />} />
                                <Route path="/notifications" element={<Notifications/>} />
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

export default App;