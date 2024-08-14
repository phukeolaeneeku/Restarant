import "./ownerMenu.css";
import { IoDocumentText, IoLogOutOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { LiaUserCogSolid } from "react-icons/lia";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSell } from "react-icons/md";
import Logo1 from "../../../img/Logo1.png";
import { NavLink } from "react-router-dom";
import userimage from "../../../img/userImage.png";
import { CiCamera } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imageicon from "../../../img/imageicon.jpg";
import axios from "axios";
import { CiBank } from "react-icons/ci";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Swal from "sweetalert2";
import HomeIcon from "@mui/icons-material/Home";
import no_picture from "../../../img/no-picture-icon.jpg";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link } from "react-router-dom";
import { HiOutlineLogin } from "react-icons/hi";

const OwnerMenu = () => {
  const [banners, setBanners] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const storage = JSON.parse(window.localStorage.getItem("user"));
  var restaurant_id = false;
  if (localStorage.getItem("user")) {
    restaurant_id = JSON.parse(
      window.localStorage.getItem("user")
    ).restaurant_id;
  }

  var is_admin = false;
  if (localStorage.getItem("user")) {
    is_admin = JSON.parse(window.localStorage.getItem("user")).is_admin;
  }
  const [logo, set_logo] = useState(null);
  const [image, set_image] = useState(null);
  const [mainImageLogo, setMainImagLogo] = useState(null);
  const [restaurant, setRestaurant] = useState({
    name: "",
    logo: "",
    address: "",
    banner_image: "",
    phone: "",
    description: "",
    time: "",
  });
  // Choose logo image
  const [isPopupImageLogo, setPopupImageLogo] = useState(false);

  const togglePopupImageLogo = () => {
    setPopupImageLogo(true);
  };

  const togglePopupCancelImageLogo = () => {
    setPopupImageLogo(false);
  };

  useEffect(() => {
    let data = JSON.stringify({
      token: token,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/check-token",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data);
        if (response.data.result != "success") {
          localStorage.clear();

          navigate("/logino");
          return;
        }
      })
      .catch((error) => {
        localStorage.clear();
        console.log(error);
        navigate("/logino");
        return;
      });
  }, [token]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/store/web-info",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        set_logo(response.data[0].logo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [logo]);

  ///Choose image handleImageLogo
  const handleImageLogo = (e) => {
    const file = e.target.files[0];
    set_image(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImagLogo([file]);
      };

      reader.readAsDataURL(file);
    }
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic to log out the user goes here
        performLogout();
        Swal.fire("Logged Out!", "You have been logged out.", "success");
      }
    });
  };

  const performLogout = () => {
    localStorage.clear();
    navigate("/logino");
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowConfirmation(false);
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  const ChangeLogo = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("logo", image);

    const requestOptions = {
      method: "PATCH",
      body: formdata,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + `/store/web-info/2`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("Update Logo image sussessful.");
        setPopupImageLogo(false);
        window.location.reload(false);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getRestaurantDetails();
  }, []);
  const getRestaurantDetails = () => {
    axios
      .get(`${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/`)
      .then((response) => {
        const { name, logo, address, banner_image, phone, description, time } =
          response.data;

        // Ensure that if any field is missing or undefined, it defaults to an empty string
        const updatedRestaurant = {
          name: name || "",
          logo: logo || "",
          address: address || "",
          banner_image: banner_image || "",
          phone: phone || "",
          description: description || "",
          time: time || "",
        };

        setRestaurant(updatedRestaurant);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  };
  return (
    <>
      <section id="dashboard">
        <div className="left">
          <div className="menu">
            {is_admin === true && (
              <>
                {/* <NavLink to="/board" className="link">
                  <RxDashboard />
                  <p>Dashboard</p>
                </NavLink> */}
                <NavLink to="/restaurant_admin" className="link">
                  <StorefrontIcon />
                  <p>Restaurant</p>
                </NavLink>
              </>
            )}
            {restaurant_id && (
              <>
                <NavLink to="/dashboard" className="link">
                  <HomeIcon />
                  <p>Home</p>
                </NavLink>
                <NavLink to="/board" className="link">
                  <RxDashboard />
                  <p>Dashboard</p>
                </NavLink>
                <NavLink to="/table" className="link">
                  <TableRestaurantIcon />
                  <p>Table</p>
                </NavLink>
                <NavLink to="/category" className="link">
                  <MenuBookIcon />
                  <p>Category</p>
                </NavLink>
                <NavLink to="/employee" className="link">
                  <LiaUserCogSolid />
                  <p>Employee</p>
                </NavLink>
              </>
            )}

            <div onClick={handleLogout} className="link">
              <IoLogOutOutline />
              <p>Log Out</p>
            </div>
          </div>

          <div className="right">
            <div className="box_popupImage_logo">
              <NavLink to="/home" className="logo22">
                <div className="go_backPage"><HiOutlineLogin />Go back</div>
                <img src={restaurant.logo || no_picture} alt="logo" />
                <h3>{restaurant.name}</h3>
              </NavLink>

              {isPopupImageLogo && (
                <form
                  className="background_addproductpopup_box"
                  onSubmit={ChangeLogo}
                >
                  <div className="hover_addproductpopup_box_image">
                    <div className="box_input_image">
                      <p>Edit Logo image</p>
                      <label className="popup_Border_Boximagae">
                        {mainImageLogo && mainImageLogo.length > 0 ? (
                          <img
                            src={URL.createObjectURL(mainImageLogo[0])}
                            alt="category"
                          />
                        ) : (
                          <img src={imageicon} alt="category" />
                        )}
                        <input
                          type="file"
                          id="img"
                          onChange={handleImageLogo}
                          required
                        />
                        <p className="box_choose_image">Choose img</p>
                      </label>
                    </div>
                    <div className="btn_foasdf">
                      <button
                        className="btn_cancel btn_addproducttxt_popup"
                        onClick={togglePopupCancelImageLogo}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn_confirm btn_addproducttxt_popup"
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
            <div className="boximage_admin">
              <NavLink to="#" className="userAdminImage">
                <p>{storage.email}</p>
                <img src={storage.image} />
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OwnerMenu;
