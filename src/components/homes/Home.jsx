import React from "react";
import HomeCard from "./HomeCard";
import "./home.scss";

const homeData = {
    id: 1,
    name: "Business Proposal",
    rating: 8.1,
    time: "",
    desc: "Business Proposal is a South Korean romantic comedy television series based on the webtoon of the same title written by HaeHwa and illustrated by Narak. Directed by Park Seon-ho and written by Han Seol-hee and Hong Bo-hee, it stars Ahn Hyo-seop, Kim Se-jeong, Kim Min-kyu, and Seol In-ah. It tells the story of Shin Ha-ri, an employee who accepts to go on a blind date in place of her friend, but finds out that her date is actually her boss.",
    starring: "",
    genres: "Action",
    tags: "Romantic, Comedy",
    cover: "../images/ahuhu.jpg",
    video: "../video/video1.mp4",
    date: "20-Jan-1997",
};

const Home = () => {
    return (
        <>
            <section className="home">
                <div className="homeContainer">
                    <HomeCard key={homeData.id} item={homeData} />
                </div>
            </section>
            <div className="mragin"></div>
        </>
    );
};

export default Home;
