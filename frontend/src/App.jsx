import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthPage from "./pages/Authentication/AuthPage.jsx";
import Logout from "./pages/Logout.jsx";
import ProtectedRoute from "./service/ProtectedRoute.jsx";
import CoursePage from "./pages/CoursePage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<AuthPage/>}/>
                <Route path="/logout" element={<Logout />}/>
                <Route element={<ProtectedRoute />} path="/admin"  >
                    <Route path="course" element={<CoursePage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;