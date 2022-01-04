import React, { useEffect, useState } from "react";
import ButtonPlayVideo from "../../../components/Global/ButtonPlayVideo";
import ModalVideo from "react-modal-video";
import Slider from "react-slick";
import {
  film,
  listCinemaByGroup,
  listGroupCinema,
  showTimeByFilm,
} from "../../../data";
import { DateTime } from "../../../ulti/help";
import _ from "lodash";
import { Link } from "react-router-dom";

const FilmDetail = (props) => {
  // {props.match.params.maPhim}
  // TODO State
  const [modalVieo, setModalVideo] = useState(() => {
    const params = new URL(film.trailer).searchParams;
    return { videoId: params.get("v"), isOpen: false };
  });
  const [dateSelected, setDateSelected] = useState("2021-10-02");
  const [currGroupCinema, setCurrGroupCinema] = useState({
    maHeThongRap: "CGV",
    hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/cgv.png",
  });

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
            setCurrGroupCinema({
              maHeThongRap: cinemaGroup.maHeThongRap,
              hinhAnh: cinemaGroup.logo,
            });
          }}
        >
          <div
            className={`flex justify-center w-full cursor-pointer duration-500 relative hover:opacity-100 ${
              cinemaGroup.maHeThongRap === currGroupCinema.maHeThongRap
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
                cinemaGroup.maHeThongRap === currGroupCinema.maHeThongRap
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
    let currDate = new DateTime("2021-10-02");
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

  const renderShowTime = (maCumRap) => {
    const heThongRapChieu = _.find(
      showTimeByFilm.heThongRapChieu,
      (heThongRap) => heThongRap.maHeThongRap === currGroupCinema.maHeThongRap
    );
    if (heThongRapChieu) {
      const cumRap = _.find(
        heThongRapChieu.cumRapChieu,
        (cumRap) => cumRap.maCumRap === maCumRap
      );
      if (cumRap) {
        return _.sortBy(
          cumRap.lichChieuPhim,
          ["ngayChieuGioChieu"],
          ["desc"]
        ).map((lichChieu) => {
          const showTime = new DateTime(lichChieu.ngayChieuGioChieu);
          const isSelected = showTime.isSame(dateSelected, "DD/MM/yyyy");
          if (!isSelected) {
            return <div className="w-14 h-8 mx-3 my-3" key={0}></div>;
          }
          return (
            <button
              key={lichChieu.maLichChieu}
              className="bg-white text-gray-900 mx-3 my-3 w-16 h-8 rounded font-semibold duration-500 hover:bg-red-500 hover:text-white"
            >
              <Link to={`/ticket/${lichChieu.maLichChieu}`}>
                {showTime.format("HH:mm")}
              </Link>
            </button>
          );
        });
      } else {
        return <div className="w-14 h-8 mx-3 my-3" key={0}></div>;
      }
    }
    return null;
  };

  const renderCinema = () => {
    return listCinemaByGroup.map((groupCinema) => {
      return (
        <div
          className="flex items-center duration-300 hover:bg-white/5"
          key={groupCinema.maCumRap}
        >
          <div className="flex items-center rounded-md w-60">
            <img
              src={currGroupCinema.hinhAnh}
              alt=""
              className="w-10 rounded-md mr-2 my-3"
            />
            <p>{groupCinema.tenCumRap}</p>
          </div>
          <div className="ml-12 w-full basis-0 flex-grow flex-shrink border-solid border-b-2 border-gray-400/10">
            <div className=" w-full flex items-center">
              {renderShowTime(groupCinema.maCumRap)}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="w-full h-screen relative">
        <img
          className="w-full h-screen object-cover object-top"
          src="https://songmoi.vn/Uploads/News/1566138144.jpg"
          alt=""
        />
        <div className="absolute left-0 top-0 w-full h-screen bg-gradient-to-b from-black/30 via-black/30 to-gray-900" />
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
      <div className="w-full h-10"></div>

      <div className="container">
        <div className="flex mt-10 mb-10 justify-between">
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
            <div className="py-4  border-gray-400/50">
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

export default FilmDetail;
