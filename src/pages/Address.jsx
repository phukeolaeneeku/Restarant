import React from "react";
import "./css/address.css";
import { Link } from "react-router-dom";
import Menufooter from "../components/Menufooter";
import { IoIosArrowBack } from "react-icons/io";

function Address() {
  return (
    <>
      <Menufooter />
      <div className="continer_address">
        <div className="title_header_orderBox">
          <Link to="/payment " className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
          <h3>Address</h3>
        </div>
        <div className="box_address">
          <div className="input_box">
            <label>Name:</label>
           
            <input
              className="input_form"
              type="email"
              placeholder="Enter Your Name"
            />
            <label>Name:</label>
            <input
              className="input_form"
              type="password"
              placeholder="Enter Your Name"
            />
            <label>Name:</label>
            <input
              className="input_form"
              type="password"
              placeholder="Enter Your Name"
            />
            <label>Name:</label>
            <input
              className="input_form"
              type="password"
              placeholder="Enter Your Name"
            />
            <label>Name:</label>
            <input
              className="input_form"
              type="password"
              placeholder="Enter Your Name"
            />
            
          </div>
          <div className="btn-con-address">
          <Link to="/payment" className="btn_confirm_address">
            Confirm
          </Link>
        </div>
        </div>
        
      </div>
    </>
  );
}

export default Address;
