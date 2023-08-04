import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ucard from "./Ucard";
import Slider from "react-slick";
import "./main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AxiosInstance from "../../axios/axios";
import ReactPlayer from "react-player";
import PageLoading from "../Loading/PageLoading";
import SquareSkeleton from "../skeleton";

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
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 4,
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

    useEffect(() => {
        setLoading(true);
        AxiosInstance.get("api/getAllEpisode")
            .then((res) => {
                setMovieList(res.data);
            })
            .finally(() => setTimeout(() => setLoading(false), 1000));
    }, []);
    useEffect(() => {
        setMovieLoading(true);
        AxiosInstance.get(`api/getEpisode?episode=${episode}&type=${1}`)
            .then((res) => {
                const result = res.data;
                setCurrentMovieSrc(result.url);
            })
            .finally(() => setMovieLoading(false));
    }, [episode]);

    return isLoading ? (
        <PageLoading />
    ) : (
        <div className="main-page">
            {/* <h1>BUSINESS PROPOSAL BEHIDE THE SCENE</h1> */}
            <div className="video-container">
                {!isMovieLoading ? (
                    <iframe
                        onLoad={() => setMovieLoading(false)}
                        style={{ border: 0 }}
                        title="ep1"
                        src={currentMovieSrc}
                        width="100%"
                        height="100%"
                        allowFullScreen
                        allow="autoplay"
                    ></iframe>
                ) : (
                    <SquareSkeleton />
                )}
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
                                <Ucard key={item.id} item={item} setEpisode={setEpisode} />
                            ))}
                        </div>
                    ) : (
                        <Slider {...settings}>
                            {movieList.map((item) => (
                                <Ucard key={item.id} item={item} setEpisode={setEpisode} />
                            ))}
                        </Slider>
                    )}
                </div>
            </section>
        </div>
    );
};

export default MainPage;
