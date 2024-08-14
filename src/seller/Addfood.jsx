import React, { useState } from "react";
import "./css/addfood.css";
import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { TbBasketPlus } from "react-icons/tb";
import { IoCamera } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import backgroundProduct from "../img/backgroundProduct.jpg";

function Addfood() {
  const [val, setVal] = useState([]);

  const handleAdd = () => {
    const abc = [...val, []];
    setVal(abc);
  };

  const handleDelete = (i) => {
    const deletVal = [...val];
    deletVal.splice(i, 1);
    setVal(deletVal);
  };

  //PopUp box add image
  const [isPopupimage, setPopupimage] = useState(false);

  const togglePopupimage = () => {
    setPopupimage(!isPopupimage);
  };

  //PopUp box add name
  const [isPopupname, setPopupname] = useState(false);

  const togglePopupname = () => {
    setPopupname(!isPopupname);
  };

  //PopUp box add price
  const [isPopupprice, setPopupprice] = useState(false);

  const togglePopupprice = () => {
    setPopupprice(!isPopupprice);
  };
  //PopUp box add category
  const [isPopupcategory, setPopupcategory] = useState(false);

  const togglePopupcategory = () => {
    setPopupcategory(!isPopupcategory);
  };
  //PopUp box add description
  const [isPopupdescription, setPopupdescription] = useState(false);

  const togglePopupdescription = () => {
    setPopupdescription(!isPopupdescription);
  };

  return (
    <div>
      <div className="container_boxHeader_seller">
        <div className="box_header_goback">
          <Link to="/homeSeller">
            <IoChevronBack className="icon_GoBack" />
          </Link>
          <h3>Add food</h3>
          <div></div>
        </div>
        <div className="box_secoundfof">
          <div className="box_addfood_containerr">
            <div className="poster_food">
              <div></div>
              <h3>Food</h3>
            </div>
            <Link
              to="#"
              className="boxAdd_food_btn"
              onClick={() => handleAdd()}
            >
              <div className="asdasd">
                <TbBasketPlus className="icon_AddfoodBtn" />
              </div>
              <p>Add food</p>
            </Link>
          </div>
          {val.map((i) => {
            return (
              <div className="box_itemFood">
                <div className="box_itemFood_item">
                  <div className="box_iamgeFood">
                    <div
                      className="manage_btnEditStore_delete_btnIcon"
                      onClick={() => handleDelete(i)}
                    >
                      <AiOutlineDelete className="icondelete_store" />
                    </div>
                    <img src={backgroundProduct} alt="" />
                    <div className="div_ofBoxCamera" onClick={togglePopupimage}>
                      <IoCamera className="icon_cameraDp" />
                    </div>
                    {/* PopUp box add image food */}
                    {isPopupimage && (
                      <form className="background_addproductpopup_box">
                        <div className="hover_addproductpopup_box">
                          <div className="divsdfsdsf">
                            <p>Image</p>
                            <label className="popup_Border_Boximagae">
                              <input type="file" name="image" />
                            </label>
                          </div>
                          <div className="btn_foasdf">
                            <button
                              className="btn_cancel btn_addproducttxt_popup"
                              onClick={togglePopupimage}
                            >
                              Cancel
                            </button>
                            <Link
                              to="#"
                              className="btn_confirm btn_addproducttxt_popup"
                              onClick={togglePopupimage}
                            >
                              OK
                            </Link>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="txt_boxDescriptionAddfood">
                    <p>Name</p>
                    <p>Price</p>
                    <p>Category</p>
                    <p>Decription</p>
                  </div>
                </div>

                <div className="icon_editFood_each">
                  <Link
                    to="#"
                    className="manage_btnEditStore"
                    onClick={togglePopupname}
                  >
                    <FaPencil className="iconEdit_store" />
                  </Link>
                  {isPopupname && (
                    <form className="background_addproductpopup_box">
                      <div className="hover_addproductpopup_box">
                        <div className="divsdfsdsf">
                          <p>Add product name</p>
                          <input
                            type="text"
                            placeholder="Product name..."
                            className="input_of_txtAddproduct"
                          />
                        </div>
                        <div className="btn_foasdf">
                          <button
                            className="btn_cancel btn_addproducttxt_popup"
                            onClick={togglePopupname}
                          >
                            Cancel
                          </button>
                          <button className="btn_confirm btn_addproducttxt_popup">
                            OK
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                  <Link
                    to="#"
                    className="manage_btnEditStore"
                    onClick={togglePopupprice}
                  >
                    <FaPencil className="iconEdit_store" />
                  </Link>
                  {isPopupprice && (
                    <form className="background_addproductpopup_box">
                      <div className="hover_addproductpopup_box">
                        <div className="divsdfsdsf">
                          <p>Add product price</p>
                          <input
                            type="text"
                            placeholder="Product price..."
                            className="input_of_txtAddproduct"
                          />
                        </div>
                        <div className="btn_foasdf">
                          <button
                            className="btn_cancel btn_addproducttxt_popup"
                            onClick={togglePopupprice}
                          >
                            Cancel
                          </button>
                          <button className="btn_confirm btn_addproducttxt_popup">
                            OK
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                  <Link
                    to="#"
                    className="manage_btnEditStore"
                    onClick={togglePopupdescription}
                  >
                    <FaPencil className="iconEdit_store" />
                  </Link>
                  {isPopupdescription && (
                    <form className="background_addproductpopup_box">
                      <div className="hover_addproductpopup_box">
                        <div className="divsdfsdsf">
                          <p>Add product description</p>
                          <input
                            type="text"
                            placeholder="Product description..."
                            className="input_of_txtAddproduct"
                          />
                        </div>
                        <div className="btn_foasdf">
                          <button
                            className="btn_cancel btn_addproducttxt_popup"
                            onClick={togglePopupdescription}
                          >
                            Cancel
                          </button>
                          <button className="btn_confirm btn_addproducttxt_popup">
                            OK
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                  <Link
                    to="#"
                    className="manage_btnEditStore"
                    onClick={togglePopupcategory}
                  >
                    <FaPencil className="iconEdit_store" />
                  </Link>
                  {isPopupcategory && (
                    <form className="background_addproductpopup_box">
                      <div className="hover_addproductpopup_box">
                        <form className="divsdfsdsf">
                          <label>Add product category</label>
                          <select className="input_of_txtAddproduct">
                            <option>category1</option>
                            <option>category2</option>
                            <option>category3</option>
                          </select>
                        </form>
                        <div className="btn_foasdf">
                          <button
                            className="btn_cancel btn_addproducttxt_popup"
                            onClick={togglePopupcategory}
                          >
                            Cancel
                          </button>
                          <button className="btn_confirm btn_addproducttxt_popup">
                            OK
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            );
          })}

          <Link className="btn_saveFooditem" to="/homeSeller">
            Save
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Addfood;
