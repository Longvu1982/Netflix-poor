import React from "react";
import useUserStore from "../../store/useUser";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom"

const HomeCard = ({
  item: { id, cover, name, rating, time, desc, starring, genres, tags, video },
}) => {
  const currentUser = useUserStore();
  const navigate = useNavigate();
  const handleClickPlay = () => {
    if (currentUser.token) navigate("/upcomming");
    else navigate("/login");
  };
  return (
    <>
      <div className="box">
        <div className="coverImage">
          <img src={cover} alt="background" />
        </div>
        <div className="content flex">
          <div className="details row">
            <h1>{name}</h1>
            <div className="rating flex">
              <div className="rate">
                <i className="fas fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half"></i>
              </div>
              <label>{rating}(IMDB)</label>
              <label>{time}</label>
            </div>
            <p>{desc}</p>
            <div
              className="cast"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="submit__btn--container">
                <button
                  onClick={handleClickPlay}
                >
                  <i className="fas fa-play"></i> PLAY NOW
                </button>
              </div>
              <h4>
                <span>Tags </span>
                {tags}
              </h4>
            </div>
          </div>
          <div className="palyButton row">
            <a
              href={`https://www.youtube.com/watch?v=mh4R-WXRhQo`}
              target="_blank"
              rel="noreferrer"
            >
              <button>
                <div className="img">
                  <img src="./images/play-button.png" alt="" />
                  <img src="./images/play.png" className="change" alt="" />
                </div>
                WATCH TRAILER
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
