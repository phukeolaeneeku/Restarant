import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import "./css/add_restaurant.css";

const Add_Restaurant = () => {
  const [addRestaurantData, setAddRestaurantData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    time: "",
    logo: null,
    banner_image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddRestaurantData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setAddRestaurantData((prevState) => ({
        ...prevState,
        logo: file,
      }));
    }
  };
  const handleImageChange2 = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setAddRestaurantData((prevState) => ({
        ...prevState,
        banner_image: file,
      }));
    }
  };

  // const handleMultipleImageChange = (e) => {
  //   if (e.target.files) {
  //     const filesArray = Array.from(e.target.files);
  //     const previewsArray = filesArray.map((file) => URL.createObjectURL(file));

  //     setImagePreviews((prevPreviews) => prevPreviews.concat(previewsArray));
  //     setAddRestaurantData((prevState) => ({
  //       ...prevState,
  //       logo: prevState.logo.concat(filesArray),
  //     }));

  //     e.target.value = null;
  //   }
  // };

  const removeImage = (index) => {
    const newImages = addRestaurantData.logo.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setAddRestaurantData((prevState) => ({
      ...prevState,
      logo: newImages,
    }));
    setImagePreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", addRestaurantData.name);
    formData.append("description", addRestaurantData.description);
    formData.append("address", addRestaurantData.address);
    formData.append("phone", addRestaurantData.phone);
    formData.append("time", addRestaurantData.time);
    formData.append("logo", addRestaurantData.logo);
    formData.append("banner_image", addRestaurantData.banner_image);
    // addRestaurantData.images.forEach((img, i) => {
    //   formData.append(`images[${i}]`, img);
    // });

    const config = {
      method: "post",
      url: import.meta.env.VITE_API + `/user/signup-restaurant`,

      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        setAddRestaurantData({
          name: "",
          description: "",
          address: "",
          phone: "",
          time: "",
          logo: null,
          banner_image: null,
        });

        setSelectedImage(null);
        setImagePreviews([]);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Hotel added successfully!",
        });
      })
      .catch((error) => {
        console.error(error);

        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add hotel. Please try again later.",
        });
      });
  };
  return (
    <>
      <OwnerMenu />
      <section id="post">
        <div className="box_container_add_res">
          <h2>Add Restaurant</h2>
          <div className="submit1">
            <button>Post</button>
          </div>
          <form className="edit-res-forms" onSubmit={handleSubmit}>
            <div className="input-imggg">
              <div className="box_description2">
                <h3>Image</h3>
                <div className="images_logo">
                  <img src={selectedImage} alt="img" />
                  <div
                    className="box_chooses_imageee"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Choose image
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="gallery2">
                <h3>BannerImage</h3>
                <div className="gallery-box2">
                  <div
                    className="add-more"
                    onClick={() => document.getElementById("fileInput").click()}
                  ></div>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleImageChange2}
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
                  value={addRestaurantData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone..."
                  value={addRestaurantData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address..."
                  value={addRestaurantData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <label htmlFor="time">Time</label>
                <input
                  type="text"
                  name="time"
                  placeholder="Time..."
                  value={addRestaurantData.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  rows="10"
                  placeholder="Description..."
                  value={addRestaurantData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Add_Restaurant;
