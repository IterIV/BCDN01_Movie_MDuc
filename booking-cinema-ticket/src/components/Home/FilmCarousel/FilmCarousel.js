import React, { useState } from "react";
import Slider from "react-slick";
import ModalVideo from "react-modal-video";

const FilmCarousel = ({ header, listPhim, history }) => {
  // TODO State
  const [modalVieo, setModalVideo] = useState({ videoId: "", isOpen: false });

  // TODO handle Event
  const handlePlay = (link) => {
    const params = new URL(link).searchParams;
    setModalVideo({ videoId: `${params.get("v")}`, isOpen: true });
  };

  // TODO: Render Components
  const renderFilmOpen = () => {
    return listPhim.map((film) => {
      return (
        <div className="w-1/5 py-4 px-4 cursor-pointer" key={film.maPhim}>
          <div
            className="w-full object-cover object-center rounded-sm relative"
            style={{ height: "300px" }}
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-0 bg-black/50 duration-500 active:opacity-50 hover:opacity-100">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <button
                  onClick={() => {
                    handlePlay(film.trailer);
                  }}
                  className=" w-10 h-10 rounded-full border-solid border-2 duration-500 hover:bg-white/50 active:bg-white active:text-red-500"
                >
                  <i className="fa fa-play text-sm"></i>
                </button>
                {history && (
                  <button
                    className="mt-4 px-2 py-1 duration-500 border-solid border-white border-2  hover:bg-white/30 active:bg-white active:text-red-500"
                    onClick={() => {
                      history.push(`/detail/${film.maPhim}`);
                    }}
                  >
                    Mua vé
                  </button>
                )}
              </div>
            </div>

            <img
              className="w-full h-full object-cover object-center rounded-sm "
              src={film.hinhAnh}
              alt={film.tenPhim}
            />
          </div>
          <p className="pt-4 truncate capitalize">{film.tenPhim}</p>
          <p className="text-sm text-gray-500 pt-1">
            <span className="pr-2">120 phút</span> |
            <span className="pl-2">HÀNH ĐỘNG</span>
          </p>
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
    <div className="container">
      <h1 className="uppercase text-xl mt-16">{header}</h1>
      <div className="w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent my-5" />
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={modalVieo.isOpen}
        videoId={modalVieo.videoId}
        onClose={() => setModalVideo({ ...modalVieo, isOpen: false })}
      />
      <Slider {...settings}>{renderFilmOpen()}</Slider>
    </div>
  );
};

export default FilmCarousel;
