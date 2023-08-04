import "./App.css";
import HomePage from "./home/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SinglePage from "./components/watch/SinglePage";
import LoginPage from "./components/login";
import { upcome } from "./dummyData";
import RegisterPage from "./components/register";
import MainPage from "./components/main/Main";
import useUserStore from "./store/useUser";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import HomeLayout from "./layouts/HomeLayout";

function App() {
    const currentUser = useUserStore();
    const [localStorageUser, setLocalStorageUser] = useState(localStorage.getItem("user"));

    useEffect(() => {
        if (localStorageUser) {
            currentUser.setUser(JSON.parse(localStorageUser));
        }
    }, [localStorageUser]);

    useEffect(() => {
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleStorageChange = () => {
        setLocalStorageUser(localStorage.getItem("user"));
    };
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Router>
                {JSON.parse(localStorageUser ?? "{}").accessToken ? (
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route path="/" element={<HomeLayout />}>
                            <Route path="/upcomming" element={<MainPage items={upcome} title="Upcomming" />} />
                            <Route path="/singlepage/:id" element={<SinglePage />} />
                            <Route path="*" element={<Navigate to={"/"} />} />
                        </Route>
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<Navigate to={"/login"} />} />
                    </Routes>
                )}
                {/* <Footer /> */}
            </Router>
        </>
    );
}

export default App;
