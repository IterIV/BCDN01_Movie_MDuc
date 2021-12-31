import React from "react";
import "./ButtonPlayVideo.css";
const ButtonPlayVideo = ({ className, title, handleOnclick }) => {
  return (
    <>
      <button onClick={handleOnclick} className={className}>
        <div className="banner__play__icon">
          <i className="fa fa-play text-red-500 text-sm"></i>
        </div>
        {title && <p className="text-sm mt-6">{title}</p>}
      </button>
    </>
  );
};

export default ButtonPlayVideo;
