import React, { useState, useEffect } from "react";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./css/edit_restaurant.css";

const Edit_restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate hook
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [logo, setLogo] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [newBannerImageFile, setNewBannerImageFile] = useState(null);

  useEffect(() => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/restaurants/${id}/`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setName(response.data.name);
        setAddress(response.data.address);
        setPhone(response.data.phone);
        setTime(response.data.time);
        setDescription(response.data.description);
        setLogo(response.data.logo);
        setBannerImage(response.data.banner_image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file); // Set the file for new logo image
      setLogo(URL.createObjectURL(file)); // Set the preview for the new logo image
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBannerImageFile(file); // Set the file for new banner image
      setBannerImage(URL.createObjectURL(file)); // Set the preview for the new banner image
    }
  };

  const updateRestaurant = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("time", time);
    formData.append("description", description);

    if (newImageFile) {
      formData.append("logo", newImageFile); // Append new main image if it exists
    }

    if (newBannerImageFile) {
      formData.append("banner_image", newBannerImageFile); // Append new banner image if it exists
    }

    try {
      await axios.patch(
        import.meta.env.VITE_API + `/restaurants/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Restaurant updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Clear the form data
        setName("");
        setPhone("");
        setDescription("");
        setTime("");
        setAddress("");
        setLogo(null);
        setNewImageFile(null);
        setBannerImage(null);
        setNewBannerImageFile(null);

        // Navigate back to the previous page
        navigate(-1);
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the restaurant.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(
        "There was an error updating the restaurant:",
        error.response.data
      );
    }
  };

  return (
    <>
      <OwnerMenu />
      <section id="post">
        <div className="box_container_product">
          <h2>Edit Restaurant</h2>
          <div className="submit1">
            <button onClick={updateRestaurant}>Update</button>
          </div>
          <form className="edit-product-forms" encType="multipart/form-data">
            <div className="input-img">
              <div className="box_description">
                <h3>Image</h3>
                <div className="images">
                  {logo && <img src={logo} alt="Selected" />}
                  <div
                    className="box_chooses_image"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Choose image
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleLogoChange}
                  />
                </div>
              </div>
              <div className="gallery">
                <h3>Banner Images</h3>
                <div className="gallery-box">
                  {bannerImage && <img src={bannerImage} alt="Selected" />}
                  <div
                    className="box_chooses_image2"
                    onClick={() =>
                      document.getElementById("fileInput2").click()
                    }
                  >
                    Choose image
                  </div>
                  <input
                    type="file"
                    id="fileInput2"
                    style={{ display: "none" }}
                    onChange={handleBannerImageChange}
                  />
                </div>
              </div>
            </div>

            <div className="form_input_box">
              <div className="input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone..."
                />
              </div>
              <div className="input">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address..."
                />
              </div>
              <div className="input">
                <label htmlFor="time">Time</label>
                <input
                  type="text"
                  name="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Time..."
                />
              </div>

              <div className="input">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  rows="10"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description..."
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Edit_restaurant;
