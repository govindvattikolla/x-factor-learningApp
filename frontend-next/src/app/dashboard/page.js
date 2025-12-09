'use client'
import { useSelector } from "react-redux";
import AdminDashboard from "@/components/DashboardComponents/AdminDashboard.jsx";
import UserDashboard from "@/components/DashboardComponents/UserDashboard.jsx";

const CoursePage = () => {
    const role = useSelector((state) => state.user.role);

    return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default CoursePage;