import React, { useState, useEffect } from "react";
import "./css/order.css"; // Import CSS for Orderr component
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import Swal from "sweetalert2"; // Import SweetAlert2

const Orderr = ({
  order,
  itemDetails,
  totalPrice,
  clearOrders,
  totalQuantity,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [isPaid, setIsPaid] = useState(false); // State to track whether the order is paid
  const [Employees, setEmployees] = useState([]);
  const [employeeRole, setEmployeeRole] = useState(""); // State to store employee role
  const [banners, setBanners] = useState([]);

  const axios = require("axios");
  const FormData = require("form-data");
  let data = new FormData();

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/restaurants/1/tables/1/detail/",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/restaurant/employees/`, {
        // You may need to pass authentication headers here
        // headers: {
        //   Authorization: `Bearer ${accessToken}`
        // }
      })
      .then((response) => {
        // Assuming the response data contains the user's role
        setEmployeeRole(response.data.role);
      })
      .catch((error) => {
        console.error("Error fetching employee role:", error);
      });
  }, []);

  const handleConfirm = () => {
    Swal.fire({
      title: "Confirm Order",
      text: "Are you sure you want to confirm this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          restaurant: order.restaurant_id,
          table: order.table,
          order_items: order.order_items.map((item) => ({
            menu_item: item.menu_item,
            quantity: item.quantity,
          })),
          total_price: totalPrice,
          is_paid: isPaid,
          order_date: getCurrentDateTime(),
          status: "COMPLETED", // Adding status field with value "Complete"
        };

        axios
          .post(`http://127.0.0.1:8000/restaurant/orders/`, data)
          .then((response) => {
            console.log("Order saved successfully:", response.data);
            navigate("/counter");
            clearOrders();
            Swal.fire({
              title: "Order Confirmed!",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error saving order:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to save order. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  const handlePaidToggle = () => {
    setIsPaid(!isPaid); // Toggle the state of isPaid
  };

  const getCurrentDateTime = () => {
    const currentDateTime = new Date().toLocaleDateString();
    return `${currentDateTime}`;
  };
  useEffect(() => {
    getBanners();
  }, []);
  const getBanners = () => {
    axios
      .get(import.meta.env.VITE_API + `/restaurant/restaurant`)
      .then((response) => {
        setBanners(response.data);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      });
  };
  return (
    <div className="bill">
      {banners.map((banner) => (
        <div className="image-logo" key={banner.id}>
          <img src={banner.logo} onClick={() => setSelectedFood(banner)} />
        </div>
      ))}
      <div className="text-box-bill">
        <h2>Bill</h2>
      </div>
      {/* {employeeRole && <h4>Employee Role: {employeeRole}</h4>} */}
      <div className="Date-box">
        <h4>Order: {order.id}</h4>
        <p>Date: {getCurrentDateTime()}</p>
      </div>
      <p>Point: 100</p>
      <p>Customer name: Kongchan</p>
      {/* <p>Staff name: Phailin</p> */}
      <p>
        Staff:{" "}
        {JSON.parse(window.localStorage.getItem("user")).user_name || null}
      </p>

      <p>Payment: BCEL-ONEPAY</p>
      <ul>
        <h4>Menu</h4>
        {order.order_items.map((item) => (
          <li key={item.id}>
            <div className="box-menu">
              <span>{itemDetails[item.menu_item]?.name}</span>
              <span> x {item.quantity}</span>
              <span>${itemDetails[item.menu_item]?.price * item.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-bill">
        <h3>Quantity: {totalQuantity}</h3>
        <h3>Total: ${totalPrice}</h3>
      </div>
      <h4>Vat: Free</h4>

      {/* <div className="checkbox-container">
        <label>
          <input type="checkbox" checked={isPaid} onChange={handlePaidToggle} />
          Paid
        </label>
      </div> */}
      <div className="text-tq">
        <p>THANK YOU</p>
        <span>
          We hope you enjoyed your meal and look forward to serving you again
          soon!
        </span>
      </div>
      {/* <div className="btn-cf-order">
        <Link className="confirm-link" onClick={handleConfirm}>
          Confirm
        </Link>
      </div> */}
    </div>
  );
};

export default Orderr;
