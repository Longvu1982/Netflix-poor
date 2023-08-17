import React from "react";
import "./Ucard.scss";

const Ucard = ({ item: { description, episode, image, name }, setEpisode }) => {
    return (
        <>
            <div className="MovieBox" onClick={() => setEpisode(episode)}>
                <div className="img">
                    <img src={image} alt="" />
                </div>
                <div className="text">
                    <h3>
                        <span>EP.{episode}.</span>{" "}
                        <span>{name}</span>
                    </h3>
                    {/*<Link to={`/singlepage/${id}`}>*/}
                    <button className="primary-btn">
                        <i className="fa fa-play"></i> PLAY NOW
                    </button>
                    {/*</Link>*/}
                </div>
            </div>
        </>
    );
};

export default Ucard;
