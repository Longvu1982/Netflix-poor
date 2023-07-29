import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../Images/Image";
// import { auth } from "../../firebase";
import "./index.scss";
import { useState } from "react";
// import { login } from "../../features/userSlice";
// import { useDispatch } from "react-redux";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // handle navigate
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // authentication

  // login and register
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div
      style={{ backgroundImage: `url(${Image.login_bgr})` }}
      className="login__form"
    >
      <div className="form__container">
        <form action="">
          <h1 className="title">Register</h1>
          <input
            className="user_email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="user_password"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="user_password"
            type="text"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="user_password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
