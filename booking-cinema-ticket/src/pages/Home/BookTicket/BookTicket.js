import React from "react";
import { Redirect } from "react-router-dom";

const BookTicket = () => {
  if (localStorage.getItem("user") === null) {
    return <Redirect to="/login" />;
  }
  return <div>BookTicket</div>;
};

export default BookTicket;
