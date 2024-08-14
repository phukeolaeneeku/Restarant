import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../ownerMenu/OwnerMenu";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCamera } from "react-icons/ci";
import {
  HiOutlineShoppingBag as HiMiniShoppingBag,
  HiPlus,
} from "react-icons/hi";
import imageicon from "../../../img/imageicon.jpg";
import "./addproduct1.css";
import Swal from "sweetalert2";

const Addproduct1 = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([
    {
      image: null,
      imagePreview: null,
      name: "",
      price: "",
      description: "",
      category: "",
    },
  ]);

  useEffect(() => {
    const storage = JSON.parse(window.localStorage.getItem("user"));
    fetchCategories(storage.restaurant_id);
  }, []);

  const fetchCategories = async (restaurant_id) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API
        }/restaurants/${restaurant_id}/categories/list/`
      );

      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleProductName = (e, index) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index].name = value;
    setProducts(updatedProducts);
  };

  const handleProductPrice = (e, index) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index].price = value;
    setProducts(updatedProducts);
  };

  const handleProductDescription = (e, index) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index].description = value;
    setProducts(updatedProducts);
  };

  const handleProductCategory = (e, index) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index].category = value;
    setProducts(updatedProducts);
  };

  const handleImage = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedProducts = [...products];
      updatedProducts[index].image = file;
      updatedProducts[index].imagePreview = URL.createObjectURL(file);
      setProducts(updatedProducts);
    }
  };

  const handleAdd = () => {
    setProducts([
      ...products,
      {
        image: null,
        imagePreview: null,
        name: "",
        price: "",
        description: "",
        category: "",
      },
    ]);
  };

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storage = JSON.parse(window.localStorage.getItem("user"));
    const restaurant_id = storage.restaurant_id;

    try {
      const requests = products.map(async (product) => {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("category", product.category);
        formData.append("restaurant", restaurant_id);

        if (product.image) {
          formData.append("image", product.image);
        }

        try {
          return await axios.post(
            `${
              import.meta.env.VITE_API
            }/restaurants/${restaurant_id}/menu_items/create/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } catch (error) {
          console.error(`Error adding product ${product.name}:`, error.message);
          throw error;
        }
      });

      await Promise.all(requests);

      // Clear form data after successful submission
      setProducts([
        {
          image: null,
          imagePreview: null,
          name: "",
          price: "",
          description: "",
          category: "",
        },
      ]);

      Swal.fire({
        icon: "success",
        title: "Products Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding products:", error.message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add products",
      });
    }
  };

  return (
    <>
      <AdminMenu />
      <div className="board_box_container01">
        <div className="title_header_orderBox1">
          <Link to="/itemfood2" className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
        </div>
        <div className="box_container_product2">
          <h3>Add Food</h3>
          <div className="filter22">
            <div></div>
            <h3>Food</h3>
          </div>
          <div className="group_container_product">
            <div onClick={handleAdd}>
              <div className="iconimage">
                <HiMiniShoppingBag id="icon_shoppingbag" />
                <HiPlus id="icon_goplus" />
              </div>
            </div>

            {products.map((product, index) => (
              <div key={index}>
                <div className="addProduct_box_content_afterThat">
                  <div
                    className="deleteBox_productconotent"
                    onClick={() => handleDelete(index)}
                  >
                    <AiOutlineDelete />
                  </div>
                  <div className="box_input-img-add">
                    {product.imagePreview ? (
                      <img src={product.imagePreview} alt="product" />
                    ) : (
                      <img src={imageicon} alt="default" />
                    )}
                    <input
                      type="file"
                      id={`img-${index}`}
                      onChange={(e) => handleImage(e, index)}
                      required
                    />
                  </div>
                  <div className="edit_images">
                    <label
                      htmlFor={`img-${index}`}
                      className="trigger_popup_fricc"
                    >
                      <CiCamera id="icon_ci_camera" />
                    </label>
                  </div>
                  <div className="box_container_image">
                    <div className="input-box2">
                      <div className="box">
                        <input
                          type="text"
                          placeholder="Name"
                          value={product.name}
                          onChange={(e) => handleProductName(e, index)}
                          required
                        />
                      </div>
                      <div className="box">
                        <input
                          type="text"
                          placeholder="Price"
                          value={product.price}
                          onChange={(e) => handleProductPrice(e, index)}
                          required
                        />
                      </div>
                      <div className="box">
                        <input
                          type="text"
                          placeholder="Description"
                          value={product.description}
                          onChange={(e) => handleProductDescription(e, index)}
                          required
                        />
                      </div>
                      <div className="box">
                        <select
                          className="select-text"
                          value={product.category}
                          onChange={(e) => handleProductCategory(e, index)}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="btn_submit_add2">
          <button className="button22" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Addproduct1;
