import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Seat from "../../../components/Global/Seat";
import { listTicketByFilm } from "../../../data";
import { listRowAlphabet } from "../../../ulti/settings";
import CSSTransitionGroup from "react-addons-css-transition-group";
import BarCode from "react-barcode";
import Ticket from "../../../components/Global/Ticket";

const BookTicket = (props) => {
  // {props.match.params.maLichChieu}

  // TODO component state
  const [danhSachVe, setDanhSachVe] = useState({
    maLichChieu: props.match.params.maLichChieu,
    danhSachVe: [],
  });
  const [showTicket, setShowTicket] = useState(false);

  // TODO handle Event
  const handleSelectSeat = useCallback((seat) => {
    setDanhSachVe((prev) => {
      let updateList = [...prev.danhSachVe];
      let index = updateList.findIndex((item) => item.maGhe === seat.maGhe);
      if (index !== -1) {
        updateList.splice(index, 1);
      } else {
        updateList.push(seat);
      }
      return { ...prev, danhSachVe: updateList };
    });
  }, []);
  const handleBookTicket = () => {
    if (danhSachVe.danhSachVe.length !== 0) {
      setShowTicket(true);
    }
  };
  // TODO LifeCycle
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // TODO render components
  const renderSeat = () => {
    return listTicketByFilm.danhSachGhe.map((seat) => {
      const numSeat = Number(seat.stt);
      return (
        <>
          {numSeat % 16 === 1 ? (
            <p className="text-gray-500 font-bold">
              {listRowAlphabet[Math.floor(numSeat / 16)]}
            </p>
          ) : undefined}
          <Seat key={seat.maGhe} seat={seat} handleClick={handleSelectSeat} />
          {numSeat % 16 === 0 ? (
            <p className="text-gray-500 font-bold">
              {listRowAlphabet[Math.floor(numSeat / 16)]}
            </p>
          ) : undefined}
        </>
      );
    });
  };

  const renderDanhSachVe = () => {
    if (danhSachVe.danhSachVe.length === 0) {
      return undefined;
    }
    return danhSachVe.danhSachVe.map((ticket) => {
      return (
        <div
          key={ticket.maGhe}
          className="w-full flex items-center px-2 py-2 my-4 border-2 border-gray-700 justify-between duration-500"
        >
          {/* Thong tin ghe */}
          <div className="flex items-center">
            <span className="text-gray-400 text-sm">Ghế thứ</span>
            <span className="text-2xl mx-2 font-semibold">
              {Number(ticket.stt) % 16}
            </span>{" "}
            <span className="text-gray-400 text-sm">hàng</span>
            <span className="text-2xl mx-2 font-semibold">
              {listRowAlphabet[Math.floor(Number(ticket.stt) / 16)]}
            </span>
          </div>
          {/* Thong tin tien ghe */}
          <div className="flex items-center">
            <p className="duration-500">
              {Math.floor(Number(ticket.giaVe)).toLocaleString()}{" "}
              <span className="text-gray-400 text-sm">VNĐ</span>
            </p>
          </div>
        </div>
      );
    });
  };
  const renderListTicketOwned = () => {
    return danhSachVe.danhSachVe.map((seat) => {
      return (
        <div key={seat.maGhe}>
          <Ticket seat={seat} filmInfo={listTicketByFilm.thongTinPhim} />
        </div>
      );
    });
  };

  // TODO setting component
  const settingTransition = {
    transitionName: "fade",
    transitionEnterTimeout: 500,
    transitionLeaveTimeout: 500,
  };

  return (
    <main>
      <div className="relative w-full max-h-96">
        <img
          className="w-full max-h-96 object-cover object-bottom"
          src="https://songmoi.vn/Uploads/News/1566138144.jpg"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
      </div>
      <div className="container relative z-20">
        <div className="flex">
          {/* LEFT */}
          <div className="-mt-32 mr-10 w-96">
            <img
              src={listTicketByFilm.thongTinPhim.hinhAnh}
              alt=""
              className="shadow-lg rounded-md"
            />
            <div
              className={`duration-500 ${
                showTicket ? "opacity-0 invisible" : "opacity-100"
              }`}
            >
              {/* Danh sach ghe chon */}
              <div className="max-h-80 overflow-x-auto">
                <CSSTransitionGroup {...settingTransition}>
                  {renderDanhSachVe()}
                </CSSTransitionGroup>
              </div>
              {/* Tong tien */}
              <div className="flex justify-between px-2 my-4 items-center">
                <span className="text-gray-500">Tổng cộng</span>
                <p className="text-xl">
                  {Math.floor(
                    _.sumBy(danhSachVe.danhSachVe, (seat) => seat.giaVe)
                  ).toLocaleString()}
                  <span className="ml-2">VNĐ</span>
                </p>
              </div>
              {/* Thanh Toan */}
              <div className="flex justify-around my-4">
                <button className="text-sm font-semibold uppercase border-2 border-red-600 h-10 w-32 text-red-500 duration-300 hover:bg-red-600 hover:text-white active:bg-red-500">
                  Hủy
                </button>
                <button
                  onClick={() => {
                    handleBookTicket();
                  }}
                  disabled={danhSachVe.danhSachVe.length === 0}
                  className="text-sm font-semibold uppercase h-10 w-32 border-2 border-red-600 bg-red-600 text-white duration-300 hover:bg-red-500 active:bg-red-600 disabled:opacity-70 disabled:bg-red-500"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="-mt-16 w-full">
            <h2 className="text-4xl uppercase font-extrabold">
              {listTicketByFilm.thongTinPhim.tenPhim}
            </h2>
            <div className="mt-12 w-full">
              <div className="w-full">
                <ul className="w-full flex items-center uppercase border-solid border-b-2 border-gray-600">
                  <li
                    className={`flex justify-center items-center px-10 py-2 relative ${
                      !showTicket ? "" : "opacity-50"
                    }`}
                  >
                    <span className="w-6 h-6 leading-6 text-center bg-gray-600 rounded-md mr-4 text-white/50">
                      1
                    </span>
                    Chọn ghế ngồi
                    {!showTicket && (
                      <div className="absolute -bottom-0.5 left-0 border-solid border-b-4 border-red-600 w-full" />
                    )}
                  </li>
                  <li
                    className={`flex justify-center items-center px-10 py-2 relative ${
                      showTicket ? "" : "opacity-50"
                    }`}
                  >
                    <span className="w-6 h-6 leading-6 text-center bg-gray-600 rounded-md mr-4">
                      2
                    </span>
                    Xuất vé
                    <div
                      className={`absolute -bottom-0.5 left-0 border-solid border-b-4 border-red-600 w-full duration-500 ${
                        showTicket ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </li>
                </ul>
                {!showTicket && (
                  <CSSTransitionGroup {...settingTransition}>
                    <div className="flex w-full">
                      {/* Thong tin ghe ngoi */}
                      <div className="w-full px-20 py-10 duration-500">
                        {/* Man hinh */}
                        <div>
                          {/* Screen */}
                          <div className="flex w-full h-20 relative ">
                            <div className="absolute top-0 left-0 w-2/3 h-20 bg-gray-300 skew-x-12 rounded-l-md" />
                            <div className="absolute top-0 right-0 w-2/3 h-20 bg-gray-300 -skew-x-12 rounded-r-md" />
                          </div>
                          {/* Screen Shadow */}
                          <div className="flex w-full h-20 relative -mt-2 opacity-50">
                            <div className="absolute top-0 left-0 w-2/3 h-20 bg-gradient-to-b from-gray-300 to-gray-900 -skew-x-12 rounded-l-md" />
                            <div className="absolute top-0 right-0 w-2/3 h-20 bg-gradient-to-b from-gray-300 to-gray-900 skew-x-12 rounded-r-md" />
                          </div>
                        </div>
                        {/* Danh sach ghe */}
                        <div
                          className="grid w-full items-center justify-items-center gap-2"
                          style={{
                            gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
                          }}
                        >
                          {renderSeat()}
                        </div>
                      </div>
                      {/* Thong tin rap */}
                      <div
                        className={`w-1/3 pt-8 duration-500 ${
                          showTicket
                            ? "opacity-0 invisible"
                            : "opacity-100 visible"
                        }`}
                      >
                        <div className="mb-6">
                          <p className="text-sm text-gray-400 mb-2">Cụm rạp</p>
                          <p className="text-xl font-semibold">
                            {listTicketByFilm.thongTinPhim.tenCumRap}
                          </p>
                        </div>
                        <div className="mb-6">
                          <p className="text-sm text-gray-400 mb-2">Tên rạp</p>
                          <p className="text-xl font-semibold">
                            {listTicketByFilm.thongTinPhim.tenRap}
                          </p>
                        </div>
                        <div className="mb-6">
                          <p className="text-sm text-gray-400 mb-2">
                            Ngày chiếu
                          </p>
                          <p className="text-xl font-semibold">
                            {listTicketByFilm.thongTinPhim.ngayChieu}
                          </p>
                        </div>
                        <div className="mb-6">
                          <p className="text-sm text-gray-400 mb-2">
                            Giờ chiếu
                          </p>
                          <p className="text-xl font-semibold">
                            {listTicketByFilm.thongTinPhim.gioChieu}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CSSTransitionGroup>
                )}
                {/* Thông tin vé */}
                <div
                  className={`duration-500 ${
                    showTicket
                      ? "opacity-100 inline h-auto"
                      : "opacity-0 hidden h-0"
                  }`}
                >
                  {renderListTicketOwned()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookTicket;
