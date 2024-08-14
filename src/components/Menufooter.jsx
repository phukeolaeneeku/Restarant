import React from "react";
import "./css/menufooter.css";
import { NavLink, useParams } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { MdDashboardCustomize } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import {
  IoCartOutline,
  IoStorefrontOutline,
} from "react-icons/io5";

function Menufooter() {
  const { restaurantId, table_id } = useParams();

  var restaurant_id = false;
  if (localStorage.getItem("user")) {
    restaurant_id = JSON.parse(
      window.localStorage.getItem("user")
    ).restaurant_id;
  }

  var is_admin = false;
  if (localStorage.getItem("user")) {
    is_admin = JSON.parse(window.localStorage.getItem("user")).is_admin;
  }

  return (
    <>
      <div className="menufooter_contentHeader">
        <div className="box_content_header">
          <div className="menu_header_box">
            <>
              {is_admin ? (
                <>
                  <NavLink to="#" className="linkTomenu">
                    Home
                  </NavLink>
                  <NavLink to="/board" className="boxcart_header_container">
                    <div className="boxcart_header">
                      <HiOutlineBuildingStorefront className="icon_cart_header" />
                      Dashboard
                    </div>
                  </NavLink>
                  {/* <NavLink to="/profile" className="linkTomenu">
                    <FaRegUser id="FaRegUser" />
                  </NavLink> */}
                </>
              ) : (
                <>
                  {restaurant_id ? (
                    <>
                      <NavLink to={`/home`} className="linkTomenu">
                        Home
                      </NavLink>
                      <NavLink
                        to="/dashboard"
                        className="boxcart_header_container"
                      >
                        <div className="boxcart_header">
                          <HiOutlineBuildingStorefront className="icon_cart_header" />
                          Dashboard
                        </div>
                      </NavLink>
                      <NavLink
                        to="/counter"
                        className="boxcart_header_container"
                      >
                        <div className="boxcart_header">
                          <MdDashboardCustomize className="icon_cart_header" />
                          Staff
                        </div>
                      </NavLink>
                      {/* <NavLink to="/profile" className="linkTomenu">
                        <FaRegUser id="FaRegUser" />
                      </NavLink> */}
                    </>
                  ) : (
                    <>
                      <NavLink
                        to={`/home/restaurant/${restaurantId}/table/${table_id}`}
                        className="linkTomenu"
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to={`/home/restaurant/${restaurantId}/table/${table_id}/order/`}
                        className="linkTomenu"
                      >
                        Order
                      </NavLink>
                      <NavLink
                        to={`/home/restaurant/${restaurantId}/table/${table_id}/cart`}
                        className="boxcart_header_container"
                      >
                        <p className="linkTomenu">Cart</p>
                      </NavLink>
                      <NavLink
                        to={`/home/restaurant/${restaurantId}/table/${table_id}/logino`}
                        className="boxcart_header_container"
                      >
                        <p className="linkTomenu">Login</p>
                      </NavLink>
                    </>
                  )}
                </>
              )}
            </>
          </div>
        </div>
      </div>
      <div className="menufooter_content_app">
        <NavLink
          className="link_menu"
          to={`/home/restaurant/${restaurantId}/table/${table_id}`}
        >
          <IoStorefrontOutline className="iconMenu_foot" />
          Home
        </NavLink>

        <NavLink
          className="link_menu"
          to={`/home/restaurant/${restaurantId}/table/${table_id}/order/`}
        >
          <LuClipboardCheck className="iconMenu_foot" />
          Order
        </NavLink>
        <NavLink
          className="link_menu"
          to={`/home/restaurant/${restaurantId}/table/${table_id}/cart`}
        >
          <IoCartOutline className="iconMenu_foot" />
          Cart
        </NavLink>
      </div>
    </>
  );
}

export default Menufooter;
