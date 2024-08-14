import React, { useState, useEffect } from "react";
import "./css/homeRestaurant.css";
import restaurant from "../img/restaurant.jpg";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import axios from "axios";

function HomeRestaurant() {
  // const [restaurants, setRestaurants] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = () => {
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: import.meta.env.VITE_API + " /restaurants/?search=restaurant01",
  //     headers: {},
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       setRestaurants(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <Search />
      {/* <div className="container_restaurant">
        <div className="head_restaurant">
          <div className="filter_restaurant">
            <div></div>
            <h3>Restaurants</h3>
          </div>
        </div>
        <div className="box_itemFood_restaurant">
          {restaurants.map((restaurant, index) => (
            <div className="box_containner_restaurant">
              <Link to={``} className="box_containner_itemFood" key={index}>
                <div className="box_containner_image">
                  <img src={restaurant.logo} alt="img" />
                  <div className="txt_boxDescription">
                    <div className="product-info-txt">
                      <p className="product-name-txt">
                        Name: {restaurant.name}
                      </p>
                    </div>
                    <div className="product-info-txt">
                      <p className="product-price-txt">
                        Description: {restaurant.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default HomeRestaurant;
