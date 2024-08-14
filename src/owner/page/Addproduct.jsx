import React, { useState } from "react";
import Menufooter from "./Menubar";
import { Link } from "react-router-dom";
import "react-sweet-progress/lib/style.css";
import "./css/addproduct.css";
import "react-sweet-progress/lib/style.css";
import { IoIosArrowBack } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import axios from "axios";

// import backgroundProduct from "../../img/backgroundProduct.jpg";
import imageicon from "../../img/imageicon.jpg";

import { AiOutlineDelete } from "react-icons/ai";
import { CiCamera } from "react-icons/ci";
import {
  HiOutlineShoppingBag as HiMiniShoppingBag,
  HiPlus,
} from "react-icons/hi";

const Addproduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  };
  const togglePopup3 = () => {
    setIsOpen3(!isOpen3);
  };

  const [products, setProducts] = useState([
    {
      mainImage: null,
      productName: "",
      price: "",
      popular: false,
    },
  ]);

  const handleProductName = (e, index) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index].productName = value;
    setProducts(updatedProducts);
  };

  const handleProductPrice = (e, index) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index].price = value;
    setProducts(updatedProducts);
  };

  const handleProductCategory = (event, index) => {
    const checked = event.target.checked;
    const updatedProducts = [...products];
    updatedProducts[index].popular = checked;
    setProducts(updatedProducts);
  };

  // Popup Edit Banner Image
  const [isOpenban, setIsOpenban] = useState(false);
  const togglePopupbanner = () => {
    setIsOpenban(!isOpenban);
  };
  const [mainImageBanner, setMainImageBanner] = useState(null);

  ///Choose image handleImageBanner
  const handleImageBanner = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImageBanner([file]);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleImage = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProducts = [...products];
        updatedProducts[index].mainImage = reader.result;
        setProducts(updatedProducts);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    setProducts([
      ...products,
      {
        mainImage: null,
        productName: "",
        price: "",
        category: "",
        popular: false,
      },
    ]);
  };

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    products.forEach((product, index) => {
      console.log("Product:", product);
      formData.append(`name${index}`, product.productName);
      formData.append(`price${index}`, product.price);
      formData.append(`popular${index}`, product.popular ? "Yes" : "No");
      if (product.mainImage) {
        formData.append(`image${index}`, product.mainImage);
      }
    });
    console.log("FormData:", formData);
  };

  return (
    <div className="addpro_box_container">
      <div className="title_header_orderBox">
        <Link to="/mainpage" className="back_orderBox">
          <IoIosArrowBack className="icon_closeReviwe" />
          Back
        </Link>
      </div>
      <div className="box_container_product">
        <h3>Add and Edit</h3>
        <div className="filter">
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
                  {product.mainImage ? (
                    <img src={product.mainImage} alt="product" />
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
                  <div className="input-box">
                    <div className="box">
                      <input
                        type="text"
                        placeholder="Name"
                        value={product.productName}
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
                        placeholder="Category"
                        value={product.category}
                        onChange={(e) => handleProductCategory(e, index)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isOpen && (
            <div className="background_addproductpopup_box2">
              <div className="hover_addproductpopup_box2">
                <div className="box_input2">
                  <p>Add product name</p>
                  <input
                    type="text"
                    placeholder="Name..."
                    className="input_of_txtAddproduct"
                  />
                </div>
                <div className="btn_foasdf">
                  <button
                    className="btn_cancel btn_addproducttxt_popup"
                    onClick={togglePopup}
                  >
                    CANCEL
                  </button>
                  <button className="btn_confirm btn_addproducttxt_popup">
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}

          {isOpen2 && (
            <div className="background_addproductpopup_box2">
              <div className="hover_addproductpopup_box2">
                <div className="box_input2">
                  <p>Add product price</p>
                  <input
                    type="text"
                    placeholder="Price..."
                    className="input_of_txtAddproduct"
                  />
                </div>
                <div className="btn_foasdf">
                  <button
                    className="btn_cancel btn_addproducttxt_popup"
                    onClick={togglePopup2}
                  >
                    CANCEL
                  </button>
                  <button className="btn_confirm btn_addproducttxt_popup">
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
          {isOpen3 && (
            <div className="background_addproductpopup_box2">
              <div className="hover_addproductpopup_box2">
                <div className="box_input2">
                  <p>Add product category</p>
                  <input
                    type="text"
                    placeholder="category..."
                    className="input_of_txtAddproduct"
                  />
                </div>
                <div className="btn_foasdf">
                  <button
                    className="btn_cancel btn_addproducttxt_popup"
                    onClick={togglePopup3}
                  >
                    CANCEL
                  </button>
                  <button className="btn_confirm btn_addproducttxt_popup">
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="btn_submit_add">
        <button className="button" type="submit" onClick={handleSubmit}>
          Save
        </button>
      </div>

      <Menufooter />
    </div>
  );
};

export default Addproduct;
