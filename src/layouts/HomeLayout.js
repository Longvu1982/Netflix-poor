import React from "react";
import { Outlet } from "react-router-dom";
import HeaderNav from "../components/headerNav/HeaderNav";

const HomeLayout = () => {
    return (
        <>
            <HeaderNav />
            <Outlet />
        </>
    );
};

export default HomeLayout;
