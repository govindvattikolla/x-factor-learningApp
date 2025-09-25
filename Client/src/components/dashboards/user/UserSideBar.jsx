import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DashboardOutlined, 
  CalendarOutlined, 
  FileTextOutlined, 
  BankOutlined,
  BellOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const UserSidebar = () => {
  const handleLogout = () => {
    // Clear user session data (Example: localStorage)
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <Menu mode='inline' className='menu-bar' defaultSelectedKeys={['dashboard']}>
      {/* Dashboard */}
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/user">Overview</Link>
      </Menu.Item>

      {/* Session Access */}
      <Menu.SubMenu key="sessions" icon={<CalendarOutlined />} title="Sessions">
        <Menu.Item key="all-courses">
          <Link to="/allcourses">All Courses</Link>
        </Menu.Item>
        <Menu.Item key="upcoming-sessions">
          <Link to="/sessions/upcoming">Upcoming Sessions</Link>
        </Menu.Item>
        <Menu.Item key="live-sessions">
          <Link to="/sessions/live">Join Live Session</Link>
        </Menu.Item>
        <Menu.Item key="recorded-sessions">
          <Link to="/sessions/recordings">Recorded Sessions</Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* Billing & Payment */}
      <Menu.SubMenu key="billingPayments" icon={<BankOutlined />} title="Billing & Payment">
        <Menu.Item key="view-invoices">
          <Link to="/billing/invoices">View Invoices</Link>
        </Menu.Item>
        <Menu.Item key="make-payment">
          <Link to="/billing/payment">Make Payment</Link>
        </Menu.Item>
        <Menu.Item key="transaction-history">
          <Link to="/billing/transactions">Payment History</Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* Notifications */}
      <Menu.Item key="notifications" icon={<BellOutlined />}>
        <Link to="/notifications">Notifications</Link>
      </Menu.Item>

      {/* Feedback */}
      <Menu.Item key="feedback" icon={<FileTextOutlined />}>
        <Link to="/feedback">Submit Feedback</Link>
      </Menu.Item>

      {/* Logout */}
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default UserSidebar;
