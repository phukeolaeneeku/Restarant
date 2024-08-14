import React from "react";
import "./board.css";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import iconshoppin1 from "../../../img/iconshoppin1.png";
import { IoFastFood } from "react-icons/io5";
import { IoChatbox } from "react-icons/io5";
import { IoList } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoTime } from "react-icons/io5";
import AdminMenu from "../ownerMenu/OwnerMenu";

const Board = () => {
  const [FoodItems, setFoodItems] = useState();
  const storage = JSON.parse(window.localStorage.getItem("user"));

  console.log("countFoodItemcountFoodItem...", FoodItems);

  useEffect(() => {
    if (storage && storage.restaurant_id) {
      getProducts(storage.restaurant_id);
    } else {
      console.error("No restaurant ID found in local storage.");
    }
  }, []);

  const getProducts = (restaurant_id) => {
    axios
      .get(
        `${
          import.meta.env.VITE_API
        }/restaurants/${restaurant_id}/menu_items/list/`
      )
      .then((response) => {
        setFoodItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <AdminMenu />
      <section>
        <div className="boxspentainer"></div>
        <div className="board">
          <div className="title_header_orderBox">
            <h4>Dashboard</h4>
          </div>
          <div className="box-dashboard1">
            <div className="box-dash">
              <div className="box-text">
                <div className="box-text1">
                  <h3>Order</h3>
                </div>
                <div className="box-text2">
                  <Link to="/dashboardpc" className="export_btn">
                    <img src={iconshoppin1} alt="" />
                    <p>Export</p>
                  </Link>
                </div>
              </div>
              <div className="box-continer-in1">
                <div className="box-continer-order">
                  <div className="box-text-order">
                    <div className="icon-test-order">
                      <IoFastFood />
                    </div>
                    <h4>Order</h4>
                    <h3>5</h3>
                    <Link to="#">
                      <p>View More</p>
                    </Link>
                  </div>
                </div>
                <div className="box-continer-food">
                  <div className="box-text-food">
                    <div className="icon-test-list">
                      <IoList />
                    </div>

                    <h4>Food list</h4>

                    <h3>{FoodItems ? FoodItems.length : 0}</h3>

                    <Link to="/dashboard">
                      <p>View More</p>
                    </Link>
                  </div>
                </div>
                <div className="box-continer-review">
                  <div className="box-text-review">
                    <div className="icon-test-review">
                      <IoStar />
                    </div>
                    <h4>Review</h4>
                    <h3>8</h3>
                    <Link to="/review_admin">
                      <p>View More</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-dash2">
              <div className="box-text-dash2">
                <div className="text-dash1">
                  <h4>Sales</h4>
                </div>
                <div className="text-dash2">
                  <select name="month" id="month">
                    <option value="">Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
              </div>
              <div className="box-text2-dash2">
                <div className="text-dash-1">
                  <p>This month's sales:</p>
                  <h4>2,000$</h4>
                </div>
                <div className="text-dash-2">
                  <p>All quanlity:</p>
                  <h4>100</h4>
                </div>
              </div>
              <div className="box-continer-history1">
                <div className="box-text-history1">
                  <div className="icon-test-history">
                    <IoTime />
                  </div>
                  <h4>History</h4>
                  <h3>4</h3>
                  <Link to="/history_order">
                    <p>View More</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Board;
