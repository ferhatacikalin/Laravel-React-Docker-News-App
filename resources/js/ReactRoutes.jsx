import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { selectUser } from "./store/userSlice";
import Settings from "./pages/settings";

const ReactRoutes = () => {
    const user = useSelector(selectUser);

    return (
        <BrowserRouter>
            <Navbar />
            <main className="bg-white-50 h-full  mx-auto">
                <Routes>
                    <Route
                        path="/"
                        element={user ? <Home /> : <Navigate to="login" />}
                    />
                    <Route
                    element={user ? <Settings /> : <Navigate to="/login" />}
                    path="/settings"
                    />
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/" /> : <Login />}
                    />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="/" /> : <Register />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default ReactRoutes;
