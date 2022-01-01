import React, { useEffect, useState } from "react";
import ButtonPlayVideo from "../../../components/Global/ButtonPlayVideo";
import ModalVideo from "react-modal-video";
import Slider from "react-slick";
import { film, listGroupCinema, showTimeByFilm } from "../../../data";
import { DateTime } from "../../../ulti/help";
import { nowString } from "../../../ulti/settings";
import _ from "lodash";

const FIlmDetail = (props) => {
  // {props.match.params.maPhim}
  // TODO State
  const [modalVieo, setModalVideo] = useState(() => {
    const params = new URL(film.trailer).searchParams;
    return { videoId: params.get("v"), isOpen: false };
  });
  const [dateSelected, setDateSelected] = useState(nowString);
  const [maHeThongRap, setMaHeThongRap] = useState("CGV");

  // TODO LifeCycle
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // TODO setting Slider
  const settings = {
    dots: false,
    arrows: true,
    fade: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  // TODO render component
  const renderGroupCinema = () => {
    return listGroupCinema.map((cinemaGroup) => {
      return (
        <div
          key={cinemaGroup.maHeThongRap}
          onClick={() => {
            setMaHeThongRap(cinemaGroup.maHeThongRap);
          }}
        >
          <div
            className={`flex justify-center w-full cursor-pointer duration-500 relative hover:opacity-100 ${
              cinemaGroup.maHeThongRap === maHeThongRap
                ? "opacity-100"
                : "opacity-50"
            }`}
          >
            <img
              className="w-16 pt-4"
              src={cinemaGroup.logo}
              alt={cinemaGroup.tenHeThongRap}
            />
            <div
              className={`w-2 h-2 bg-red-500 rounded-full absolute top-0 opacity-0 duration-500 ${
                cinemaGroup.maHeThongRap === maHeThongRap
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            ></div>
          </div>
        </div>
      );
    });
  };

  const renderDate = (numDate) => {
    let arrDate = [];
    let currDate = new DateTime(nowString);
    for (let index = 0; index < numDate; index++) {
      arrDate.push(currDate.newDate(index));
    }
    return arrDate.map((dateItem, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            setDateSelected(dateItem.date);
          }}
          className={`mt-3 flex px-3 py-1 rounded-md duration-500 cursor-pointer hover:bg-white/20 ${
            dateItem.isSame(dateSelected, "DD/MM/yyyy") ? "bg-white/20" : ""
          }`}
        >
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm">{dateItem.getDay("vn")}</p>
            <p className="text-5xl font-bold">{dateItem.getDate()}</p>
            <p className="text-xs mt-2 pb-1">Tháng {dateItem.getMonth()}</p>
          </div>
        </div>
      );
    });
  };

  const renderCinema = () => {
    const currHeThongRap = _.find(
      showTimeByFilm.heThongRapChieu,
      (o) => o.maHeThongRap === maHeThongRap
    );
    console.log(currHeThongRap);

    if (currHeThongRap) {
      return currHeThongRap.cumRapChieu.map((cumRap) => {
        return (
          <div className="flex items-center">
            <div
              key={cumRap.maCumRap}
              className="flex items-center rounded-md cursor-pointer duration-500 w-52"
            >
              <p>{cumRap.tenCumRap}</p>
            </div>
            <div className="pl-20">
              <p>Lịch chiếu</p>
            </div>
          </div>
        );
      });
    }
    return <></>;
  };

  return (
    <div>
      <div className="w-full h-screen relative">
        <img
          className="w-full h-screen object-cover object-top"
          src="https://khenphim.com/wp-content/uploads/2020/08/Black-Water-Abyss-3-banner.jpg"
          alt=""
        />
        <div className="absolute left-0 top-0 w-full h-screen bg-black/30" />
        <ButtonPlayVideo
          className="absolute left-1/2 top-1/2"
          handleOnclick={() => {
            setModalVideo({ ...modalVieo, isOpen: true });
          }}
        />
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={modalVieo.isOpen}
          videoId={modalVieo.videoId}
          onClose={() => setModalVideo({ ...modalVieo, isOpen: false })}
        />
      </div>
      <div className="container">
        <div className="flex mt-16 mb-12 justify-between">
          <div>
            <h2 className="text-xl uppercase font-medium">{film.tenPhim}</h2>
            <p className="text-gray-600">Hành động</p>
            <p className="text-gray-600">120 phút</p>
          </div>
          <p className="text-xl font-medium">IDMB 7.6</p>
        </div>
        <div className="flex">
          <img
            className="w-52 rounded-md"
            src={film.hinhAnh}
            alt={film.tenPhim}
          />
          <div className="w-full pl-20">
            <div className="py-4 border-solid border-b-2 border-gray-400/50">
              <Slider {...settings}>{renderGroupCinema()}</Slider>
            </div>
            <div className="flex justify-between py-5 border-solid border-b-2 border-gray-400/50">
              {renderDate(8)}
            </div>
          </div>
        </div>
        {renderCinema()}
      </div>
    </div>
  );
};

export default FIlmDetail;
