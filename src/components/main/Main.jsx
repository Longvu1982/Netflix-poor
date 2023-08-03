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
                {/* <video
                    width="100%"
                    height="100%"
                    controls
                    oncontextmenu={false}
                    src="https://rr2---sn-npoe7nes.c.drive.google.com/videoplayback?expire=1691095671&ei=N9rLZMGQFo3Bir4PvMaqmAY&ip=116.96.47.21&cp=QVROU0FfVFZVQlhPOm5iR1VocXpEbkNrVzhPcmNxUnU4S1BGN1RoYnREcUcxaF9LcXZqY0xZRGI&id=4edc143cc8fdee0f&itag=18&source=webdrive&requiressl=yes&mh=8G&mm=32&mn=sn-npoe7nes&ms=su&mv=m&mvi=2&pl=23&ttl=transient&susc=dr&driveid=1Zn5RVdf2qViuD7GXZCXG53HqVtHAzh-M&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=755.484&lmt=1691042228971350&mt=1691080844&subapp=DRIVE_WEB_FILE_VIEWER&txp=0001224&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRQIgfSGxx0LN--0rZXai6vkbJlHq6FHgH9s8siusTXJd2FoCIQCityjPab_Ay7d9SGLb5p3Pz9_A0VhxmefB3HsDTHxD0g==&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgBk1TbomvCu-XEjtMALu13McVK9CSlIL7BS-ZrbEWND8CICMv0VEHVZV8M9cSdSxD0ZuXnfTStC65NqJqV0wqB3d-&cpn=9UYNcjoB895Ug_tZ&c=WEB_EMBEDDED_PLAYER&cver=1.20230730."
                ></video> */}
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
