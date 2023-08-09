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
    const [facebookName, setFacebookName] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    // handle navigate
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleValidation = () => {
        if (!email.trim() || !username.trim() || !facebookLink.trim() || !phone.trim() || !password.trim() || !retypePassword.trim() || !facebookName.trim()) {
            toast.error("Please fill in all fields.");
            return false;
        }
        if (!emailRegex.test(email.trim())) {
            toast.error("Please enter a valid email address");
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

        if (!/^(https?:\/\/)?(m\.|www\.)?facebook\.com\/?/.test(facebookLink.trim())) {
            toast.error("Invalid Facebook link");
            return false;
        }
        if (!/^\d{7,12}$/.test(phone)) {
            toast.error("Invalid phone number");
            return false;
        }
        if (password.trim().length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return false;
        }
        if (password.trim() !== retypePassword.trim()) {
            toast.error("Passwords do not match");
            return false;
        }
        return true;
    };

    // login and register
    const handleRegister = (e) => {
        e.preventDefault();
        if (isLoading) return;
        if (!handleValidation()) return;
        setLoading(true);
        AxiosInstance.post("api/signup", {
            userName: username,
            email: email,
            password: password,
            phoneNumber: phone,
            facebookLink: facebookLink,
            facebookName: facebookName,
        })
            .then((res) => {
                const result = res.data;
                if (result.status === StatusType.Success) {
                    toast.info("Sign up successful!");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                } else if (result.status === StatusType.Failed) {
                    toast.error(result.description);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="outter__form--container">
            <div style={{ backgroundImage: `url(${Image.login_bgr})` }} className="register__form">
                <div className="form__container">
                    <form action="">
                        <h1 className="title">Register</h1>
                        <input value={email} className="user_email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input value={username} className="user_password" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input
                            value={facebookName}
                            className="user_password"
                            type="text"
                            placeholder="Display name"
                            onChange={(e) => setFacebookName(e.target.value)}
                        />
                        <input
                            value={facebookLink}
                            className="user_password"
                            type="text"
                            placeholder="Facebook link"
                            onChange={(e) => setFacebookLink(e.target.value)}
                        />
                        <input value={phone} className="user_password" type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                        <input
                            value={password}
                            className="user_password"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            value={retypePassword}
                            className="user_password"
                            type="password"
                            placeholder="Retype Password"
                            onChange={(e) => setRetypePassword(e.target.value)}
                        />

                        <div onClick={handleRegister} className="submit__btn--container">
                            <button type="submit">Register</button>
                        </div>
                        <div className="form__extra">
                            <span>Already had an account?</span>
                            <Link to="/login">Log in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
