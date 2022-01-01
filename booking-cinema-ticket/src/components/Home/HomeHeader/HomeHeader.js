import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./HomeHeader.css";

const HomeHeader = (props) => {
  // TODO component state
  const [show, setShow] = useState(false);

  // TODO handle event
  const handleScroll = () => {
    if (window.scrollY > 90) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  // TODO useEffect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={show ? "bg-gray-900 py-2" : ""}>
      <div className="flex items-center justify-between container mx-auto ">
        <NavLink
          to="/"
          className={`flex ${
            show ? "flex-row" : "flex-col"
          } items-center p-2 duration-500`}
        >
          <img
            src="/assets/img/logo.png"
            alt="Cinema"
            className="w-10 h-10 mx-3"
          />
          <h1 className="text-white uppercase tracking-wider font-semibold">
            Gev Movie
          </h1>
        </NavLink>
        <nav className="flex">
          <ul className="header__menu">
            <li className="menu__item">
              <NavLink
                to="/"
                activeClassName="menu__active"
                isActive={() => {
                  return props.location.pathname === "/";
                }}
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/schedule" activeClassName="menu__active">
                Lịch chiếu
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/news" activeClassName="menu__active">
                Tin tức
              </NavLink>
            </li>
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            <button className="self-center px-7 py-2 font-semibold rounded bg-red-500 text-white duration-300 hover:bg-red-600 active:bg-red-500">
              Đăng nhập
            </button>
          </div>
          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-coolGray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
