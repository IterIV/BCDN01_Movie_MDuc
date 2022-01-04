import React from "react";
import BarCode from "react-barcode";
import { DateTime } from "../../ulti/help";
import { listRowAlphabet } from "../../ulti/settings";

const Ticket = ({ filmInfo, seat }) => {
  return (
    <div className="flex w-full h-60 my-8">
      {/* Ticket - left */}
      <div className="w-1/3 bg-white px-4 py-4 rounded-l-md">
        <p className="text-center text-sm font-bold mb-2 uppercase text-red-600">
          {filmInfo.tenCumRap}
        </p>
        <div className="flex uppercase text-black justify-between font-bold">
          <div className="text-sm">
            <p>{filmInfo.tenRap}</p>
            <p>
              Ghế{" "}
              <span>{`${listRowAlphabet[Math.floor(Number(seat.stt) / 16)]}${
                Number(seat.stt) % 16
              }`}</span>
            </p>
          </div>
          <div className="text-sm">
            <p>{filmInfo.ngayChieu}</p>
            <p>{filmInfo.gioChieu}</p>
          </div>
        </div>
        <div className="ticket__barcode my-2 text-black ">
          <BarCode
            fontSize={"14px"}
            font={"Roboto"}
            displayValue={false}
            height={"140px"}
            background={"transparent"}
            value="447 411 43 983 21 2332 12"
          />
          <p className="text-center font-semibold">447 411 43 983 21 2332 12</p>
        </div>
        <p className="text-center text-red-600 font-bold uppercase tracking-wider">
          Gev Movie
        </p>
      </div>
      {/* Ticket - right */}
      <div className="w-2/3 rounded-r-md overflow-hidden relative">
        <img
          className="w-full h-full object-cover object-bottom"
          src="https://songmoi.vn/Uploads/News/1566138144.jpg"
          alt=""
        />
        <div className="absolute top-0 left-0 bg-black/40 w-full h-full py-4 px-4">
          <div className="flex flex-col items-end">
            <p className="uppercase text-center shadow-lg">
              <span className="text-3xl tracking-tighter font-extrabold">
                gev
              </span>
              <br />
              <span className="tracking-widest font-bold">cinema</span>
            </p>
          </div>
          <p className="uppercase font-extrabold text-3xl tracking-wide ml-2">
            {filmInfo.tenPhim}
          </p>
          <div className="inline-flex py-4 px-2 bg-black/50 justify-center mt-4">
            <p className="flex flex-col items-center uppercase mx-5">
              <span className="text-sm text-gray-300">Hàng</span>
              <span className="font-bold text-3xl">
                {listRowAlphabet[Math.floor(Number(seat.stt) / 16)]}
              </span>
            </p>
            <p className="flex flex-col items-center uppercase mx-5">
              <span className="text-sm text-gray-300">Ghế</span>
              <span className="font-bold text-3xl">
                {Number(seat.stt) % 16}
              </span>
            </p>
            <p className="flex flex-col items-center uppercase mx-5">
              <span className="text-sm text-gray-300">Ngày chiếu</span>
              <div className="flex items-center">
                <p className="font-bold text-3xl mr-1">
                  {new DateTime(filmInfo.ngayChieu).getDate()}
                </p>
                <p className="flex flex-col">
                  <span className="border-b-2 border-white text-xs text-center">
                    {new DateTime(filmInfo.ngayChieu).getMonth()}
                  </span>
                  <p className="text-xs">
                    {new DateTime(filmInfo.ngayChieu).getShortYear()}
                  </p>
                </p>
              </div>
            </p>
            <p className="flex flex-col items-center uppercase mx-5">
              <span className="text-sm text-gray-300">Giờ chiếu</span>
              <span className="font-bold text-3xl">{filmInfo.gioChieu}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
