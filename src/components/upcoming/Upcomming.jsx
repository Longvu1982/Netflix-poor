import React from "react";
import { Link } from "react-router-dom";
import Ucard from "./Ucard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
const Upcomming = ({ items, title }) => {
  console.log(items);
  const settings = {
    dots: false,
    infinite: false,
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
  return (
    <>
      <section className="upcome">
        <div className="container">
          <div className="heading flexSB">
            <h1>{title}</h1>
            <Link to="/">View All</Link>
          </div>
          <div className="content">
            <Slider {...settings}>
              {items.map((item) => {
                return (
                  <>
                    <Ucard key={item.id} item={item} />
                  </>
                );
              })}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default Upcomming;
