import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { IoCamera } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import AdminMenu from "../ownerMenu/OwnerMenu";
import axios from "axios";
import Editfood from "./Editfood";
import "./itemfood1.css";
import Bannerres from "./Bannerres";


function Itemfood() {
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [products, setProducts] = useState([]);
  const storage = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    if (storage && storage.restaurant_id) {
      fetchMenuItems();
    } else {
      console.error("No restaurant ID found in local storage.");
    }
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/menu_items/list/`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleEdit = (food, field) => {
    setSelectedFood({ ...food });
    setFieldToEdit(field);
    setShowEditModal(true);
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/menu_items/${productId}/delete/`
          )
          .then(() => {
            setProducts(products.filter((product) => product.id !== productId));
            Swal.fire("Deleted!", "The item has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
          });
      }
    });
  };

  const handleSave = async () => {
    await fetchMenuItems(); // Refresh the data
    setShowEditModal(false); // Close the modal
  };

  return (
    <>
      <AdminMenu />
      <div className="box-menu-owner">
        <div className="food_container_box-main111">
          <div className="">
            <Bannerres />
          </div>
          <div className="poster_food-mainpage">
            <div className="filter2">
              <div></div>
              <h3>Food</h3>
            </div>
            <div>
              <Link to="/addproduct1" className="add_food_btn">
                <p>Add food</p>
              </Link>
            </div>
          </div>
          <div className="box_itemFood_container_main11">
            <div className="container">
              {products.map((product) => (
                <div className="box_itemFood-main" key={product.id}>
                  <div className="box_itemFood_item_main">
                    <img
                      className="image-pv-item"
                      src={product.image}
                      alt={product.name}
                      onClick={() => setSelectedFood(product)}
                    />
                    <div
                      className="deleteBox_productcontent"
                      onClick={() => handleDelete(product.id)}
                    >
                      <AiOutlineDelete />
                    </div>
                    <div className="icon_cameraDp22">
                      <IoCamera
                        onClick={() => handleEdit(product, "image")}
                      />
                    </div>
                    <div className="txt_boxDescription3">
                      <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <div className="edit-icon-name">
                          <FaPencil
                            onClick={() => handleEdit(product, "name")}
                          />
                        </div>
                      </div>
                      <div className="product-info">
                        <p className="product-price">Price: ${product.price}</p>
                        <div className="edit-icon-price">
                          <FaPencil
                            onClick={() => handleEdit(product, "price")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showEditModal && (
          <Editfood
            selectedFood={selectedFood}
            fieldToEdit={fieldToEdit}
            onCancel={() => setShowEditModal(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );
}

export default Itemfood;
