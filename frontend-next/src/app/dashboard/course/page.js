"use client"
import AdminCourse from "@/components/course/AdminCourse.jsx";
import UserCourse from "@/components/course/UserCourse.jsx";
import { useSelector } from "react-redux";

const CoursePage = () => {
    const role = useSelector((state) => state.user.value);

    return role === "admin" ? <AdminCourse /> : <UserCourse />;
};

export default CoursePage;