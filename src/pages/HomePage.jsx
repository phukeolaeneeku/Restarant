import "./css/homePage.css";
import React, { useEffect, useState } from "react";
import Menufooter from "../components/Menufooter";
import FoodItem from "../components/FoodItem";
import { Link, useParams } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import Rating from "@mui/material/Rating";
import axios from "axios";
import Logo from "../img/Logo_1.png";
import Logo_banner from "../img/Logo_banner.png";
const HomePage = () => {
  const { restaurantId, table_id } = useParams();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("All");
  const [filter, setFilter] = useState("");
  const [goodsList, setGoodsList] = useState([]);
  const [restaurant, setRestaurant] = useState({
    name: "",
    logo: "",
    address: "",
    banner_image: "",
    phone: "",
    description: "",
    time: "",
  });

  const storage = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    getCategories();
    getRestaurantDetails();
  }, []);

  const getCategories = () => {
    axios
      .get(
        `${import.meta.env.VITE_API}/restaurants/${restaurantId ? restaurantId : storage.restaurant_id
        }/categories/list/`
      )
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log("Error fetching categories:", error);
      });
  };

  const getRestaurantDetails = () => {
    axios
      .get(
        `${import.meta.env.VITE_API}/restaurants/${restaurantId ? restaurantId : storage.restaurant_id
        }/`
      )
      .then((response) => {
        const { name, logo, address, banner_image, phone, description, time } =
          response.data;

        // Ensure that if any field is missing or undefined, it defaults to an empty string
        const updatedRestaurant = {
          name: name || "",
          logo: logo || "",
          address: address || "",
          banner_image: banner_image || "",
          phone: phone || "",
          description: description || "",
          time: time || "",
        };

        setRestaurant(updatedRestaurant);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  };

  const handleCategoryClick = (categoryName) => {
    setCategoryName(categoryName);
  };

  const [value, setValue] = useState(3);

  return (
    <>
      <Menufooter />
      <div className="container_boxHeaderAt_store2-hp">
        <div className="box_logo">
          <img src={restaurant.logo || Logo} alt="logo" />
        </div>
        <div className="box_heardOfGrooup">
          <div className="header_box_of_header">
            <h3>{restaurant.name}</h3>
            <p className="description-text">{restaurant.description}</p>

            <div className="contact_head_Boxdetails">
              <FiPhone className="iconnDetails_head" />
              <p className="text">{restaurant.phone}</p>
              <IoMdTime className="iconnDetails_head" />
              <p className="text">{restaurant.time}</p>
            </div>

            <div className="contact_head_Boxdetails-star">
              <Rating
                className="star-icon"
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <p className="text-review">29 Review</p>
              <Link to="/reviews" className="switch_btn_view_hp2">
                View
              </Link>
            </div>
          </div>
          <div className="header_contact_details_box">
            <div className="contact_head_Boxdetails-map-hp">
              <FiMapPin className="iconnDetails_head-map" />
              <p>{restaurant.address}</p>
              <Link to="/addressMap" className="switch_btn2-hp2">
                View
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container_boxHeaderAt_store">
        <div className="box_banner_content">
          <img src={restaurant.banner_image || Logo_banner} alt="" />
        </div>
      </div>

      <FoodItem />
    </>
  );
};

export default HomePage;
