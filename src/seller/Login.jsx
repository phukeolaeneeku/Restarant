import "./css/login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Login = () => {
  return (
    <>
      <section>
        <form className="box_container_login">
          <div className="cover">
            <div className="box_headerlogin">
              <div></div>
              <h2 className="box_container_login_text">Login</h2>
              <Link to="/" className="box_iconBack_homepage">
                <IoClose />
              </Link>
            </div>
            <div className="input_boxForm">
              <label>Email</label>
              <input
                className="input_form"
                type="email"
                placeholder="Enter Your Email"
              />
              <label>Password</label>
              <input
                className="input_form"
                type="password"
                placeholder="Enter Your Password"
              />
            </div>

            <div className="forgot_password">
              Forgot your password?
              <Link to="#" className="findpassword">
                Find password
              </Link>
            </div>

            <Link type="submit" className="login_btn" >
              Login
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
