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
                <h1>Business Proposal</h1>
                <div className="nav__avat">
                    <img onClick={() => setProfile(!profile)} src={Image.avatLogo} alt="" />
                    {profile && (
                        <div className="profile-menu">
                            <div>
                                <h1>{user.facebookName}</h1>
                                <h1>{user.userName}</h1>
                            </div>
                            <div className="profile_btns">
                                <button>
                                    <span
                                        onClick={() => {
                                            navigate("/");
                                        }}
                                    >
                                        Home
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
