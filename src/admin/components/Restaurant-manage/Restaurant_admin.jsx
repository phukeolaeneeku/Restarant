import React, { useState, useEffect } from "react";
import "./css/restaurant_admin.css";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import no_picture from "../../../img/no-picture-icon.jpg";


const Restaurant_admin = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [datas, setDatas] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null); // Added state to hold ID of restaurant to delete

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/restaurants/`
      );
      setDatas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    // Modified handleDelete to take id parameter
    try {
      await axios.delete(
        ` ${import.meta.env.VITE_API}/restaurants/${id}/`
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Restaurant deleted successfully!",
      });
      // After successful delete, refetch data
      fetchData();
      setShowConfirm(false); // Close confirmation dialog
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete restaurant. Please try again later.",
      });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <OwnerMenu />
      <section>
        <div className="box_container_hotel">
          <div className="box_content_hotel">
            <div className="productHead_content">
              <h2 className="htxthead">
                <span className="spennofStyleadmin"></span>List Restaurant
              </h2>
              <div className="categoryBoxfiler">
                <Link to="/add_restaurant" className="box_add_product">
                  <BiPlus id="icon_add_product" />
                  <p>Add Restaurant</p>
                </Link>
              </div>
            </div>

            <div className="box_container_tour">
              {datas.length > 0 ? (
                datas.map((data, index) => (
                  <div className="box_container_tour_admin" key={index}>
                    <div className="container_image_tour">
                      <img src={data.logo || no_picture} alt="image" />
                    </div>

                    <div className="container_desc_tour">
                      <h3>Restaurant: {data.name}</h3>
                      {/* <Expandable>{data.description}</Expandable> */}
                      <p className="price_number_ones">Description: {data.description}</p>
                      <p className="txt_address">Address: {data.address}</p>
                      <p className="txt_address">Phone: {data.phone}</p>
                      <p className="txt_address">Time-Open: {data.time}</p>
                    </div>
                    <div className="btn_delete_view">
                      <div
                        onClick={() => {
                          setIdToDelete(data.id);
                          setShowConfirm(true);
                        }}
                        className="box_btn_saveDelete"
                      >
                        Delete
                      </div>
                      <Link
                        to={`/edit_restaurant/${data.id}`}
                        className="box_btn_saveEdit"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No restaurant available</p>
              )}
            </div>

            <div className="box_container_next_product">
              <button className="box_prev_left_product">
                <AiOutlineLeft id="box_icon_left_right_product" />
                <p>Prev</p>
              </button>

              <div className="box_num_product">
                <div className="num_admin_product">
                  <p>1</p>
                </div>
                <div className="num_admin_product">
                  <p>2</p>
                </div>
              </div>

              <button className="box_prev_right_product">
                <p>Next</p>
                <AiOutlineRight id="box_icon_left_right_product" />
              </button>
            </div>

            {showConfirm && (
              <div className="background_addproductpopup_box">
                <div className="hover_addproductpopup_box">
                  <div className="box_logout">
                    <p>Are you sure you want to delete?</p>
                  </div>
                  <div className="btn_foasdf">
                    <button
                      className="btn_cancel btn_addproducttxt_popup"
                      onClick={handleCancelDelete}
                    >
                      No
                    </button>
                    <button
                      className="btn_confirm btn_addproducttxt_popup"
                      onClick={() => handleDelete(idToDelete)} // Pass idToDelete to handleDelete
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Restaurant_admin;
