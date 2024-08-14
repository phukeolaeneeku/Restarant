import "./css/homeSeller.css";
import React, { useState } from 'react'
import Logo1 from "../img/Logo1.png";
import banner from "../img/banner.png";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import Menufooter from "../components/Menufooter";
import FoodItem from "../components/FoodItem";
import logo2 from "../img/logo2.png";

function homeSeller() {
    return (
        <div className="container_boxhomepage">
            <div className="container_boxHeaderAt_store2">
                <div className="logo_box_homepage">
                    <img src={logo2} alt="" />
                </div>
                <div className="box_heardOfGrooup">
                    <div className="header_box_of_header">
                        <div className="description_header">
                            <h3>Name Restaurant</h3>
                            <p>Description restaurant</p>
                        </div>
                        <div className="contact_head_Boxdetails">
                            <div className="contact_head_Boxdetails">
                                <FiPhone className="iconnDetails_head" />
                                <p>+856 20 55 000 959</p>
                            </div>
                            <div className="contact_head_Boxdetails">
                                <IoMdTime className="iconnDetails_head" />
                                <p>8:00 - 20:00</p>
                            </div>
                        </div>

                        <div className="header_contact_details">
                            <div className="contact_head_Boxdetails">
                                <div className="all_star_box">
                                    <IoIosStar className="iconstar_review adtiveStar" />
                                    <IoIosStar className="iconstar_review adtiveStar" />
                                    <IoIosStar className="iconstar_review adtiveStar" />
                                    <IoIosStar className="iconstar_review" />
                                    <IoIosStar className="iconstar_review" />
                                </div>
                                <p>29 Review</p>
                            </div>
                            <Link to="/Review" className="switch_btn">
                                View
                            </Link>
                        </div>
                    </div>
                    <div className="header_contact_details_box">
                        <div className="header_contact_details">
                            <div className="contact_head_Boxdetails">
                                <FiMapPin className="iconnDetails_head" />
                                <p>131 Sapang Sisangvvone Road,
                                    Ban Naxay, Vientiane 0100 ลาว</p>
                            </div>
                            <Link to="/addressMap" className="switch_btn">
                                View
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container_boxHeaderAt_store">
                <div className="box_banner_content">
                    <img src={banner} alt="" />
                    <div className="container_boxcategory">
                        <Link className="link_categor_l activeCategory" to="#">Pizza</Link>
                        <Link className="link_categor_l" to="#">Pizza</Link>
                        <Link className="link_categor_l" to="#">Pizza</Link>
                        <Link className="link_categor_l" to="#">PizzaPizza</Link>
                        <Link className="link_categor_l" to="#">Pizza</Link>
                        <Link className="link_categor_l" to="#">Pizza</Link>
                    </div>
                </div>
            </div>

            <FoodItem />
            <Menufooter />
        </div>
    )
}

export default homeSeller