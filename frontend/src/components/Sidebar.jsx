import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {LogOut, LayoutDashboard, Users, Settings, FileText, User, ShoppingBag} from "lucide-react";
const MENU_ITEMS = {
    admin: [
        {name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20}/>},
        {name: "Manage Users", path: "/dashboard/users", icon: <Users size={20}/>},
        {name: "Reports", path: "/dashboard/reports", icon: <FileText size={20}/>},
        {name: "Settings", path: "/dashboard/settings", icon: <Settings size={20}/>},
    ],
    user: [
        {name: "My Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20}/>},
        {name: "My Profile", path: "/dashboard/profile", icon: <User size={20}/>},
        {name: "My Orders", path: "/dashboard/orders", icon: <ShoppingBag size={20}/>},
        {name: "Settings", path: "/dashboard/settings", icon: <Settings size={20}/>},
    ]
};

const Sidebar = () => {
    const navigate = useNavigate();
    const {role} = useSelector((state) => state.user);
    const currentRole = role || "user";

    const linksToRender = MENU_ITEMS[currentRole] || MENU_ITEMS["user"];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col sticky top-0 left-0">
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <span className="text-xl font-bold text-blue-600">MyApp</span>
                <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded uppercase">
            {currentRole}
        </span>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1">
                {linksToRender.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/dashboard"}
                        className={({isActive}) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${
                                isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        {item.icon}
                        {item.name}
                    </NavLink>
                ))}
            </nav>


            <div className="p-4 border-t border-gray-100">
                <NavLink
                    to="/logout"
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                ><LogOut size={20}/>Logout</NavLink>
            </div>
        </aside>
);
};

export default Sidebar;