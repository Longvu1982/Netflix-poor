import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Ucard from "./Ucard";
import Slider from "react-slick";
import "./main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AxiosInstance from "../../axios/axios";
import ReactPlayer from "react-player";

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="next">
                <i className="fa fa-chevron-right"></i>
            </button>
        </div>
    );
};
const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="prev">
                <i className="fa fa-chevron-left"></i>
            </button>
        </div>
    );
};
const MainPage = ({ items, title }) => {
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 4,
        infinite: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 1368,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };

    useEffect(() => {
        // AxiosInstance.get("api/getAllEpisode").then(console.log);
        // AxiosInstance.get(`api/getEpisode?episode=${1}&type=${1}`).then(console.log);
    }, []);
    return (
        <div className="main-page">
            <h1>BUSINESS PROPOSAL BEHIDE THE SCENE</h1>
            <div className="video-container">
                <iframe
                    frameBorder={0}
                    title="ep1"
                    src="https://drive.google.com/file/d/1Zn5RVdf2qViuD7GXZCXG53HqVtHAzh-M/preview"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    allow="autoplay"
                ></iframe>
            </div>
            <section className="upcome">
                <div className="heading flexSB">
                    <h1>{title}</h1>
                    <Link to="/">View All</Link>
                </div>
                <div className="content">
                    <Slider {...settings}>
                        {items.map((item) => (
                            <Ucard key={item.id} item={item} />
                        ))}
                    </Slider>
                </div>
            </section>
        </div>
    );
};

export default MainPage;
