import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../Images/Image";
import "./index.scss";

function LoginPage({ type, extra, navigateTo }) {
    // handle navigate
    const navigate = useNavigate();

    // login and register
    const emailRef = useRef();
    const passRef = useRef();

	const handleLogIn = (e) => {
		e.preventDefault();
		navigate("/")
	};

    return (
        <div style={{ backgroundImage: `url(${Image.login_bgr})` }} className="login__form">
            <div className="form__container">
                <form action="">
                    <h1 className="title">Sign-in</h1>
                    <input ref={emailRef} className="user_email" type="email" placeholder="Email" />
                    <input ref={passRef} className="user_password" type="password" placeholder="Password" />

                    <div className="submit__btn--container">
                        <button type="submit" onClick={handleLogIn}>
                            Sign in
                        </button>
                    </div>
                    <div className="form__extra">
                        <span>
							Don't have an account?
						</span>
                        <Link to={"/register"}>
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
