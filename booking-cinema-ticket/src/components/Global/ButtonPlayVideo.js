import React from "react";

const ButtonPlayVideo = ({ title, handleOnclick }) => {
  return (
    <>
      <button
        className="absolute top-2/3 right-1/4 capitalize z-10"
        onClick={handleOnclick}
      >
        <div className="banner__play__icon">
          <i className="fa fa-play text-red-500 text-sm"></i>
        </div>
        {title && <p className="text-sm mt-6">{title}</p>}
      </button>
    </>
  );
};

export default ButtonPlayVideo;
