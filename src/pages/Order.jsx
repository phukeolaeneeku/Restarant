import React, { useState, useEffect } from "react";
import "./css/order.css";
import Menufooter from "../components/Menufooter";
import axios from "axios";
import { useParams } from "react-router-dom";

const Order = () => {
  const { restaurantId, table_id } = useParams();

  const [order, setOrder] = useState([]);

  useEffect(() => {
    let data = new FormData();

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        import.meta.env.VITE_API +
        `/restaurants/${restaurantId}/table/${table_id}/latest/`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [restaurantId, table_id]);

  return (
    <>
      <Menufooter />
      <div className="order_box_container">
        <h3>Your Order</h3>
        <div className="box_firstOrder_content">
          <h4>List menu:</h4>
          {/* <>
            <div className="test-text">
            </div>
          </> */}

          {order &&
            Array.isArray(order.order_items) &&
            order.order_items.map((or, index) => (
              <div className="box_groupPrice_2" key={index}>
                <h4 className="text-dollar">{or.menu_item.name}</h4>
                <h4 className="text-dollar">{or.quantity}</h4>
              </div>
            ))}
          <div className="boxgroupLastfoot">
            <p>Total: {order.total_cost}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
