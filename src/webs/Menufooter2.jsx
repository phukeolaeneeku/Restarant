import React, { useState, useEffect } from "react";
import "./css/menufooter2.css";
import { Link } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoCarSportSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom';


function Menufooter2() {
  

  return (
    <>
      <div className="menufooter_contentHeader">
        <div className="box_content_header">
          <NavLink to="/" className="linkTomenu ">
            <h3>Name Restaurant</h3>
          </NavLink>

          <div className="menu_header_box">
            

            <NavLink to="/homepage2" className="linkTomenu">
              Home
            </NavLink>
            <NavLink to="/orderList2" className="linkTomenu">
              Order
            </NavLink>
            <NavLink to="/cart2" className="boxcart_header_container">
              <p className="linkTomenu">Cart</p>
              <div className="boxcart_header">
                <div className="box_border_haeaderCart boxfirstbg">
                  <IoCartOutline className="icon_cart_header" />
                </div>
                <div className="box_border_haeaderCart">
                  {/* <p>{totalCount}</p>  */}
                  <p>8</p>
                </div>
              </div>
            </NavLink>
            <NavLink to="/mainpage" className="boxcart_header_container">
              <div className="boxcart_header">
                <IoRestaurantOutline className="icon_cart_header" />
              </div>
            </NavLink>
            <NavLink to="/homepage2" className="boxcart_header_container">
              Delivery
            </NavLink>
          </div>
        </div>
      </div>

      <div className="menufooter_content_app">
        <NavLink className="link_menu" to="/homepage2">
          <IoStorefrontOutline className="iconMenu_foot" />
          Home
        </NavLink>

        <NavLink className="link_menu" to="/orderList2">
          <LuClipboardCheck className="iconMenu_foot" />
          Order
        </NavLink>
        <NavLink className="link_menu" to="/cart2">
          <IoCartOutline className="iconMenu_foot" />
          Cart
        </NavLink>
        <NavLink className="link_menu" to="/mainpage">
          <IoRestaurantOutline className="iconMenu_foot" />
          Owner
        </NavLink>
        <NavLink className="link_menu" to="/homepage2">
          <IoCarSportSharp className="iconMenu_foot" />
          Delivery
        </NavLink>
      </div>
    </>
  );
}

export default Menufooter2;
