import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./route/Home.jsx";
import AuthPage from "./route/Authentication/AuthPage.jsx";
import Logout from "./route/Logout.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<AuthPage/>}/>
                <Route path="/logout" element={<Logout />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;