import "./css/homeSeller.css";
import React, { useState } from 'react'
import Logo1 from "../img/Logo1.png";
import banner from "../img/banner.png";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import foodImage from "../img/foodImage.png";
import { FaPencil } from "react-icons/fa6";
import { IoCameraReverse } from "react-icons/io5";
import iconshoppin1 from "../img/iconshoppin1.png"
import { AiOutlineDelete } from "react-icons/ai";
import { IoCamera } from "react-icons/io5";
import Menufooter from "./Menufooter";

function homeSeller2() {

    //PopUp box Delete
    const [isPopupDelete, setPopupDelete] = useState(false);

    const handleDelete = () => {
        setPopupDelete(!isPopupDelete);
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
        <div className='container_boxHeader_seller'>
            <div className="box_banner_content">
                <img src={banner} alt="" />
                <div className="iconnChangeImage">
                    <IoCameraReverse />
                </div>
                <div className="logo_box_content">
                    <img src={Logo1} alt="" />
                    <div className="iconnChangeImage2">
                        <IoCameraReverse />
                    </div>
                </div>
            </div>

            <div className='taeraerthui'>
                <div className="header_contact_details">
                    <div className="contact_head_Boxdetails">
                        <FiPhone className="iconnDetails_head" />
                        <p>+856 20 55 000 959</p>
                    </div>
                    <Link to="#" className="manage_btnEditStore">
                        <FaPencil className="iconEdit_store" />
                    </Link>
                </div>
                <div className="header_contact_details">
                    <div className="contact_head_Boxdetails">
                        <IoMdTime className="iconnDetails_head" />
                        <p>8:00 - 20:00</p>
                    </div>
                    <Link to="#" className="manage_btnEditStore">
                        <FaPencil className="iconEdit_store" />
                    </Link>
                </div>
                <div className="header_contact_details">
                    <div className="contact_head_Boxdetails">
                        <div className="all_star_box">
                            <IoIosStar className="iconstar_review adtiveStar" />
                            <IoIosStar className="iconstar_review adtiveStar" />
                            <IoIosStar className="iconstar_review adtiveStar" />
                            <IoIosStar className="iconstar_review" />
                            <IoIosStar className="iconstar_review" />
                        </div>
                        <p>29 Review</p>
                    </div>
                    <Link to="#" className="manage_btnEditStore">
                        <FaPencil className="iconEdit_store" />
                    </Link>
                </div>

                <div className="header_contact_details">
                    <div className="contact_head_Boxdetails">
                        <FiMapPin className="iconnDetails_head" />
                        <p>131 Sapang Sisangvvone Road,
                            Ban Naxay, Vientiane 0100 ลาว</p>
                    </div>
                    <Link to="#" className="manage_btnEditStore">
                        <FaPencil className="iconEdit_store" />
                    </Link>
                </div>
                <div className="container_boxcategory_manage">
                    <Link className="link_categor_l active" to="#">Pizza</Link>
                    <Link className="link_categor_l" to="#">Pizza</Link>
                    <Link className="link_categor_l" to="#">Pizza</Link>
                    <Link className="link_categor_l" to="#">Pizza</Link>
                    {/* <Link to="#" className="manage_btnEditStore">
                        <FaPencil className="iconEdit_store" />
                    </Link> */}
                </div>
                <div className="box_addfood_containerr">
                    <div className="poster_food">
                        <div></div>
                        <h3>Food</h3>
                    </div>
                    <Link to="/addfood" className="boxAdd_food_btn">
                        <img src={iconshoppin1} alt="" />
                        <p>Add food</p>
                    </Link>
                </div>

                <div className="box_itemFood">
                    <div className='box_itemFood_item'>
                        <div className='box_iamgeFood'>
                            <div className="manage_btnEditStore_delete_btnIcon" onClick={handleDelete}>
                                <AiOutlineDelete className="icondelete_store" />
                            </div>
                            {/* PopUp box delete */}
                            {isPopupDelete && (
                                <form className="background_addproductpopup_box">
                                    <div className="hover_addproductpopup_box">
                                        <div className="divsdfsdsf">
                                            <p>Add product name</p>
                                            <input type="text" placeholder='Product name...' className='input_of_txtAddproduct' />
                                        </div>
                                        <div className="btn_foasdf">
                                            <button className='btn_cancel btn_addproducttxt_popup' onClick={handleDelete}>Cancel</button>
                                            <Link to="#" className='btn_confirm btn_addproducttxt_popup' onClick={handleDelete}>OK</Link>
                                        </div>
                                    </div>
                                </form>
                            )}
                            <img src={foodImage} alt="" />
                            <div className="div_ofBoxCamera" onClick={togglePopupimage}>
                                <IoCamera className='icon_cameraDp' />
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
                                            <button className='btn_cancel btn_addproducttxt_popup' onClick={togglePopupimage}>Cancel</button>
                                            <Link to="#" className='btn_confirm btn_addproducttxt_popup' onClick={togglePopupimage}>OK</Link>
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

                    <div className='icon_editFood_each'>
                        <Link to="#" className="manage_btnEditStore" onClick={togglePopupname}>
                            <FaPencil className="iconEdit_store" />
                        </Link>
                        {isPopupname && (
                            <form className="background_addproductpopup_box">
                                <div className="hover_addproductpopup_box">
                                    <div className="divsdfsdsf">
                                        <p>Add product name</p>
                                        <input type="text" placeholder='Product name...' className='input_of_txtAddproduct' />
                                    </div>
                                    <div className="btn_foasdf">
                                        <button className='btn_cancel btn_addproducttxt_popup' onClick={togglePopupname}>Cancel</button>
                                        <button className='btn_confirm btn_addproducttxt_popup'>OK</button>
                                    </div>
                                </div>
                            </form>
                        )}
                        <Link to="#" className="manage_btnEditStore" onClick={togglePopupprice}>
                            <FaPencil className="iconEdit_store" />
                        </Link>
                        {isPopupprice && (
                            <form className="background_addproductpopup_box">
                                <div className="hover_addproductpopup_box">
                                    <div className="divsdfsdsf">
                                        <p>Add product price</p>
                                        <input type="text" placeholder='Product price...' className='input_of_txtAddproduct' />
                                    </div>
                                    <div className="btn_foasdf">
                                        <button className='btn_cancel btn_addproducttxt_popup' onClick={togglePopupprice}>Cancel</button>
                                        <button className='btn_confirm btn_addproducttxt_popup'>OK</button>
                                    </div>
                                </div>
                            </form>
                        )}
                        <Link to="#" className="manage_btnEditStore" onClick={togglePopupdescription}>
                            <FaPencil className="iconEdit_store" />
                        </Link>
                        {isPopupdescription && (
                            <form className="background_addproductpopup_box">
                                <div className="hover_addproductpopup_box">
                                    <div className="divsdfsdsf">
                                        <p>Add product description</p>
                                        <input type="text" placeholder='Product description...' className='input_of_txtAddproduct' />
                                    </div>
                                    <div className="btn_foasdf">
                                        <button className='btn_cancel btn_addproducttxt_popup' onClick={togglePopupdescription}>Cancel</button>
                                        <button className='btn_confirm btn_addproducttxt_popup'>OK</button>
                                    </div>
                                </div>
                            </form>
                        )}
                        <Link to="#" className="manage_btnEditStore" onClick={togglePopupcategory}>
                            <FaPencil className="iconEdit_store" />
                        </Link>
                        {isPopupcategory && (
                            <form className="background_addproductpopup_box">
                                <div className="hover_addproductpopup_box">
                                    <form className="divsdfsdsf">
                                        <label >Add product category</label>
                                        <select className="input_of_txtAddproduct">
                                            <option>category1</option>
                                            <option>category2</option>
                                            <option>category3</option>
                                        </select>
                                    </form>
                                    <div className="btn_foasdf">
                                        <button className='btn_cancel btn_addproducttxt_popup' onClick={togglePopupcategory}>Cancel</button>
                                        <button className='btn_confirm btn_addproducttxt_popup'>OK</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Menufooter />
        </div>
    )
}

export default homeSeller2