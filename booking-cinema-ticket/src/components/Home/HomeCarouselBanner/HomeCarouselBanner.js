import React, { useState } from "react";
import Slider from "react-slick";
import { listBanner } from "../../../data";
import "./HomeCarouselBanner.css";
import ModalVideo from "react-modal-video";
import ButtonPlayVideo from "../../Global/ButtonPlayVideo";

const NextArrow = ({ onClick }) => {
  return (
    <div className="slick__next__arrow" onClick={onClick}>
      <i className="las la-arrow-right"></i>
    </div>
  );
};
const PrevArrow = ({ onClick }) => {
  return (
    <div className="slick__prev__arrow" onClick={onClick}>
      <i className="las la-arrow-left"></i>
    </div>
  );
};
const HomeCarouselBanner = () => {
  // TODO: component state
  const [modalVieo, setModalVideo] = useState({ videoId: "", isOpen: false });

  // TODO: render components
  const renderBanner = () => {
    return listBanner.map((banner) => {
      return (
        <div key={banner.maPhim} className="banner__item relative">
          <img
            src={banner.hinhAnh}
            alt={banner.maPhim}
            className="banner__img"
          />
          <ButtonPlayVideo
            className="absolute top-2/3 right-1/4 capitalize z-10"
            title="Xem trailer"
            handleOnclick={() => {
              setModalVideo({ videoId: "OB3g37GTALc&t", isOpen: true });
            }}
          />
          <div className="banner__left flex flex-col absolute bottom-11">
            <div className="flex">
              <button className="self-center px-7 py-2 font-semibold rounded bg-red-500 text-white duration-300 hover:bg-red-600 active:bg-red-500">
                Đặt vé
              </button>
              <p className="uppercase ml-4 text-sm">
                Ngày 30/12/2021 <br />
                Imax3d
              </p>
            </div>
            <div className="flex mt-32">
              <span className="flex items-center justify-center rounded-full w-7 h-7 bg-white/80 text-black mx-2">
                <i className="fab fa-facebook-f"></i>
              </span>
              <span className="flex items-center justify-center rounded-full w-7 h-7 bg-white/80 text-black mx-2">
                <i className="fab fa-twitter"></i>
              </span>
              <span className="flex items-center justify-center rounded-full w-7 h-7 bg-white/80 text-black mx-2">
                <i className="fab fa-instagram"></i>
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  // TODO: Settings carousel
  const settings = {
    customPaging: (i) => {
      return <p>0{i + 1}</p>;
    },
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="home__banner">
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={modalVieo.isOpen}
        videoId={modalVieo.videoId}
        onClose={() => setModalVideo({ ...modalVieo, isOpen: false })}
      />
      <Slider {...settings}>{renderBanner()}</Slider>
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-b from-transparent to-gray-900 h-20"></div>
    </div>
  );
};

export default HomeCarouselBanner;
