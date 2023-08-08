import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../Images/Image";
import "./index.scss";
import AxiosInstance from "../../axios/axios";
import useUserStore from "../../store/useUser";
import { toast } from "react-toastify";
import { StatusType } from "../../enum";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // handle navigate
    const navigate = useNavigate();
    // login and register

    const userAuth = useUserStore();

    const handleValidation = () => {
        if (!username.trim() || !password.trim()) {
            toast.error("Please fill in all fields.");
            return false;
        }
        if (username.trim().length < 5) {
            toast.error("Username must be at least 5 characters long");
            return false;
        }
        if (/\s/.test(username.trim())) {
            toast.error("Username cannot contain spaces");
            return false;
        }
        if (/[^a-zA-Z0-9.]/.test(username.trim())) {
            toast.error("Username can only contain English letters, numbers, and .");
            return false;
        }
        if (password.trim().length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return false;
        }
        return true;
    };

    const handleLogIn = (e) => {
        e.preventDefault();
        if (!handleValidation()) return;
        AxiosInstance.post("api/login", {
            user: username,
            password: password,
        }).then((res) => {
            const result = res.data;
            if (result.status === StatusType.Success) {
                userAuth.setUser(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
                dispatchEvent(new Event("storage"));
                navigate("/upcomming");
            } else if (result.status === StatusType.Failed) {
                toast.error(result.description);
            }
        });
    };

    return (
        <div className="outter__form--container">
            <div style={{ backgroundImage: `url(${Image.login_bgr})` }} className="login__form">
                <div className="form__container">
                    <form action="">
                        <h1 className="title">Sign-in</h1>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className="user_email" type="text" placeholder="username" />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="user_password"
                            type="password"
                            placeholder="Password"
                        />

                        <div className="submit__btn--container">
                            <button type="submit" onClick={handleLogIn}>
                                Sign in
                            </button>
                        </div>
                        <div className="form__extra">
                            <Link>Forgot your password?</Link>
                        </div>
                        <div className="form__extra">
                            <span>Don't have an account?</span>
                            <Link to={"/register"}>Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
