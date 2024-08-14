import "./css/mainpage.css";
import React, { useEffect, useState } from "react";
import Menubar from "./Menubar";
import Itemfood from "./Itemfood";
import logo1 from "../../img/Logo1.png";
import banner1 from "../../img/banner.png";
// import imageban from "../../img/image.png";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import imageicon from "../../img/imageicon.jpg";
//
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
const Mainpage = () => {
  
    //  //PopUp box Delete
    //  const [isPopupDelete, setPopupDelete] = useState(false);

    //  const handleDelete = () => {
    //      setPopupDelete(!isPopupDelete);
    //  };
 
    //  //PopUp box add image
    //  const [isPopupimage, setPopupimage] = useState(false);
 
    //  const togglePopupimage = () => {
    //      setPopupimage(!isPopupimage);
    //  };
 
    //  //PopUp box add name
    //  const [isPopupname, setPopupname] = useState(false);
 
    //  const togglePopupname = () => {
    //      setPopupname(!isPopupname);
    //  };
 
    //  //PopUp box add price
    //  const [isPopupprice, setPopupprice] = useState(false);
 
    //  const togglePopupprice = () => {
    //      setPopupprice(!isPopupprice);
    //  };
    //  //PopUp box add category
    //  const [isPopupcategory, setPopupcategory] = useState(false);
 
    //  const togglePopupcategory = () => {
    //      setPopupcategory(!isPopupcategory);
    //  };
    //  //PopUp box add description
    //  const [isPopupdescription, setPopupdescription] = useState(false);
 
    //  const togglePopupdescription = () => {
    //      setPopupdescription(!isPopupdescription);
    //  };
  return (
    <>
      <div>
        <div className="container_boxHeaderAt_mainpage">
          <div className="box_logo_main">
            {mainImageLogo && mainImageLogo.length > 0 ? (
              <img src={URL.createObjectURL(mainImageLogo[0])} alt="logo" />
            ) : (
              <img src={logo1} alt="logo" />
            )}

            <div className="iconnChangeImagelogo">
              <IoCamera onClick={togglePopuplogo} />
            </div>
          </div>
          <div className="box_heardOfGrooup_main">
            <div className="header_box_of_header-main">
              <div className="description_header-main">
                <h3>Name Restaurant</h3>
                <p>Description restaurant</p>
                <div className="iconnChangeImageEditname">
                  <FaPencil onClick={togglePopup} />
                </div>
                <div className="contact_head_Boxdetails-tel">
                  <div className="contact_head_Boxdetails2">
                    <div className="iconnDetails_head">
                      <FiPhone />
                    </div>
                    <p>+856 20 55 000 959</p>
                  </div>
                  <div className="contact_head_Boxdetails2">
                    <IoMdTime className="iconnDetails_head" />
                    <p>8:00 - 20:00</p>
                    <div className="iconEdit_time">
                      <FaPencil onClick={togglePopuptime} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="header_contact_details-main">
                <div className="contact_head_Boxdetails2">
                  <div className="all_star_box">
                    <IoIosStar className="iconstar_review adtiveStar" />
                    <IoIosStar className="iconstar_review adtiveStar" />
                    <IoIosStar className="iconstar_review adtiveStar" />
                    <IoIosStar className="iconstar_review" />
                    <IoIosStar className="iconstar_review" />
                  </div>
                  <p>29 Review</p>
                </div>
                <Link to="/reviews" className="switch_btn1">
                  View
                </Link>
              </div>
            </div>
            <div className="header_contact_details_box">
              <div className="header_contact_details-map">
                <div className="contact_head_Boxdetails-map">
                  <FiMapPin className="iconnDetails_head-map" />
                  <p>
                    131 Sapang Sisangvvone Road, Ban Naxay, Vientiane 0100 ลาว
                  </p>
                </div>
                <Link to="/addressMap" className="switch_btn2">
                  View
                </Link>
                <div className="iconEdit_map">
                  <FaPencil onClick={togglePopuptime} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container_boxHeaderAt_store">
        <div className="box_banner_content2">
          <div class="banner-container">
            {mainImageBanner && mainImageBanner.length > 0 ? (
              <img src={URL.createObjectURL(mainImageBanner[0])} alt="Banner" />
            ) : (
              <img src={banner1} alt="Banner" />
            )}
            <div class="camera-icon">
              <IoCamera onClick={togglePopupbanner} />
            </div>
          </div>

          
        </div>
      </div>

      <Itemfood />
      <Menubar />

      {/* Popup Edit Name and Des */}
      {isOpen && (
        <div className="background_popup_box">
          <div className="hover_popup_box">
            <div className="box_input-editname">
              <p>Store name</p>
              <input
                name="input1"
                value={inputValues.input1}
                onChange={handleInputChange}
                placeholder="Store name..."
                className="input_of_txtAddproduct"
              />

              <p>Store description</p>
              <input
                className="input_of_txtAddproduct"
                name="input2"
                placeholder="Store description"
                value={inputValues.input2}
                onChange={handleInputChange}
              />
            </div>
            <div className="btn_foasdf">
              <button className="btn_cancel2 " onClick={togglePopup}>
                CANCEL
              </button>
              <button className="btn_ok_alert" onClick={handleConfirmClick}>
                OK
              </button>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <p>{dialogContent}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>OK</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
     
      {/* Popup Edit Logo */}
      {isOpenlogo && (
        <form className="popup1">
          <div className="popup-content1">
            <div className="box_input_image">
              <h2>Add Logo image</h2>

              <div className="input-container2">
                {mainImageLogo && mainImageLogo.length > 0 ? (
                  <img src={URL.createObjectURL(mainImageLogo[0])} alt="logo" />
                ) : (
                  <img src={imageicon} alt="logo" />
                )}
              </div>
              <label className="popup_Border_Boximagae">
                <input
                 type="file"
                 id="img"
                 onChange={handleImageLogo}
                 required
                 name="input5"
                 accept="image/*" // Specify accepted file types, e.g., images
                />
                <IoImageOutline className="icon_cameraDp2" />
                <span className="file-upload-text">Choose Image...</span>
              </label>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopuplogo}
              >
                CANCEL
              </button>
              <button className="btn_confirm btn_addproducttxt_popup" onClick={handleConfirmClickLogo}>
                OK
              </button>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <p>{dialogContent}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>OK</Button>
              </DialogActions>
            </Dialog>
          </div>
        </form>
      )}
      {/* Popup Edit Banner */}
      {isOpenban && (
        <form className="popup1">
          <div className="popup-content1">
            <div className="box_input_image">
              <h2>Add banner mage</h2>

              <div className="input-container2">
                {mainImageBanner && mainImageBanner.length > 0 ? (
                  <img
                    src={URL.createObjectURL(mainImageBanner[0])}
                    alt="Banner"
                  />
                ) : (
                  <img src={imageicon} alt="Banner" />
                )}
              </div>

              <label className="popup_Border_Boximagae">
                <input
                  type="file"
                  id="img"
                  onChange={handleImageBanner}
                  required
                  name="input6"
                  accept="image/*" // Specify accepted file types, e.g., images
                />
                <IoImageOutline className="icon_cameraDp2" />
                <span className="file-upload-text">Choose Image...</span>
              </label>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopupbanner}
              >
                CANCEL
              </button>
              <button className="btn_confirm btn_addproducttxt_popup" onClick={handleConfirmClickLBanner}>
                OK
              </button>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <p>{dialogContent}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>OK</Button>
              </DialogActions>
            </Dialog>
          </div>
        </form>
      )}
      {/* Popup Edit Time */}
      {isOpentime && (
        <div className="background_popup_box-time">
          <div className="hover_popup_box-time">
            <div className="box_input-edittime">
              <h3>
                Enter your time open <br />
                restaurant
              </h3>
              <div className="box-time">
                <div className="box-store-time">
                  <input
                    name="input3"
                    type="time"
                    className="input_of_txtAddproduct"
                    value={inputValues.input3}
                    onChange={handleInputChange}
                  />
                </div>
                <h4>To</h4>
                <div className="box-store-time">
                  <input
                    name="input4"
                    type="time"
                    className="input_of_txtAddproduct"
                    value={inputValues.input4}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopuptime}
              >
                CANCEL
              </button>
              <button
                className="btn_confirm btn_addproducttxt_popup"
                onClick={handleConfirmClickTime}
              >
                OK
              </button>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <p>{dialogContent}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>OK</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
};

export default Mainpage;
