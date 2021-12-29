import React from "react";
import Slider from "react-slick";
import "./FilmCarousel.css";

const FilmCarousel = ({ header, listPhim }) => {
  // TODO: Render Components
  const renderFilmOpen = () => {
    return listPhim.map((film) => {
      return (
        <div className="film__item" key={film.maPhim}>
          <img src={film.hinhAnh} alt={film.tenPhim} />
          <p className="pt-4 truncate capitalize">{film.tenPhim}</p>
          <p className="text-sm text-gray-500 pt-1">120 phút | HÀNH ĐỘNG</p>
        </div>
      );
    });
  };

  const settings = {
    className: "center",
    infinite: false,
    slidesToShow: 5,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
  };
  return (
    <div className="container mx-auto mt-10">
      <h1 className="uppercase">{header}</h1>
      <div className="w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent my-4" />
      <Slider {...settings}>{renderFilmOpen()}</Slider>
    </div>
  );
};

export default FilmCarousel;
