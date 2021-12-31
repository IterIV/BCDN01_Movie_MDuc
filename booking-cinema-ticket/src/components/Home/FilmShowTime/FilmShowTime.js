import _ from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nowString } from "../../../ulti/settings";

const FilmShowTime = ({ phim, cumRap }) => {
  //TODO state
  const [dateSelected, setDateSelected] = useState(nowString);
  // TODO: render components
  const renderDate = (numDate) => {
    let arrDate = [];
    let days = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ 7",
    ];
    for (let index = 0; index < numDate; index++) {
      arrDate.push(moment(nowString).add(index, "days"));
    }
    return arrDate.map((momentItem, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            setDateSelected(momentItem.format("DD/MM/yyyy"));
          }}
          className={`mt-3 flex px-3 py-1 rounded-md duration-500 cursor-pointer hover:bg-white/20 ${
            moment(moment(momentItem).format("DD/MM/yyyy")).isSame(dateSelected)
              ? "bg-white/20"
              : ""
          } `}
        >
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm">{days[momentItem.get("day")]}</p>
            <p className="text-5xl font-bold">{momentItem.format("DD")}</p>
            <p className="text-xs mt-2 pb-1">Tháng {momentItem.format("MM")}</p>
          </div>
        </div>
      );
    });
  };

  const renderShowTime = (list) => {
    const newList = list.map((lichChieu) => {
      lichChieu.ngayChieuGioChieu = new Date(lichChieu.ngayChieuGioChieu);
      return { ...lichChieu };
    });
    return _.sortBy(newList, ["ngayChieuGioChieu"], ["desc"]).map(
      (lichChieu) => {
        const nowMoment = moment(dateSelected).format("DD/MM/yyyy");

        const showTime = moment(lichChieu.ngayChieuGioChieu).format(
          "DD/MM/yyyy"
        );
        const isSelected = moment(nowMoment).isSame(showTime);
        if (!isSelected) {
          return null;
        }
        return (
          <button
            key={lichChieu.maLichChieu}
            className="bg-white text-gray-900 mx-3 my-3 w-14 h-8 rounded font-semibold duration-500 hover:bg-red-500 hover:text-white"
          >
            <Link to={`/ticket/${lichChieu.maLichChieu}`}>
              {moment(lichChieu.ngayChieuGioChieu).format("HH:mm")}
            </Link>
          </button>
        );
      }
    );
  };

  return (
    <div className="flex flex-col my-10">
      <div className="flex items-center w-full">
        <div className="w-56 px-3 py-3">
          <img
            className="w-full h-full bg-cover bg-center"
            src={phim.hinhAnh}
            alt="Film Poster"
          />
        </div>
        <div className="w-full ml-4">
          <div className="flex justify-between">
            <p className="uppercase font-medium text-xl">{phim.tenPhim}</p>
            <p>IMDB 7.6</p>
          </div>
          <p className="text-gray-500 text-sm">
            <span className="pr-3">120 phút</span>|
            <span className="uppercase pl-3">Hành động</span>
          </p>
          <div className="flex justify-between py-5 border-solid border-b-2 border-gray-400/50">
            {renderDate(8)}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full bg-gray-800/70 px-3 py-0.5 mt-3">
        <div className="flex">
          <p className="w-56 py-2 flex items-center pl-2">
            <img
              className="w-12 mr-4"
              src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/logo.png"
              alt="BHD Start Logo"
            />
            <span className="font-semibold">{cumRap.tenCumRap}</span>
          </p>
          <div className="flex items-center flex-wrap flex-grow flex-shrink basis-0">
            {renderShowTime(phim.lstLichChieuTheoPhim)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmShowTime;
