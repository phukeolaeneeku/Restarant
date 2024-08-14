import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Swal from "sweetalert2";
import "./css/orderDetail.css"; // Ensure you have this CSS file for styling

const OrderDetail = () => {
  const { tableId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [menuDetails, setMenuDetails] = useState([]);
  const storage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrderDetails();
    fetchMenuDetails();
  }, [tableId]);

  const fetchOrderDetails = () => {
    axios
      .get(
        `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/orders/`,
        {
          params: {
            table_id: tableId,
            status: ["PENDING", "PREPARING", "READY"],
          },
        }
      )
      .then((response) => {
        if (response.data.length > 0) {
          setOrderDetails(response.data[0]); // Assuming you want to show details of the first matching order
        } else {
          setOrderDetails(null); // No matching order found
        }
      })
      .catch((error) => {
        console.log("Error fetching order details:", error);
      });
  };

  const fetchMenuDetails = () => {
    axios
      .get(
        `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/menu_items/`
      )
      .then((response) => {
        setMenuDetails(response.data);
      })
      .catch((error) => {
        console.log("Error fetching menu details:", error);
      });
  };

  const deleteOrderItem = (itemId) => {
    axios
      .patch(
        `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/order-items/${itemId}/cancel/`
      )
      .then((response) => {
        console.log("Order item cancelled successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Order item cancelled",
          text: "The order item has been cancelled successfully.",
          confirmButtonText: "OK",
        }).then(() => {
          fetchOrderDetails(); // Refetch order details after successful cancellation
        });
      })
      .catch((error) => {
        console.error("Error cancelling order item:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to cancel order item. Please try again later.",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <>
      <div className="container-order-detail">
        <div className="contain-order-detail">
          {orderDetails ? (
            <>
              <h2>Order #{orderDetails.id}</h2>
              <div className="order-list">
                {orderDetails.items.map((item) => {
                  const menuItem = menuDetails.find(
                    (menu) => menu.id === item.menu_item
                  );
                  return (
                    <div className="test-text" key={item.id}>
                      <div className="box-txt-dtorder">
                        <div className="box-textorder">
                          <p>{menuItem ? menuItem.name : "Unknown"}</p>
                          <p>{menuItem ? `$${menuItem.price}` : "Unknown"}</p>
                        </div>
                        <div className="box-txt-quantity">
                          <div className="right_oflastDetailsFood22">
                            <div className="icon_DetailsFood22">
                              <AiOutlineDelete
                                onClick={() => deleteOrderItem(item.id)}
                              />
                            </div>
                            <div className="boxCount_numfood22">
                              <p className="deleteIconCount22">
                                <RemoveCircleOutlineIcon />
                              </p>
                              <p className="countBtn_numberCount">
                                {item.quantity}
                              </p>
                              <p className="addIconCount22">
                                <ControlPointIcon />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p>Total Cost: ${orderDetails.total_cost}</p>
            </>
          ) : (
            <p>No pending orders found for this table.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
