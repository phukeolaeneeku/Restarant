import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./editbanner.css";

const EditBanner = ({ banner, fieldToEdit, onSave, onCancel }) => {
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const [updatedBanner, setUpdatedBanner] = useState({ ...banner });
  const [imagePreview, setImagePreview] = useState(banner.logo || null);
  const [bannerImagePreview, setBannerImagePreview] = useState(
    banner.banner_image || null
  );

  useEffect(() => {
    setUpdatedBanner({ ...banner });
    setImagePreview(banner.logo || null);
    setBannerImagePreview(banner.banner_image || null);
  }, [banner]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setUpdatedBanner({ ...updatedBanner, [name]: files[0] });
      if (name === "logo") {
        setImagePreview(URL.createObjectURL(files[0]));
      } else if (name === "banner_image") {
        setBannerImagePreview(URL.createObjectURL(files[0]));
      }
    } else {
      setUpdatedBanner({ ...updatedBanner, [name]: value });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", updatedBanner.name);
    formData.append("description", updatedBanner.description);
    formData.append("phone", updatedBanner.phone);
    formData.append("time", updatedBanner.time);
    formData.append("address", updatedBanner.address);

    if (updatedBanner.logo instanceof File) {
      formData.append("logo", updatedBanner.logo);
    }
    if (updatedBanner.banner_image instanceof File) {
      formData.append("banner_image", updatedBanner.banner_image);
    }

    axios.patch(
      `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    })
      .then((result) => {
        if (result.isConfirmed) {
          onSave(); // Call onSave to refresh the data and close the modal
          Swal.fire("Saved!", "Your changes have been saved.", "success");
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        Swal.fire("Error!", "Failed to save changes.", "error");
      });
  };

  return (
    <div className="popup-overlay-edit">
      <div className="modal-content-edit">
        <h3>Edit {fieldToEdit}</h3>
        <form onSubmit={handleSave}>
          {fieldToEdit === "logo" && (
            <>
              <input
                className="edit-logo"
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="image-container">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                )}
              </div>
            </>
          )}
          {fieldToEdit === "bannerimage" && (
            <>
              <input
                className="edit-banner-image"
                type="file"
                name="banner_image"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="image-container">
                {bannerImagePreview && (
                  <img
                    src={bannerImagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                )}
              </div>
            </>
          )}
          {(fieldToEdit === "name" || fieldToEdit === "description") && (
            <>
              <input
                className="edit-name"
                type="text"
                name="name"
                value={updatedBanner.name}
                onChange={handleChange}
              />
              <h3>Edit Description</h3>
              <textarea
                className="edit-description"
                rows="5"
                name="description"
                value={updatedBanner.description}
                onChange={handleChange}
              />
            </>
          )}
          {(fieldToEdit === "phone" || fieldToEdit === "time") && (
            <>
              <input
                className="edit-phone"
                type="text"
                name="phone"
                value={updatedBanner.phone}
                onChange={handleChange}
              />
              <h3>Edit Time</h3>
              <input
                className="edit-time"
                type="text"
                name="time"
                value={updatedBanner.time}
                onChange={handleChange}
              />
            </>
          )}
          {fieldToEdit === "address" && (
            <textarea
              className="edit-address"
              rows="5"
              name="address"
              value={updatedBanner.address}
              onChange={handleChange}
            />
          )}
          <div className="button-group-edit">
            <button className="btn-save-edit-res">Save</button>
            <button
              className="btn-cancel-edit-res"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBanner;
