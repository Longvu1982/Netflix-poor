import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../Images/Image";
import "./index.scss";
import { useState } from "react";
import AxiosInstance from "../../axios/axios";
import { toast } from "react-toastify";
import { StatusType } from "../../enum";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [facebookLink, setFacebookLink] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    // handle navigate
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleValidation = () => {
        if (!email || !username || !facebookLink || !phone || !password || !retypePassword) {
            toast.error("Please fill in all fields.");
            return false;
        }

        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return false;
        }

        if (password !== retypePassword) {
            toast.error("Passwords do not match.");
            return false;
        }

        // Additional validation checks can be added based on your requirements

        return true;
    };

    // login and register
    const handleRegister = (e) => {
        e.preventDefault();
        if (!handleValidation()) return;
        AxiosInstance.post("api/signup", {
            userName: username,
            email: email,
            password: password,
            phoneNumber: phone,
            facebookLink: facebookLink,
        }).then((res) => {
            const result = res.data;
            if (result.status === StatusType.Success) {
                toast.info("Sign up successful!");
                navigate("/login");
            } else if (result.status === StatusType.Failed) {
                toast.error(result.description);
            }
        });
    };

    return (
        <div style={{ backgroundImage: `url(${Image.login_bgr})` }} className="register__form">
            <div className="form__container">
                <form action="">
                    <h1 className="title">Register</h1>
                    <input value={email} className="user_email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input value={username} className="user_password" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input
                        value={facebookLink}
                        className="user_password"
                        type="text"
                        placeholder="Facebook link"
                        onChange={(e) => setFacebookLink(e.target.value)}
                    />
                    <input value={phone} className="user_password" type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                    <input value={password} className="user_password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input
                        value={retypePassword}
                        className="user_password"
                        type="password"
                        placeholder="Retype Password"
                        onChange={(e) => setRetypePassword(e.target.value)}
                    />

                    <div className="submit__btn--container">
                        <button type="submit" onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                    <div className="form__extra">
                        <span>Already had an account?</span>
                        <Link to="/login">Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
