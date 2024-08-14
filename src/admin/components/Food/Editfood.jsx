import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./editfood.css";

const Editfood = ({ selectedFood, onCancel, fieldToEdit, onSave }) => {
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const [imagePreview, setImagePreview] = useState(null);
  const [editedFood, setEditedFood] = useState({
    id: selectedFood.id,
    name: selectedFood.name,
    price: selectedFood.price,
    image: null,
  });

  useEffect(() => {
    setImagePreview(selectedFood.image);
  }, [selectedFood.image]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setEditedFood({ ...editedFood, [name]: e.target.files[0] });
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setEditedFood({ ...editedFood, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editedFood.name);
      formData.append("price", editedFood.price);
      if (editedFood.image) {
        formData.append("image", editedFood.image);
      }
      await axios.patch(
        `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
        }/menu_items/${editedFood.id}/update/`,
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
      }).then((result) => {
        if (result.isConfirmed) {
          onSave(); // Call onSave to refresh the data and close the modal
          Swal.fire("Saved!", "Your changes have been saved.", "success");
        }
      });
    } catch (error) {
      console.error("Error updating food:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "An error occurred while updating the food item.",
      });
    }
  };

  return (
    <div className="popup-overlay-editfood">
      <div className="modal-content-editfood">
        <h3>Edit {fieldToEdit}</h3>
        <form onSubmit={handleSubmit}>
          {fieldToEdit === "image" && (
            <>
              <input
                className="edit-logo"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="image-container-editfood">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview2"
                  />
                )}
              </div>
            </>
          )}

          {fieldToEdit === "name" && (
            <>
              <input
                className="edit-name"
                type="text"
                name="name"
                value={editedFood.name}
                onChange={handleChange}
              />
            </>
          )}

          {fieldToEdit === "price" && (
            <>
              <input
                className="edit-price"
                type="text"
                name="price"
                value={editedFood.price}
                onChange={handleChange}
              />
            </>
          )}

          <div className="button-group-editfood">
            <button className="btn-save-editfood" >
              Save
            </button>
            <button
              className="btn-cancel-editfood"
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

export default Editfood;
