import "./css/homepage2.css";
import React, { useState } from "react";
import Menufooter2 from "../webs/Menufooter2";
import FoodItem from "../components/FoodItem";
import FoodItem2 from "../webs/FoodItem2";
import logo1 from "../img/Logo1.png";
import banner from "../img/banner.png";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";

function Homepage2() {
  return (
    <>
    <Menufooter2 />

      <div className="container_boxHeaderAt_store2-delivery">
        <div className="box_logo">
          <img src={logo1} alt="logo" />
        </div>
        <div className="box_heardOfGrooup">
          <div className="header_box_of_header">
            <h3>Name Restaurant</h3>
            <p>Description restaurant</p>

            <div
              className="contact_head_Boxdetails
            "
            >
              <FiPhone className="iconnDetails_head" />
              <p className="text">+856 20 55 000 959</p>
              <IoMdTime className="iconnDetails_head" />
              <p className="text">8:00 - 20:00</p>
            </div>

            <div className="contact_head_Boxdetails-star-2">
              <div className="all_star_box">
                <IoIosStar className="iconstar_review adtiveStar" />
                <IoIosStar className="iconstar_review adtiveStar" />
                <IoIosStar className="iconstar_review adtiveStar" />
                <IoIosStar className="iconstar_review" />
                <IoIosStar className="iconstar_review" />
              </div>
              <p>29 Review</p>
              <Link to="/reviews2" className="switch_btn_view_hp_2">
                View
              </Link>
            </div>
          </div>
          <div className="header_contact_details_box_2">
            <div className="contact_head_Boxdetails-map-hp_2">
              <FiMapPin className="iconnDetails_head-map2" />
              <p>131 Sapang Sisangvvone Road, Ban Naxay, Vientiane 0100 ลาว</p>

              <Link to="/addressMap" className="switch_btn2-hp-2">
                View
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container_boxHeaderAt_store">
        <div className="box_banner_content">
          <img src={banner} alt="" />
          <div className="container_boxcategory_delivery">
            <Link className="link_categor_l activeCategory" to="#">
              Pizza
            </Link>
            <Link className="link_categor_l" to="#">
              Pizza
            </Link>
            <Link className="link_categor_l" to="#">
              Pizza
            </Link>
            <Link className="link_categor_l" to="#">
              Pizza
            </Link>
            <Link className="link_categor_l" to="#">
              Pizza
            </Link>
            <Link className="link_categor_l" to="#">
              Pizza
            </Link>
          </div>
        </div>
      </div>
      
      <FoodItem2 />
    
    </>
  )
}

export default Homepage2