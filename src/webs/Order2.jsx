import React, { useState, useEffect } from "react";
import "./css/order2.css";
import Menufooter2 from "../webs/Menufooter2";
import { Link } from "react-router-dom";
import { GrDocumentText } from "react-icons/gr";
import { LuChefHat } from "react-icons/lu";
import { BiSolidDish } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import foodImage from "../img/foodImage.png";

function Order2() {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: foodImage,
      name: "Margherita Pizza",
      price: 10.99,
      count: 1, // Initial count for product 1
    },
    {
      id: 2,
      image: foodImage,
      name: "Pepperoni Pizza",
      price: 11.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 3,
      image: foodImage,
      name: "Hawaiian Pizza",
      price: 12.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 4,
      image: foodImage,
      name: "Vegetarian Pizza",
      price: 11.49,
      count: 1, // Initial count for product 2
    },
    {
      id: 5,
      image: foodImage,
      name: "Meat Lover's Pizza",
      price: 13.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 6,
      image: foodImage,
      name: "BBQ Chicken Pizza",
      price: 12.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 7,
      image: foodImage,
      name: "Buffalo Chicken Pizza",
      price: 13.49,
      count: 1, // Initial count for product 2
    },
    {
      id: 8,
      image: foodImage,
      name: "Four Cheese Pizza",
      price: 11.99,
      count: 1, // Initial count for product 2
    },
    // Add count property for other products as needed
  ]);
  const [dateTime, setDateTime] = useState(new Date());

  // Update the date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Format date and time
  const formattedDateTime = dateTime.toLocaleString();
  return (
    <>
      <Menufooter2 />

      <div className="order_box_container">
        <div className="title_header_orderBox">
          <Link to="/orderList2" className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
          <h3>Order</h3>
        </div>
        <div className="box_firstOrder_content">
          <h4>Track your Order</h4>
          <div className="boxOrder_status">
            <div className="numberIdFoodorder">
              <p>No:1</p>
              <p>ID:1</p>
              <p>Name:1</p>
            </div>
            <div className="boxstatus_foodorder">
              <div className="icon_status ofitxtactive ">
                <GrDocumentText />
              </div>
              <div className="icon_status ofitxtactive">
                <LuChefHat />
              </div>
              <div className="icon_status ">
                <BiSolidDish />
              </div>
              <div className="spanBoxInline"></div>
              <div className="spanBoxInline2"></div>
            </div>
            <p className="ssdasdsa-1">Your order has been received</p>
          </div>
        </div>
        <div className="order_content">
          <h4>List menu:</h4>
          <div className="order_contentItem">
            <div>
              <h4>Name</h4>
              <div className="boxGrouptxtintro boxofnamefood">
                {products.map((product) => (
                  <p key={product.id}>{product.name}</p>
                ))}
              </div>
            </div>
            <div>
              <h4>Price</h4>
              <div className="boxGrouptxtintro">
                {products.map((product) => (
                  <p key={product.id}>{product.price}</p>
                ))}
              </div>
            </div>
            <div>
              <h4>Amount</h4>
              <div className="boxGrouptxtintro">
                {products.map((product) => (
                  <p key={product.id}>{product.count}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="box_groupPrice">
          <h4>Total:</h4>
            <h4 className="text-dollar">$</h4>
            <h4>
              {products
                .reduce(
                  (total, product) =>
                    parseInt(total) +
                    parseInt(product.count) * parseInt(product.price),
                  0
                )
                .toFixed(2)}
            </h4>
          </div>
          <div className="boxgroupLastfoot">
            <p>Place on: {formattedDateTime}</p>
            <p>Payment method: MasterCard</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order2;
