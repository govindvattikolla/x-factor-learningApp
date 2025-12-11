'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
    LogOut,
    LayoutDashboard,
    Users,
    Settings,
    FileText,
    User,
    ShoppingBag,
    Menu,
    X,
    Video,
} from "lucide-react";
import axiosInstance from "@/service/axiosInstance";
import { setUser } from "@/features/userSlice";

const MENU_ITEMS = {
    admin: [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Manage Users", path: "/dashboard/users", icon: <Users size={20} /> },
        { name: "Reports", path: "/dashboard/reports", icon: <FileText size={20} /> },
        { name: "Settings", path: "/dashboard/settings", icon: <Settings size={20} /> },
    ],
    user: [
        { name: "My Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Courses", path: "/dashboard/course", icon: <Video size={20} /> },
        { name: "My Profile", path: "/dashboard/profile", icon: <User size={20} /> },
        { name: "My Orders", path: "/dashboard/purchases", icon: <ShoppingBag size={20} /> },
    ],
};

const Sidebar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const dispatch = useDispatch();
    const pathname = usePathname();

    const { role } = useSelector((state) => state.user || { role: "user" });
    const currentRole = role || "user";
    const linksToRender = MENU_ITEMS[currentRole] || MENU_ITEMS["user"];

    const fetchProfile = async () => {
        try {
            const res = await axiosInstance.get("/api/user/me",{
                withCredentials: true,
            });
            const data = res.data;
            if (!data.image) {
                data.image = "https://placehold.co/150";
            }
            dispatch(setUser(data));
        } catch (error) {
            console.error("Error fetching profile", error);
        }
    };

    useEffect(() => {
        fetchProfile().then(r => console.log("fetched profile", r));
    }, []);

    const isActiveLink = (path) => {
        if (path === "/dashboard") {
            return pathname === "/dashboard";
        }
        return pathname.startsWith(path);
    };

    return (
        <>
            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-md shadow-md text-gray-600 hover:bg-gray-50"
            >
                <Menu size={24} />
            </button>

            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside
                className={`
             fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col
            transition-transform duration-300 ease-in-out
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-screen`}
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-blue-600">XFACTOR</span>
                        <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded uppercase">
                            {currentRole}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                    {linksToRender.map((item) => {
                        const active = isActiveLink(item.path);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsMobileOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${
                                    active
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100 flex-shrink-0">
                    <Link
                        href="/logout"
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                        <LogOut size={20} />
                        Logout
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;