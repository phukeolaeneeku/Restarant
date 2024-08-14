import React from "react";
import "./css/profile.css";
import { MdDelete } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { IoKeySharp } from "react-icons/io5";
import { TfiCalendar } from "react-icons/tfi";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menufooter from "../components/Menufooter";
import icon_profile from "../img/icon_profile.jpg";

export const Profile = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);

  // const storage = JSON.parse(window.localStorage.getItem("user"));
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/logino");
    return;
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowConfirmation(false);
  };
  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteAccount();
    setShowConfirmationDelete(false);
  };
  const handleCancelDelete = () => {
    setShowConfirmationDelete(false);
  };

  const user = localStorage.getItem("user");

  //Function Delete
  const handleDeleteAccount = async () => {
    try {
      const config = {
        method: "delete",
        url: `${import.meta.env.VITE_API}/user/my-page`, // Assuming your API URL is stored in environment variables
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
      };

      const response = await axios(config);
      if (response.status === 204) {
        // Account deleted successfully
        alert("Account deleted successfully");
        console.log("Account deleted successfully");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        // Perform any other actions (e.g., redirect to home page)
      } else {
        console.error("Failed to delete account:", response.data.message);
        alert("Failed to delete account:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <Menufooter />
      <div className="MorePage">
        <div className="box_icon_back">
          <div className="Box_haed_management">
            <h3>Account Settings</h3>
          </div>
        </div>

        <div className="profile_box">
          <div className="left_box">
            {JSON.parse(window.localStorage.getItem("user")).image != false ? (
              <img
                src={JSON.parse(window.localStorage.getItem("user")).image}
                alt=""
              />
            ) : (
              <img src={icon_profile} alt="" />
            )}
            <div className="user_name">
              Name:{" "}
              {JSON.parse(window.localStorage.getItem("user")).user_name ||
                null}
            </div>
          </div>
          <Link to="#" className="right_box">
            <button>View</button>
          </Link>
        </div>
        <hr className="hr" />
        <div className="more-menu-list">
          <div onClick={() => setShowConfirmation(true)} className="menu_icon">
            <IoLogOutOutline id="icon_more" />
            <p>Log out </p>
          </div>

          {showConfirmation && (
            <div className="box_background_delete">
              <div className="hover_delete_box">
                <div className="box_logout">
                  <p>Are you sure you want to log out?</p>
                </div>
                <div className="btn_foasdf">
                  <button
                    className="btn_cancel btn_addproducttxt_popup"
                    onClick={handleCancelLogout}
                  >
                    No
                  </button>
                  <button
                    className="btn_confirm btn_addproducttxt_popup"
                    onClick={handleConfirmLogout}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          <hr className="hr" />
          <div
            className="menu_icon"
            onClick={() => setShowConfirmationDelete(true)}
          >
            <MdDelete id="icon_more" />
            <p>Delete account</p>
          </div>

          {showConfirmationDelete && (
            <div className="box_background_delete">
              <div className="hover_delete_box">
                <div className="box_logout">
                  <p>Are you sure you want to delete?</p>
                </div>
                <div className="btn_foasdf">
                  <button
                    className="btn_cancel btn_addproducttxt_popup"
                    onClick={handleCancelDelete}
                  >
                    No
                  </button>
                  <button
                    className="btn_confirm btn_addproducttxt_popup"
                    onClick={handleConfirmDelete}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          <hr className="hr" />
        </div>
      </div>
    </>
  );
};
export default Profile;
