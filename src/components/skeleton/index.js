import React from "react";
import "./index.scss";

const SquareSkeleton = () => {
    return (
        <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default SquareSkeleton;
