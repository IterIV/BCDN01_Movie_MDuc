import React from "react";
import { Link } from "react-router-dom";
const HomeFooter = () => {
  return (
    <footer className=" bg-gradient-to-b from-gray-900 to-black pt-14 mt-10">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full ">
              <img src="/assets/img/logo.png" alt="Gev Movie" />
            </div>
            <span className="self-center text-2xl font-semibold">
              Gev Movie
            </span>
          </Link>
          <div className="flex justify-between">
            <Link to="/" className="mx-6 text-xl">
              Phim
            </Link>
            <Link to="/schedule" className="mx-6 text-xl">
              Lịch chiếu
            </Link>
            <Link to="/news" className="mx-6 text-xl">
              Tin tức
            </Link>
          </div>
          <div className="flex justify-start space-x-3">
            <span className="flex items-center justify-center rounded-full w-7 h-7 bg-white text-black">
              <i className="fab fa-facebook-f"></i>
            </span>
            <span className="flex items-center justify-center rounded-full w-7 h-7 bg-white text-black">
              <i className="fab fa-twitter"></i>
            </span>
            <span className="flex items-center justify-center rounded-full w-7 h-7 bg-white text-black">
              <i className="fab fa-instagram"></i>
            </span>
          </div>
        </div>

        <div className="py-6 text-sm text-center text-coolGray-600">
          © 2021 Gev Dev - germany.dev.91@gmail.com
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
