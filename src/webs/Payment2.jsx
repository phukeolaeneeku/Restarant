import React, { useState } from "react";
import "./css/payment2.css";
import { Link } from "react-router-dom";
import Menufooter2 from "../webs/Menufooter2";
import { IoIosArrowBack } from "react-icons/io";
import imagebcel from "../img/imagebcel.png";
import { IoMdCopy } from "react-icons/io";
import imageicon from "../img/imageicon.jpg";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
function Payment2() {
  const [mainImageBanner, setMainImageBanner] = useState(null);
  const handleImageLogo = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImageBanner([file]);
      };

      reader.readAsDataURL(file);
    }
  };
  const [showPopup, setShowPopup] = useState(false);

  const togglePopupdialog = () => {
    setShowPopup(!showPopup);
  };
  const [showPopupOk, setShowPopupOk] = useState(false);
  const togglePopupdialogok = () => {
    setShowPopupOk(!showPopupOk);
  };
  const handleOK = () => {
    window.location.href = "/order2";
  };

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        togglePopupdialogok(); // Assuming togglePopupdialogok toggles the dialog visibility
        setTimeout(() => {
          togglePopupdialog(); // Close the popup after another 2000 milliseconds
        }, 0);
      }, 2000);
    }
  };
  return (
    <>
      <Menufooter2 />
      <div className="continer-payment">
        <div className="title_header_orderBox">
          <Link to="/homepage2" className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
          <h3>Payment</h3>
        </div>
        <div className="Box-header-payment">
          <h4>+ Address</h4>
        </div>
        <Link to="/address2">
          <div className="Box-continer-payment">
            <h4>Address:...</h4>
          </div>
        </Link>
        <div className="text-detail">
          <h4>Detail:</h4>
        </div>
        <div className="Box-continer-payment2">
          <div className="count_continer-payment2">
            <div className="count_box_item_payment">
              <p>Quantity:</p>
              <p>2</p>
            </div>
            <div className="count_box_item_payment">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="count_box_item_payment">
              <p>Total:</p>
              <p>240,000 KIP</p>
            </div>
          </div>
        </div>
        <div className="text-account">
          <div className="text_account_payment">
            <p>Please transfer money to this account</p>
          </div>
          <div className="text_account_payment_all">
            <img src={imagebcel} alt="" className="img-icon" />
            <div className="text_account_payment2">
              <p>Account number</p>
              <p>123456789</p>
            </div>
            <IoMdCopy className="icon_coppy" />
          </div>
          <p className="text-red">Please attach proof of money transfer!</p>
          <div className="Box-image">
            <div className="box_input_img">
              {mainImageBanner && mainImageBanner.length > 0 ? (
                <img src={URL.createObjectURL(mainImageBanner[0])} alt="img" />
              ) : (
                <img src={imageicon} alt="img" />
              )}
            </div>
            <label className="btn-image">
              <input type="file" id="img" onChange={handleImageLogo} required />

              <span>+ Image</span>
            </label>
          </div>
        </div>
        <div className="button-con-pay">
          <Link className="btn_confirm_payment" onClick={togglePopupdialog}>
            Confirm
          </Link>
        </div>
      </div>
      {showPopup && (
        <div className="background_popup_dialog">
          <div className="hover_popup_dialog">
            <div className="box_input_dialog">
              <Box
                sx={{
                  m: 2.5,
                  position: "relative",
                  display: "inline-flex", // Use inline-flex to keep Fab and CircularProgress on the same line
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Fab
                  aria-label="save"
                  color="primary"
                  sx={{
                    ...buttonSx,
                    width: "70px",
                    height: "70px",
                    transition: "transform 0.2s ease-in-out", // Add smooth transition
                    "&:hover": {
                      transform: "scale(1.1)", // Scale up on hover
                    },
                  }}
                >
                  {success ? (
                    <CheckIcon fontSize="large" />
                  ) : (
                    <ErrorOutlineIcon fontSize="large" />
                  )}
                </Fab>
                {loading && (
                  <CircularProgress
                    size={80}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>
              <h3>Are you sure?</h3>
              <p>You want to order this</p>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopupdialog}
              >
                CANCEL
              </button>
              <button
                className="btn_confirm btn_addproducttxt_popup"
                variant="contained"
                sx={buttonSx}
                disabled={loading}
                onClick={handleButtonClick}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopupOk && (
        <div className="background_popup_dialog3">
          <div className="hover_popup_dialog3">
            <div className="box_input_dialog3">
              {/* <img src={Alert} alt="logo"></img> */}
              <Box
                sx={{
                  m: 6,
                  position: "relative",
                  display: "inline-flex", // Use inline-flex to keep Fab and CircularProgress on the same line
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Fab
                  aria-label="save"
                  color="primary"
                  sx={{
                    ...buttonSx,
                    width: "70px",
                    height: "70px",
                    // marginRight: "16px", // Add margin between Fab and CircularProgress
                  }}
                >
                  {success ? (
                    <CheckIcon fontSize="large" />
                  ) : (
                    <ErrorOutlineIcon fontSize="large" />
                  )}
                </Fab>
                {loading && (
                  <CircularProgress
                    size={80}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>

              <h3>Your Order</h3>
              <p>Your order has been accepted</p>
              {/*  */}
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_confirm btn_addproducttxt_popup"
                onClick={handleOK}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Payment2;
