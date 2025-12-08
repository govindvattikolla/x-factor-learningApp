import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthPage from "./pages/Authentication/AuthPage.jsx";
import Logout from "./pages/Logout.jsx";
import ProtectedRoute from "./service/ProtectedRoute.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import DashboardLayout from "@/layouts/DashboardLayout.jsx";
import SingleCourse from "@/pages/SingleCourse.jsx";
import Profile from "@/pages/Profile.jsx";
import Purchases from "@/pages/Purchases.jsx";
import XFactorLanding from "@/components/XFactorLanding.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<XFactorLanding />}/>
                <Route path="/login" element={<AuthPage/>}/>
                <Route path="/signup" element={<AuthPage/>}/>
                <Route path="/logout" element={<Logout />}/>
                <Route element={<ProtectedRoute />}  >
                    <Route element={<DashboardLayout /> } path="/dashboard" >
                        <Route path="" element={<Dashboard />}/>
                        <Route path="purchases" element={<Purchases />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="course" element={<CoursePage />}/>
                        <Route path="course/:id" element={<SingleCourse />}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;