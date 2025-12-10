import { Navigate, Outlet } from "react-router-dom";
import {useDispatch} from "react-redux";
import {setRole} from "@/features/userSlice.js";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    const role=localStorage.getItem("role");
    if (!role) {
        return <Navigate to="/login" replace />;
    }
    const dispatch = useDispatch();
    dispatch(setRole(role));

    return <Outlet />;
};

export default ProtectedRoute;