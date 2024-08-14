import React, { useEffect, useState } from "react";
import Menufooter from "./Menubar";
import "./css/detailorder2.css";
import axios from "axios";

const Detailorder2 = ({ orders, setOrders, menuItems, tableId }) => {
  const [itemDetails, setItemDetails] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (orders.length === 0) return;

    const combinedOrderItems = orders.flatMap((order) => order.order_items);

    const combinedOrderItemsMap = combinedOrderItems.reduce((acc, item) => {
      if (acc[item.menu_item]) {
        acc[item.menu_item].quantity += item.quantity;
      } else {
        acc[item.menu_item] = { ...item };
      }
      return acc;
    }, {});

    const combinedOrder = {
      id: orders[0].id,
      table: orders[0].table,
      order_items: Object.values(combinedOrderItemsMap),
    };

    setOrders([combinedOrder]);
  }, [orders, setOrders]);

  const order = orders.length > 0 ? orders[0] : null;

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!order) return;

      const itemIds = order.order_items.map((item) => item.menu_item);
      const newItems = itemIds.filter((itemId) => !itemDetails[itemId]);
      if (newItems.length === 0) return;

      try {
        const itemDetailsPromises = newItems.map((itemId) =>
          axios.get(`http://127.0.0.1:8000/restaurant/menu-items/${itemId}/`)
        );
        const itemDetailsResponses = await Promise.all(itemDetailsPromises);
        const itemDetailsData = itemDetailsResponses.map(
          (response) => response.data
        );

        const newItemDetailsMap = {};
        itemDetailsData.forEach((itemDetail) => {
          newItemDetailsMap[itemDetail.id] = itemDetail;
        });

        setItemDetails((prevItemDetails) => ({
          ...prevItemDetails,
          ...newItemDetailsMap,
        }));
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    if (order) {
      fetchItemDetails();
    }
  }, [order, itemDetails]);

  useEffect(() => {
    if (!order) return;

    const totalQuantity = order.order_items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = order.order_items.reduce((acc, item) => {
      const price = itemDetails[item.menu_item]?.price || 0;
      return acc + item.quantity * price;
    }, 0);

    setTotalQuantity(totalQuantity);
    setTotalPrice(totalPrice);
  }, [order, itemDetails]);

  if (!order) return <div>No orders available</div>;

  return (
    <>
      <Menufooter />
      <div className="box-detail-order">
        <div className="box-d-order" key={order.id}>
          <h3>Order ID: {order.id}</h3>
          <ul>
            {order.order_items.map((item) => (
              <li key={item.id}>
                <div className="box-txt-dtorder">
                  <div className="box-textorder">
                    <p>{itemDetails[item.menu_item]?.name}</p>
                    <p> ${itemDetails[item.menu_item]?.price}</p>
                    <p className="countBtn_numberCount">{item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="count_menu_box_content">
          <div className="box-groupQuantity">
            <h3>Quantity:</h3>
            <p className="text-quantity">{totalQuantity}</p>
          </div>
          <div className="box-groupPrice2">
            <h3>Total: </h3>
            <p className="text-dollar2">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detailorder2;
