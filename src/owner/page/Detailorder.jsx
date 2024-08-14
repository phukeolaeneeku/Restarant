import React, { useEffect, useState } from "react";
import "./css/detailorder.css";
import Menufooter from "./Menubar";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CheckCircle } from "@mui/icons-material";
import axios from "axios";

const Detailorder = () => {
  const steps = ["Pending", "Preparing", "Ready", "Completed", "Cancelled"];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemDetails, setItemDetails] = useState({});
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  useEffect(() => {
    axios
      .get("http://43.201.166.195:8000/restaurant/orders/1/")
      .then((response) => {
        setOrderData(response.data);
        fetchMenuItemDetails(response.data.order_items);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const fetchMenuItemDetails = async (items) => {
    const details = {};
    let totalOrderPrice = 0;
  
    await Promise.all(
      items.map(async (item) => {
        try {
          const response = await axios.get(
            `http://43.201.166.195:8000/restaurant/menu-items/${item.menu_item}/`
          );
          const { name, price } = response.data;
          const totalPrice = price * item.quantity;
          details[item.menu_item] = {
            name: name,
            price: price,
            totalPrice: totalPrice
          };
          totalOrderPrice += totalPrice;
        } catch (error) {
          console.error(
            `Error fetching menu item with ID ${item.menu_item}:`,
            error
          );
          details[item.menu_item] = {
            name: "Unknown Item",
            price: 0,
            totalPrice: 0
          };
        }
      })
    );
  
    // Set total order price in orderData
    setOrderData(prevOrderData => ({
      ...prevOrderData,
      totalOrderPrice: totalOrderPrice
    }));
  
    setItemDetails(details);
    setLoading(false);
  };
  

  const handleStatusUpdate = () => {
    // Check if newStatus is properly set
    console.log("New Status:", newStatus);

    // Call the updateOrderStatus function
    updateOrderStatus(newStatus);

    // Exit the status editing mode
    setIsEditingStatus(false);
  };
  const updateOrderStatus = (status, callback) => {
    // Assuming 'status' is a string representing the new status of the order
    const requestData = { status: status };

    axios
      .patch(`/restaurant/orders/1/update_status/`, requestData)
      .then((response) => {
        console.log("Order status updated successfully:", response.data);
        // Call the callback function with the updated status
        callback(response.data.status);
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
        // Handle error, display error message to the user, etc.
      });
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep < steps.length - 1) {
      updateOrderStatus(steps[activeStep + 1]);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep > 0) {
      updateOrderStatus(steps[activeStep - 1]);
    }
  };

  const handleReset = () => {
    window.location.href = "/manageorder";
  };

  const handleStatusClick = () => {
    setIsEditingStatus(true);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderData) {
    return <div>Error loading order data</div>;
  }
  ///\
  const modifyOrderStatus = async (newStatus) => {
    try {
      const response = await axios.put(
        `http://43.201.166.195:8000/restaurant//orders/1/update_status/${status}/`,
        { status: newStatus }
      );
      setOrderData(response.data);
      setIsEditingStatus(false);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="detailorder_box_container">
      <div className="title_header_orderBox">
        <Link to="/manageorder" className="back_orderBox">
          <IoIosArrowBack className="icon_closeReviwe" />
          Back
        </Link>
        <h3>Order</h3>
      </div>
      <div className="continer-box">
        <div className="box_firstorder_content">
          <h4>Track your Order</h4>
          <div className="detailorder-status">
            <div className="name-textorder">
              <div className="numberId-detailorder">
                <p>ID: {orderData.id}</p>
                <p>Restaurant: {orderData.restaurant}</p>
              </div>
              <div>
                <p>Table {orderData.table}</p>
              </div>
            </div>
            <div className="box-status-detailorder">
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    if (isStepSkipped(index)) {
                      stepProps.completed = true;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {label}
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>
            </div>
            <p className="order-received">Your order has been received</p>
          </div>
        </div>
        <div className="order_content-detailorder">
          <h3>Menu</h3>
          <div className="order_content-Item">
            <div>
              <h4>Name</h4>
              <div className="box-Grouptxtintro box-ofnamefood">
                {orderData.order_items &&
                  orderData.order_items.map((item, index) => (
                    <p key={index}>{itemDetails[item.menu_item]?.name}</p>
                  ))}
              </div>
            </div>
            <div>
              <h4>Price</h4>
              <div className="box-Grouptxtintro box-ofpricefood">
                {orderData.order_items &&
                  orderData.order_items.map((item, index) => (
                    <p key={index}>{itemDetails[item.menu_item]?.price}</p>
                  ))}
              </div>
            </div>
            <div className="box-amount">
              <h4>Amount</h4>
              <div className="box-Grouptxtintro box-ofamountfood">
                {orderData.order_items &&
                  orderData.order_items.map((item, index) => (
                    <p key={index}>{item.quantity}</p>
                  ))}
              </div>
            </div>
          </div>
          <div className="box-groupPrice">
            <h4>TOTAL:</h4>
            <h4>
              {orderData.totalOrderPrice
                ? `$${orderData.totalOrderPrice.toFixed(2)}`
                : "N/A"}
            </h4>
          </div>

          <div className="box-groupLastfoot">
            <p>Placed on: {orderData.placedOn}</p>
            <p onClick={handleStatusClick}>
              Status:{" "}
              {isEditingStatus ? (
                <span>
                  <select value={newStatus} onChange={handleStatusChange}>
                    {steps.map((step, index) => (
                      <option key={index} value={step}>
                        {step}
                      </option>
                    ))}
                  </select>
                  <button onClick={handleStatusUpdate}>Update</button>
                </span>
              ) : (
                orderData.status
              )}
            </p>
            <p>Paid: {orderData.paid ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography
            sx={{
              mt: 2,
              mb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Center horizontally
              textAlign: "center", // Center text
            }}
          >
            <CheckCircle sx={{ color: "green", mr: 1 }} />{" "}
            <span>All this order is completed</span>
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pt: 2,
        }}
      >
        <Box sx={{ flex: "1 1 auto" }} />
        <div className="button-active">
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ justifyContent: "center" }}
          >
            Back
          </Button>
          <div className="btn-pending">
            {activeStep === 0 && (
              <Button className="btn-pending" onClick={handleNext}>
                Pending
              </Button>
            )}
          </div>
          <div className="btn-done">
            {activeStep === 1 && (
              <Button className="btn-done" onClick={handleNext}>
                Done
              </Button>
            )}
          </div>
          <div className="btn-active">
            {activeStep === 2 && (
              <Button className="btn-active" onClick={handleNext}>
                Active
              </Button>
            )}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleReset}
              disabled={activeStep !== steps.length}
            >
              Finish
            </Button>
          </Box>
        </div>
      </Box>
      <Menufooter />
    </div>
  );
};

export default Detailorder;
