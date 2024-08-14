import React, { useEffect, useState } from "react";
import "./css/ordermenu.css";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Orderr from "./Orderr"; // Import Orderr component
import Swal from "sweetalert2";

const Ordermenu = ({ orders, setOrders, menuItems, tableId }) => {
  const [itemDetails, setItemDetails] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [checkoutDate, setCheckoutDate] = useState(null);

  // Combine all orders into a single order
  useEffect(() => {
    if (orders.length === 0) return;

    const combinedOrderItems = orders.flatMap((order) => order.order_items);

    // Combine order items with the same menu_item
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
          axios.get(`http://127.0.0.1:8000/restaurants/1/orders/5/detail/`)
          // axios.get(`http://127.0.0.1:8000/restaurants/1/orders/list/${itemId}/`)
          // axios.get(`http://127.0.0.1:8000/restaurants/4/orders/3/detail/`)
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

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    const updatedOrders = orders.map((ord) => {
      if (ord.id === order.id) {
        const updatedOrderItems = ord.order_items.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        return { ...ord, order_items: updatedOrderItems };
      }
      return ord;
    });

    setOrders(updatedOrders);
  };

  const deleteOrderItem = (itemId) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "csrftoken=3kqVvYdmUvnC1fSP3mrkCyUHahHcQlxD");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:8000/restaurant/order-items/${itemId}/`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    // setOrders(updatedOrders);
  };

  useEffect(() => {
    if (!order) return;

    let totalQuantityCount = 0;
    let totalPriceCount = 0;

    order.order_items.forEach((item) => {
      totalQuantityCount += item.quantity;
      totalPriceCount += item.quantity * itemDetails[item.menu_item]?.price;
    });

    setTotalQuantity(totalQuantityCount);
    setTotalPrice(totalPriceCount);
  }, [order, itemDetails]);

  const addItemToOrder = (menuItemId) => {
    const newOrderItem = {
      id: Date.now(), // Use a unique ID
      menu_item: menuItemId,
      quantity: 1,
    };

    const updatedOrders = orders.map((ord) => {
      if (ord.id === order.id) {
        return { ...ord, order_items: [...ord.order_items, newOrderItem] };
      }
      return ord;
    });

    setOrders(updatedOrders);
  };

  const handleCheckout = () => {
    const currentDateTime = new Date().toLocaleString();
    setCheckoutDate(currentDateTime); // Save checkout date and time

    Swal.fire({
      title: "Confirm Checkout",
      text: "Are you sure you want to proceed with the checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowBill(true); // Assuming setShowBill is a state updater function
      }
    });
  };

  if (!order) return <div>No orders available</div>;

  return (
    <>
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
                  </div>
                  <div className="box-txt-quantity">
                    <div className="right_oflastDetailsFood22">
                      <div className="icon_DetailsFood22">
                        <AiOutlineDelete
                          onClick={() => deleteOrderItem(item.id)}
                        />
                      </div>
                      <div className="boxCount_numfood22">
                        <p
                          className="deleteIconCount22"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <RemoveCircleOutlineIcon />
                        </p>
                        <p className="countBtn_numberCount">{item.quantity}</p>
                        <p
                          className="addIconCount22"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <ControlPointIcon />
                        </p>
                      </div>
                    </div>
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
            <p className="text-dollar2"> ${totalPrice}</p>
          </div>
        </div>
      </div>

      <div className="button-checkout">
        <div className="btn-checkout" onClick={handleCheckout}>
          Checkout
        </div>
      </div>
      {showBill && (
        <Orderr
          order={order}
          itemDetails={itemDetails}
          totalPrice={totalPrice}
          totalQuantity={totalQuantity}
        />
      )}
    </>
  );
};

export default Ordermenu;
