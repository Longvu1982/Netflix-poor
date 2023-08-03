import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../Images/Image";
import "./index.scss";
import AxiosInstance from "../../axios/axios";
import useUserStore from "../../store/useUser";

function LoginPage({ type, extra, navigateTo }) {
    // handle navigate
    const navigate = useNavigate();
    // login and register
    const usernameRef = useRef();
    const passRef = useRef();

    const userAuth = useUserStore();

    const handleLogIn = (e) => {
        e.preventDefault();
        AxiosInstance.post("api/login", {
            user: usernameRef.current.value,
            password: passRef.current.value,
        }).then((res) => {
            userAuth.setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/upcomming");
        });
    };

    return (
        <div style={{ backgroundImage: `url(${Image.login_bgr})` }} className="login__form">
            <div className="form__container">
                <form action="">
                    <h1 className="title">Sign-in</h1>
                    <input ref={usernameRef} className="user_email" type="text" placeholder="username" />
                    <input ref={passRef} className="user_password" type="password" placeholder="Password" />

                    <div className="submit__btn--container">
                        <button type="submit" onClick={handleLogIn}>
                            Sign in
                        </button>
                    </div>
                    <div className="form__extra">
                        <span>Don't have an account?</span>
                        <Link to={"/register"}>Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
