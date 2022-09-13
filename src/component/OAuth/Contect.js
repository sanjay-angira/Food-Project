import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Contect() {
  const token = JSON.parse(localStorage.getItem('token'));


  
  return (
    <>
      <button className="btn btn-warning">Choose Your Favourite Food</button>
    </>
  );
}

export default Contect;
