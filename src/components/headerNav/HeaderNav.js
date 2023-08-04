import React, { useEffect } from "react";
import Image from "../../Images/Image";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUser";
import "./HeaderNav.scss";

function HeaderNav() {
    const navigate = useNavigate();
    const user = useUserStore();

    const [showNav, setShowNav] = useState(false);

    // profile show
    const [profile, setProfile] = useState(false);

    const NavShow = () => {
        window.scrollY > 100 ? setShowNav(false) : setShowNav(true);
    };

    useEffect(() => {
        window.addEventListener("scroll", NavShow);
        return () => {
            window.removeEventListener("scroll", NavShow);
        };
    }, []);

    return (
        <div className={`nav ${!showNav && "nav__black"}`}>
            <div className="nav__contents">
                <img onClick={() => navigate("/")} className="nav__logo" src={Image.fake_logo} alt="main logo" />
                <div className="nav__avat">
                    <img onClick={() => setProfile(!profile)} src={Image.avatLogo} alt="" />
                    {profile && (
                        <div className="profile-menu">
                            <h1>{user.email}</h1>
                            <div className="profile_btns">
                                <button>
                                    <span
                                        onClick={() => {
                                            navigate("/myfavlist");
                                        }}
                                    >
                                        My list
                                    </span>
                                </button>
                                <button
                                    className="profile-logout"
                                    onClick={() => {
                                        user.logout();
                                        localStorage.removeItem("user");
                                        dispatchEvent(new Event("storage"));
                                    }}
                                >
                                    <span>Log out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HeaderNav;
