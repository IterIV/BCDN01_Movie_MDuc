import React, { useEffect, useState } from "react";
import "./Schedule.css";
import Moment from "moment";
import Slider from "react-slick";
import { listGroupCinema, listShowTimeByCinema } from "../../../data";
import _ from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";
import FilmShowTime from "../../../components/Home/FilmShowTime/FilmShowTime";

const Schedule = () => {
  // TODO State
  const [maRap, setMaRap] = useState("bhd-star-cineplex-bitexco");
  const now = "2019-01-01";
  // TODO lifeCycle
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // TODO: render components

  const renderGroupCinema = () => {
    return listGroupCinema.map((cinemaGroup) => {
      return (
        <div key={cinemaGroup.maHeThongRap}>
          <div
            className={`flex justify-center w-full cursor-pointer duration-500 hover:opacity-100 ${
              cinemaGroup.maHeThongRap === listShowTimeByCinema[0].maHeThongRap
                ? "opacity-100"
                : "opacity-50"
            }`}
          >
            <img
              className="w-12 "
              src={cinemaGroup.logo}
              alt={cinemaGroup.tenHeThongRap}
            />
          </div>
        </div>
      );
    });
  };

  const renderCinema = () => {
    return listShowTimeByCinema[0].lstCumRap.map((cinema) => {
      return (
        <div
          key={cinema.maCumRap}
          className={`flex items-center rounded-md cursor-pointer duration-500 hover:bg-white/20 ${
            cinema.maCumRap === maRap
              ? "bg-white/30 font-semibold"
              : "bg-gray-800/40 opacity-50"
          }`}
          onClick={() => {
            setMaRap(cinema.maCumRap);
          }}
        >
          <img
            src={cinema.hinhAnh}
            alt={cinema.tenCumRap}
            className="pr-4 w-20 rounded-t-md rounded-b-md"
          />
          <p>{cinema.tenCumRap}</p>
        </div>
      );
    });
  };

  const renderFilmWithShowTime = (maCumRap) => {
    const cumRap = _.find(
      listShowTimeByCinema[0].lstCumRap,
      (obj) => obj.maCumRap === maCumRap
    );
    if (cumRap) {
      return cumRap.danhSachPhim.map((phim) => {
        const haveLichChieu = _.find(phim.lstLichChieuTheoPhim, (lichChieu) => {
          const nowMoment = Moment(now).format("DD/MM/yyyy");
          const showTime = Moment(lichChieu.ngayChieuGioChieu).format(
            "DD/MM/yyyy"
          );
          return Moment(nowMoment).isSame(showTime);
        });
        if (typeof haveLichChieu === "undefined") {
          return null;
        }
        return (
          <div key={phim.maPhim}>
            <FilmShowTime phim={phim} cumRap={cumRap} />
          </div>
        );
      });
    }
    return null;
  };

  // TODO Slick Carousel
  const NextArrow = ({ onClick }) => {
    return (
      <div className="absolute left-0 top-0 text-white" onClick={onClick}>
        <i className="las la-arrow-right"></i>
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="" onClick={onClick}>
        <i className="las la-arrow-left"></i>
      </div>
    );
  };
  const settings = {
    dots: false,
    arrows: true,
    fade: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <main>
      <div
        className="h-screen w-full bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://inkholon.com.vn/wp-content/uploads/2017/05/IN-BACKLIST-FILM-LA-GI-2.jpg)",
        }}
      >
        <div className="absolute left-0 top-0 h-screen w-full bg-black/90" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-0 bg-gradient-to-b from-transparent to-gray-900 h-20" />

      <div className="relative container" style={{ marginTop: "-30%" }}>
        <h1 className="uppercase text-xl">Lịch chiếu</h1>
        <div className="w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent my-5" />
        <div className="py-2 border-solid border-b-2 border-gray-400/50">
          <Slider {...settings}>{renderGroupCinema()}</Slider>
        </div>
        <div className="grid grid-cols-5 gap-5 border-solid border-b-2 border-gray-400/50 py-4">
          {renderCinema()}
        </div>
        {renderFilmWithShowTime("bhd-star-cineplex-bitexco")}
      </div>
    </main>
  );
};

export default Schedule;
