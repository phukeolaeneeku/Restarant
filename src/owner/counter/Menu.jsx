import React, { useEffect, useState, useContext } from "react";
import Menufooter from "../page/Menubar";
import "./css/menu.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import Ordermenu from "./Ordermenu";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import OrderDetail from "./OrderDetail";
import Orderr from "./Orderr";
import { AiOutlineDelete } from "react-icons/ai";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import imageicon from "../../img/imageicon.jpg";
import addNotification from "react-push-notification";

const Menu = () => {
  const { tableId } = useParams();
  const storage = JSON.parse(localStorage.getItem("user"));
  const [table, setTable] = useState([]);
  const [menus, setMenus] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderPending, setOrderPending] = useState([]);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);
  const [loadingMenus, setLoadingMenus] = useState(true);
  const [loadingOrderDetail, setLoadingOrderDetail] = useState(true);
  const [loadingMenuCalcel, setLoadingMenuCalcel] = useState(true);

  const [errorTable, setErrorTable] = useState(null);
  const [errorMenus, setErrorMenus] = useState(null);
  const [errorOrderDetail, setErrorOrderDetail] = useState(null);

  useEffect(() => {
    fetchTable();
    fetchMenus();
    fetchOrderDetail();
    fetchOrderPending();
  }, [storage.restaurant_id, tableId]);

  const fetchTable = async () => {
    setLoadingTable(true);
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
        }/tables/${tableId}/detail/`,
      };
      const response = await axios.request(config);
      setTable(response.data);
      setLoadingTable(false);
    } catch (error) {
      console.error(error);
      setErrorTable(error);
      setLoadingTable(false);
    }
  };

  const fetchMenus = async () => {
    setLoadingTable(true);
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
        }/menu_items/list/`,
      };
      const response = await axios.request(config);
      setMenus(response.data);
      setLoadingMenus(false);
    } catch (error) {
      console.error(error);
      setErrorMenus(error);
      setLoadingMenus(false);
    }
  };

  const fetchOrderDetail = async () => {
    setLoadingTable(true);
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
        }/table/${tableId}/latest/`,
      };
      const response = await axios.request(config);
      setOrderDetail(response.data);
      setLoadingOrderDetail(false);
    } catch (error) {
      console.error(error);
      setErrorOrderDetail(error);
      setLoadingOrderDetail(false);
    }
  };

  const handleSubmit = async function createOrUpdateOrder(menu_id) {
    let loadingOrder = true;

    console.log(menu_id);

    try {
      let data = JSON.stringify({
        restaurant: storage.restaurant_id,
        table: tableId,
        employee: null,
        status: "PENDING",
        paid: false,
        order_items: [
          {
            menu_item: menu_id,
            quantity: 1,
            employee: null,
          },
        ],
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url:
          import.meta.env.VITE_API +
          `/restaurants/${storage.restaurant_id}/table/${tableId}/create_or_update/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      console.log("Loading...");

      const response = await axios.request(config);
      console.log("Response:", JSON.stringify(response.data));
      fetchOrderDetail();
      alert("Success.");
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error", error.message);
      }
    } finally {
      loadingOrder = false;
      console.log("Loading finished.");

      addNotification({
        title: "New Order",
        message: `Restaurant: ${storage.restaurnt_name} from table ${tableId}`,
        duration: 8000,
        icon: imageicon,
        native: true,
        onClick: () => console.log("Push Notification"),
      });
    }
  };

  const handleMenuCancel = async (id) => {
    let data = JSON.stringify({
      status: "CANCELLED",
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API}/restaurants/order-items/${id}/status/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("Success.");
        fetchOrderDetail();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeStatus = (id) => {
    let data = JSON.stringify({
      status: "PREPARING",
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API}/restaurants/order-items/${id}/status/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("Success.");
        fetchOrderDetail();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePay = async () => {
    let data = JSON.stringify({
      paid: true,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API}/restaurants/${
        storage.restaurant_id
      }/table/${tableId}/update_paid_status/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        fetchOrderDetail();
        alert("Payment successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchOrderPending = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
        }/table/${tableId}/pending-orders/`,
      };
      const response = await axios.request(config);
      setOrderPending(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateMenuItem = async (id, quantity) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
        }/table/${tableId}/create_or_update/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item_id: id,
            quantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API response:", data);
      fetchOrderDetail();
    } catch (error) {
      console.error("Failed to update menu item:", error);
    }
  };

  const handleMenuIncrease = (id) => {
    setOrderDetail((prevOrderDetail) => ({
      ...prevOrderDetail,
      order_items: prevOrderDetail.order_items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));

    const updatedItem = orderDetail.order_items.find((item) => item.id === id);
    updateMenuItem(id, updatedItem.quantity + 1);

    formdata.append("category", "2");
    formdata.append(
      "image",
      fileInput.files[0],
      "/C:/Users/K/Pictures/Taca product images/kimjji.jpg"
    );
    formdata.append("name", "aa");
    formdata.append("description", "bb");
    formdata.append("price", "99");

    const requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "http://43.201.166.195:8000/restaurants/1/menu_items/1/update/?quantity=4",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const handleMenuDecrease = (id) => {
    const updatedItem = orderDetail.order_items.find((item) => item.id === id);
    if (updatedItem.quantity > 0) {
      setOrderDetail((prevOrderDetail) => ({
        ...prevOrderDetail,
        order_items: prevOrderDetail.order_items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      }));

      updateMenuItem(id, updatedItem.quantity - 1);
    }
  };

  return (
    <>
      <Menufooter />
      <div className="container-menu">
        <div className="contain-menu">
          <div className="title_header_order">
            <Link to="/counter" className="back_orderBox">
              <IoIosArrowBack className="icon_closeReviwe" />
              Back
            </Link>
          </div>
          <h2>Table {table.number}</h2>

          <div className="box_itemFood_container22">
            {menus.map((menu, index) => (
              <Link
                onClick={() => handleSubmit(menu.id)}
                className="box_itemFood"
                key={index}
              >
                <div className="box_itemFood_item22">
                  <img src={menu.image} alt="" />
                  <div className="txt_boxDescription">
                    <div className="product-info-hp">
                      <p className="product-name-hp">{menu.name}</p>
                    </div>
                    <div className="product-info-hp">
                      <p className="product-price-hp">Price: {menu.price}</p>
                    </div>
                  </div>
                </div>
                <div className="icon_addcartTo">
                  <IoCartOutline className="icon_addcartToIN" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="contain-order2">
          <div className="container-order-detail">
            <>
              {orderDetail.paid == true ||
              !orderDetail ||
              !orderDetail.order_items ? (
                <h3>This table is vailable now!</h3>
              ) : (
                <>
                  <h2>
                    Order #{orderDetail.id} || <strong>Paid:</strong>{" "}
                    {orderDetail.paid ? "Yes" : "No"}
                  </h2>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(orderDetail.timestamp).toLocaleString()}
                  </p>
                  <br />

                  <div className="order-list">
                    {orderDetail.order_items.map((menu, index) => (
                      <div className="test-text" key={index}>
                        <div className="box-txt-dtorder22">
                          <div className="box-textorder">
                            <p>Name: {menu.menu_item.name}</p>
                            <p>Price: {menu.menu_item.price}</p>
                          </div>

                          <div className="box_add_delete_orderitem">
                            <p className="deleteIconCount22">
                              <RemoveCircleOutlineIcon
                                onClick={() => handleMenuDecrease(menu.id)}
                              />
                            </p>
                            <p className="countBtn_numberCount">
                              {menu.quantity}
                            </p>
                            <p className="addIconCount22">
                              <ControlPointIcon
                                onClick={() => handleMenuIncrease(menu.id)}
                              />
                            </p>
                          </div>
                          <div className="right_oflastDetailsFood229">
                            <div className="icon_DetailsFood229">
                              <AiOutlineDelete
                                className="icon-del"
                                onClick={() => handleMenuCancel(menu.id)}
                              />
                            </div>
                            <button
                              onClick={() => handleChangeStatus(menu.id)}
                              className={`btn_status_orderitem ${menu.status.toLowerCase()}`}
                            >
                              {menu.status}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-quantity2">
                    Total Cost: ${orderDetail.total_cost}
                  </h3>
                </>
              )}
            </>
          </div>
          {orderDetail.paid != true && (
            <button
              className="btn_payment_forOrder"
              onClick={() => handlePay(orderDetail.id)}
            >
              Check Out
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
