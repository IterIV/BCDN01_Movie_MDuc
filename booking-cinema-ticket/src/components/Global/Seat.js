import React, { useState } from "react";

const Seat = ({ seat, handleClick }) => {
  // TODO component states
  const [isSelect, setSelect] = useState(false);
  return (
    <button
      onClick={() => {
        setSelect(!isSelect);
        handleClick(seat);
      }}
      className={`w-5 h-5 my-2 ${
        isSelect ? "bg-red-500" : "bg-gray-300"
      } rounded-sm  disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-red-500`}
    ></button>
  );
};

export default React.memo(Seat);
