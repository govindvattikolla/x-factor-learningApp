import { Menu, Badge } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  DashboardOutlined, 
  CalendarOutlined, 
  FileTextOutlined, 
  BellOutlined,
  TeamOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import "./adminStyles.css"

const handleLogout = () => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};

const Sidebar = ({ collapsed }) => {
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    setNotificationsCount(5);
  }, []);

  return (
    <Menu mode='inline' className='menu-bar' defaultSelectedKeys={['dashboard']} inlineCollapsed={collapsed}>
      {/* Dashboard */}
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/Admin">Overview</Link>
      </Menu.Item>

      {/* Students Management */}
      <Menu.SubMenu key="students" icon={<TeamOutlined />} title="Students">
        <Menu.Item key="add-student">
          <Link to="/students/add">Add Student</Link>
        </Menu.Item>
        <Menu.Item key="view-student">
          <Link to="/students/view">Manage Students</Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* Session Management */}
      <Menu.SubMenu key="sessions" icon={<CalendarOutlined />} title="Session Management">
        <Menu.Item key="view-sessions">
          <Link to="/sessions/view">View All Sessions</Link>
        </Menu.Item>
        <Menu.Item key="add-sessions">
          <Link to="/sessions/add">Add Sessions</Link>
        </Menu.Item>
        <Menu.Item key="add-courses">
          <Link to="/courses/add">Add Courses</Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* Notifications */}
      <Menu.Item key="notifications" icon={collapsed ? <BellOutlined /> : <Badge count={notificationsCount}><BellOutlined /></Badge>}>
        <Link to="/notifications">Notifications</Link>
      </Menu.Item>

      {/* Feedback */}
      <Menu.Item key="feedback" icon={<FileTextOutlined />}>
        <Link to="/feedback">Feedback</Link>
      </Menu.Item>

      {/* Logout */}
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
