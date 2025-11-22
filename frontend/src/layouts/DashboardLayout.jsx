import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar.jsx";

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden" >
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="md:hidden h-12"></div>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;