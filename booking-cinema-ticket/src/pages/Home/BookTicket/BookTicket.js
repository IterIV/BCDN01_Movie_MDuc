import React from "react";
import { Redirect } from "react-router-dom";

const BookTicket = (props) => {
  return <div>{props.match.params.maLichChieu}</div>;
};

export default BookTicket;
