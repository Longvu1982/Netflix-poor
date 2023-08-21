import React, { useEffect, useRef, useState } from "react";
import Ucard from "./Ucard";
import Slider from "react-slick";
import "./main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AxiosInstance from "../../axios/axios";
import PageLoading from "../Loading/PageLoading";
import SpinnerLoading from "../skeleton";
import ReactHlsPlayer from "react-hls-player";

// Render a YouTube video player

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
    const [currentMovieInfo, setCurrentMovieInfo] = useState();
    const [currentMovieSrc, setCurrentMovieSrc] = useState();
    const [isLoading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMovieLoading, setMovieLoading] = useState(false);
    const [isViewAll, setViewAll] = useState(false);
    const [selectedRes, setSelectedRes] = useState("1080p");
    const scrollRef = useRef();
    const videoRef = useRef();

    const resBtns = [
        {
            id: "1080p",
            text: "1080p",
        },
        {
            id: "720p",
            text: "720p",
        },
    ];
    const settings = {
        dots: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: true,
        infinite: true,
        dragable: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1368,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
        ],
    };
    const handleSetEpisode = (ep) => {
        videoRef.current.currentTime = 0
        setCurrentTime(0)
        scrollRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
        setEpisode(ep);
    };

    const handleChangeSource = (btn) => {
        const movieSrcs = currentMovieInfo?.souceVideo;
        videoRef.current.src = movieSrcs.find((item) => item.id === btn.id)?.url;
        videoRef.current.currentTime = currentTime;
        videoRef.current.play();
        setCurrentMovieSrc(movieSrcs.find((item) => item.id === btn.id)?.url);
        setSelectedRes(btn.id);
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
                setCurrentMovieInfo(result);
                setCurrentMovieSrc(result.souceVideo?.find((item) => item.id === selectedRes)?.url);
            })
            .finally(() => setMovieLoading(false));
    }, [episode]);

    React.useEffect(() => {
        function fireOnVideoStart() {
            // Do some stuff when the video starts/resumes playing
        }
        videoRef?.current?.addEventListener("play", fireOnVideoStart);
        return videoRef?.current?.removeEventListener("play", fireOnVideoStart);
    }, [videoRef?.current]);

    return isLoading ? (
        <PageLoading />
    ) : (
        <div className="main-page">
            {/* <h1>BUSINESS PROPOSAL BEHIDE THE SCENE</h1> */}
            <div ref={scrollRef} />
            <div className="video-container">
                {!isMovieLoading ? (
                    <ReactHlsPlayer
                        onTimeUpdate={(e) => {
                            setCurrentTime(e.target.currentTime);
                        }}
                        playerRef={videoRef}
                        src={currentMovieSrc}
                        autoPlay={false}
                        controls={true}
                        width="100%"
                        height="100%"
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                ) : (
                    <SpinnerLoading />
                )}
            </div>
            <div className="video-name">
                <span style={{ color: "red", fontWeight: 500 }}>EPISODE {currentMovieInfo?.episode}</span>
                <span> {currentMovieInfo?.name}</span>
            </div>
            <div className="video-res-btns">
                {resBtns.map((btn) => (
                    <div className={selectedRes === btn.id ? "selected" : ""} onClick={() => handleChangeSource(btn)} key={btn.id}>
                        {btn.text}
                    </div>
                ))}
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
