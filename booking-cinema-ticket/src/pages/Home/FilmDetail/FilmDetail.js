import React, { useEffect } from "react";
import ButtonPlayVideo from "../../../components/Global/ButtonPlayVideo";
import { film } from "../../../data";

const FIlmDetail = (props) => {
  // {props.match.params.maPhim}
  // TODO render component
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
          // handleOnclick={() => {
          //   setModalVideo({ videoId: "OB3g37GTALc&t", isOpen: true });
          // }}
        />
      </div>
    </div>
  );
};

export default FIlmDetail;
