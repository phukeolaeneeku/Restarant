import React, { useState } from "react";
import Swal from "sweetalert2";
import "./css/cart.css";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Menufooter from "../components/Menufooter";
import { IoIosArrowBack } from "react-icons/io";
import UseCart from "./UseCart";

const Cart = ({ products }) => {
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPriceForStore,
  } = UseCart();

  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).user_id
    : null;

  const stores = [...new Set(cart.map((item) => item.store_name))];
  const [loading, setLoading] = useState(false);
  const [restaurantId, setRestaurantId] = useState(cart[0]?.restaurant_id);
  const [table, setTable] = useState(cart[0]?.table_id);
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const [paid, setPaid] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = JSON.stringify({
        restaurant: restaurantId,
        table: table,
        user: user,
        employee: employee,
        status: "PENDING",
        paid: false,
        order_items: cart.map((item) => ({
          menu_item: item.id,
          quantity: item.quantity,
          employee: employee,
        })),
      });
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/restaurants/${restaurantId}/table/${table}/create_or_update/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      Swal.fire("Success", "Order placed successfully!", "success");
      localStorage.removeItem("cart");
      navigate(`/home/restaurant/${restaurantId}/table/${table}`);
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showPayment ? (
        <Payment orders={[{ user: userId, store: storeId, items: cart }]} />
      ) : (
        <>
          <Menufooter products={products} />
          <div className="cart_box_container112">
            <Link to={`/home/restaurant/${restaurantId}/table/${table}`} className="back_orderBox">
              <IoIosArrowBack id="icons_back" />
              <p>Back</p>
            </Link>
            <div className="container-box-order">
              <h2>Cart</h2>
              {stores.length === 0 ? (
                <p className="no-reviews-message">No Products</p>
              ) : (
                stores.map((store, index) => (
                  <div className="box_cart_item_head1" key={index}>
                    <h3>List menu:</h3>
                    <div className="box_groupaCart_item1">
                      <div className="box_content_cart1">
                        {cart
                          .filter((item) => item.store_name === store)
                          .map((item) => (
                            <div className="foodDetails_box" key={item.id}>
                              <div className="box_ofDetails_food">
                                <img src={item.image} alt={item.name} />
                                <div className="txt_ofDetails_food">
                                  <p>{item.name}</p>
                                  <p>$ {item.price}</p>
                                </div>
                              </div>
                              <div className="right_oflastDetailsFood">
                                <div
                                  className="icon_DetailsFood"
                                  onClick={() => removeFromCart(item.id, store)}
                                >
                                  <AiOutlineDelete />
                                </div>
                                <div className="boxCount_numfood">
                                  <p
                                    className="deleteIconCount"
                                    onClick={() =>
                                      updateQuantity(
                                        item.id,
                                        item.store_name,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    <FaMinus />
                                  </p>
                                  <p className="countBtn_numberCount">
                                    {item.quantity}
                                  </p>
                                  <p
                                    className="addIconCount"
                                    onClick={() =>
                                      updateQuantity(
                                        item.id,
                                        item.store_name,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    <FaPlus />
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="count_footmenu_box">
                        <h3>Cart Total for {store}</h3>
                        <div className="count_footmenu_box_content">
                          <div className="count_footmenu_box_item_1">
                            <p>Quantity:</p>
                            <p>{getTotalItems()}</p>
                          </div>
                          <div className="count_footmenu_box_item_2">
                            <h3>Total: </h3>
                            <p className="text-dollar">$</p>
                            <p>{getTotalPriceForStore(store).toFixed(2)}</p>
                          </div>
                          <div className="btn-cart2">
                            <div className="btn_Continues">
                              <Link to="/" className="blue-link">
                                Continue Order
                              </Link>
                            </div>
                            <div
                              onClick={handleSubmit}
                              className="btn_confirmCart"
                            >
                              Confirm Order
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
