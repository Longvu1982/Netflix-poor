import React, { useEffect, useRef, useState } from "react";
import Ucard from "./Ucard";
import Slider from "react-slick";
import "./main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AxiosInstance from "../../axios/axios";
import PageLoading from "../Loading/PageLoading";
import SquareSkeleton from "../skeleton";
import { Player } from "react-tuby";
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
    const [movieList, setMovieList] = useState([]);
    const [episode, setEpisode] = useState(1);
    const [currentMovieSrc, setCurrentMovieSrc] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const [isMovieLoading, setMovieLoading] = useState(false);
    const [isViewAll, setViewAll] = useState(false);
    const scrollRef = useRef();
    const settings = {
        dots: false,
        speed: 1000,
        slidesToShow: 4,
        autoplay: true,
        infinite: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
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
    const handleSetEpisode = (ep) => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        setEpisode(ep)
    };
    useEffect(() => {
        setLoading(true);
        AxiosInstance.get("api/getAllEpisode")
            .then((res) => {
                setMovieList(res.data);
            })
            .finally(() => setTimeout(() => setLoading(false), 1500));
    }, []);
    useEffect(() => {
        setMovieLoading(true);
        AxiosInstance.get(`api/getEpisode?episode=${episode}&type=${1}`)
            .then((res) => {
                const result = res.data;
                setCurrentMovieSrc(result);
            })
            .finally(() => setMovieLoading(false));
    }, [episode]);

    return isLoading ? (
        <PageLoading />
    ) : (
        <div className="main-page">
            {/* <h1>BUSINESS PROPOSAL BEHIDE THE SCENE</h1> */}
            <div ref={scrollRef} />
            <div className="video-container">
                {!isMovieLoading ? (
                    <video
                        controls
                        onContextMenu={(e) => e.preventDefault()}
                        controlsList="nodownload"
                        width="100%"
                        height="100%"
                        src={currentMovieSrc.souceVideo?.find((item) => item.id === "1080p")?.url}
                    ></video>
                ) : (
                    <SquareSkeleton />
                )}
            </div>
            <div className="video-name">
                <span style={{ color: "red", fontWeight: 500 }}>EPISODE {currentMovieSrc.episode}</span>
                <span> {currentMovieSrc.name}</span>
            </div>
            <section className="upcome">
                <div className="heading flexSB">
                    <h1>{title}</h1>
                    <span
                        onClick={() => {
                            setViewAll(!isViewAll);
                        }}
                    >
                        {`View${isViewAll ? " slide" : " all"}`}
                    </span>
                </div>
                <div className="content">
                    {isViewAll ? (
                        <div className="all-movie-container">
                            {movieList.map((item) => (
                                <Ucard key={item.id} item={item} setEpisode={handleSetEpisode} />
                            ))}
                        </div>
                    ) : (
                        <Slider {...settings}>
                            {movieList.map((item) => (
                                <Ucard key={item.id} item={item} setEpisode={handleSetEpisode} />
                            ))}
                        </Slider>
                    )}
                </div>
            </section>
            <footer>
                <span>@Copyright</span> <span>Business Proposal, 2023</span>
            </footer>
        </div>
    );
};

export default MainPage;
