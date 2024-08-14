import React from "react";
import "./css/signup.css";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Menubar from "./Menubar";

const Signup = () => {
  return (
    <>
      <Menubar />
      <div className="container-signup">
        <div className="title_header_orderBox">
          <Link to="/logino" className="back_orderBox">
            <MdArrowBack className="icon_closeReviwe" />
            Back
          </Link>
        </div>
        <div className="container-box-signup">
          <div className="contian-box-sigup">
            <h3>SignUp</h3>
            <p>You are in the progress of signing up as a user!</p>
          </div>
          <div className="box-input">
            <h4>Enter basic information</h4>
            <div className="input_boxForm-signup">
              {/* <label>Email</label> */}
              <input
                className="input_form"
                type="email"
                placeholder="Enter Your Email"
              />
              {/* <label>Password</label> */}
              <input
                className="input_form"
                type="password"
                placeholder="Enter Your Password"
              />
              <input
                className="input_form"
                type="password"
                placeholder="Confirm Your Password"
              />
            </div>
            <h4>Enter Restuarant information</h4>
            <div className="input_boxForm-signup">
              <input
                className="input_form"
                type="email"
                placeholder="Restaurant name"
              />

              <input
                className="input_form"
                type="password"
                placeholder="Address"
              />
              <input
                className="input_form"
                type="password"
                placeholder="Detailed address"
              />
              <input
                className="input_form"
                type="password"c
                placeholder="Phone number"
              />
              <input
                className="input_form"
                type="password"
                placeholder="Business registration number"
              />
              <textarea
                className="textarea-form"
                type="password"
                placeholder="Store introduction"
              />
            </div>
            <div className="btn-signup">
              <Link to="/logino" className="button-signup">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
