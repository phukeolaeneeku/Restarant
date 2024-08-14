import React from "react";
import "./css/payment.css";
import { Link, useNavigate } from "react-router-dom";
import Menufooter from "../components/Menufooter";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import axios from "axios";

function Payment({ orders }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.user_id : null;
  const employeeId = 2; // Assuming employee ID is 1 for this example
  const tableId = 4; // Assuming table ID is 1 for this example

  const totalPrice = orders.reduce((acc, product) => {
    return (
      acc +
      product.items.reduce(
        (subtotal, item) => subtotal + item.price * item.quantity,
        0
      )
    );
  }, 0);

  const handleConfirmPayment = async (event) => {
    event.preventDefault(); 
  
    try {
      const orderData = {
        restaurant: 1, // Assuming restaurant ID is 1 for this example
        table: tableId,
        employee: employeeId,
        status: "PENDING",
        paid: false,
        items: orders.flatMap(product => 
          product.items.map(item => ({
            menu_item: item.id,
            quantity: item.quantity,
            employee: employeeId
          }))
        ),
      };
  
      const config = {
        method: "post",
        url: "http://127.0.0.1:8000/restaurants/1/orders/create/",
        headers: {
          "Content-Type": "application/json",
        },
        data: orderData,
      };
  
      const response = await axios(config);
  
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Order confirmed successfully!",
        }).then(() => {
          navigate("/");
        });
      } else {
        throw new Error("Failed to confirm order.");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to confirm order. Please try again.",
      });
    }
  };
  
  return (
    <>
      <Menufooter />
      <div className="continer-payment">
        <div className="title_header_orderBox">
          <Link to="/" className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
        </div>

        <div className="text-detail">
          <h4>Detail:</h4>
        </div>
        <div className="Box-continer-payment2">
          <div className="count_continer-payment2">
            {orders.map((product, index) => (
              <div key={index}>
                {product.items.map((item, itemIndex) => (
                  <div className="box_item_gourp_payment" key={itemIndex}>
                    <div className="count_box_item_payment1">
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                    </div>
                    <div className="text-quan">
                      <p>{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="Box-continer-payment2">
          <div className="count_continer-payment2">
            <div className="count_box_item_payment">
              <p>Quantity:</p>
              <p>
                {orders.reduce(
                  (acc, product) =>
                    acc +
                    product.items.reduce(
                      (subtotal, item) => subtotal + item.quantity,
                      0
                    ),
                  0
                )}
              </p>
            </div>

            <div className="count_box_item_payment">
              <p>Total:</p>
              <p>$ {totalPrice}</p>
            </div>
          </div>
        </div>

        <div className="button-con-pay">
          <button
            className="btn_confirm_payment"
            onClick={handleConfirmPayment}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default Payment;
