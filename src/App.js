import "./App.css";
import HomePage from "./home/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SinglePage from "./components/watch/SinglePage";
import LoginPage from "./components/login";
import { upcome } from "./dummyData";
import RegisterPage from "./components/register";
import MainPage from "./components/main/Main";
import useUserStore from "./store/useUser";
import { useEffect, useLayoutEffect } from "react";

function App() {
    const currentUser = useUserStore();
    useEffect(() => {
        const localStorageUser = localStorage.getItem("user");
        if (localStorageUser) {
            currentUser.setUser(JSON.parse(localStorageUser));
        }
    }, [currentUser.accessToken]);
    return (
        <>
            <Router>
                {currentUser.accessToken ? (
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/upcomming" element={<MainPage items={upcome} title="Upcomming" />} />
                        <Route path="/singlepage/:id" element={<SinglePage />} />
                        {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<Navigate to={"/"} />} />
                    </Routes>
                )}
                {/* <Footer /> */}
            </Router>
        </>
    );
}

export default App;
