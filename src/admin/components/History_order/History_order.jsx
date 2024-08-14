import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./history_order.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import AdminMenu from "../ownerMenu/OwnerMenu";

function History_order() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/restaurant/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);
  return (
    <div>
      <AdminMenu />
      <div className="history_box_container">
        <div className="title_header_orderBox22">
          <Link to="/board" className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
          <h3 className="txttitle_manageorder">History</h3>
        </div>
        <div className="history_container_box">
          <div className="history-visit">
            <div className="history">
              <div className="item_guopBox">
                <div className="items-his">
                  <h4>ID</h4>
                  <h4>Status</h4>
                  <h4>Name</h4>
                  <h4>Table</h4>
                  <h4>Time</h4>
                  <h4>total</h4>
                  <h4>Action</h4>
                </div>
                <div className="items-his">
                  {orders.map((order, index) => (
                    <div key={index}>
                      <span>{index + 1}</span>
                      <span className="p1">
                        <IoIosCheckmarkCircle className="icon_check" />
                        Done
                      </span>
                      <span>{order.username}</span>
                      <span>{order.quantity}</span>
                      <span>{order.date}</span>
                      <span>{order.price}</span>
                      <Link
                        to={`/orderhistory/${order.id}`}
                        className="btnView"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
                {/* <div className="items-his">
                  <span>2</span>
                  <span>
                    <IoIosCheckmarkCircle className="icon_check" />
                    Done
                  </span>
                  <span>Username</span>
                  <span>2</span>
                  <span>11-3-2024 11:10:35</span>
                  <span>400,000 KIP</span>
                  <Link to="/orderhistory" className="btnView">
                    View
                  </Link>
                </div> */}
                {/* <div className="items-his">
                  <span>3</span>
                  <span>
                    <IoIosCheckmarkCircle className="icon_check" />
                    Done
                  </span>
                  <span>Username</span>
                  <span>3</span>
                  <span>11-3-2024 11:10:35</span>
                  <span>320,000 KIP</span>
                  <Link to="/orderhistory" className="btnView">
                    View
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History_order;
