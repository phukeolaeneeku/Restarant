import React from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../ownerMenu/OwnerMenu";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import Rating from "@mui/material/Rating";
import "./review_admin.css";
const Review_admin = () => {
  const [value, setValue] = React.useState(3);
  const rating = 3.9;
  const reviews = 29;
  return (
    <>
      <AdminMenu />
      <div className="review_box_container22">
      <div className="title_header_orderBox22">
          <Link to="/board" className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
          <h3 className="txttitle_manageorder">Review</h3>
        </div>

        <div className="rating-review-1">
          <div className="star">
            <div className="rating">
              <h2> {rating}</h2>
              {/* <span className="icon-star">
              {[...Array(5)].map((star, index) => {
                return (
                  <span key={index} className="stars">
                    {index < Math.floor(rating) ? "★" : "☆"}
                  </span>
                );
              })}
              
            </span> */}
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <p style={{ color: "#777" }}>{reviews} Reviews</p>
            </div>

            <div className="a">
              <div className="aaa">
                <div className="text-rate">Very Good</div>
                <div className="proressbar">
                  {" "}
                  <Progress percent={95} />
                </div>
              </div>

              {/* {levels1.map((level, index) => (
                <div>
                  <div className="text-rate">Very Good</div>
                  <RatingBar key={index} width={level.width} />
                </div>
              ))} */}
              <div className="aaa">
                <div className="text-rate">
                  <p>Good</p>
                </div>
                <div className="proressbar">
                  {" "}
                  <Progress percent={60} />
                </div>
              </div>

              <div className="aaa">
                <div className="text-rate">Commonly</div>
                <div className="proressbar">
                  {" "}
                  <Progress percent={30} />
                </div>
              </div>
              <div className="aaa">
                <div className="text-rate">Not Really</div>
                <div className="proressbar">
                  {" "}
                  <Progress percent={10} />
                </div>
              </div>
              <div className="aaa">
                <div className="text-rate">Worst</div>
                <div className="proressbar">
                  {" "}
                  <Progress percent={0} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-box">
          <span>Comment</span>
        </div>

        <div className="rating-review-2">
          <div className="luam-comment">
            <div className="ab">
              <form>
                <input type="text" placeholder="Write the review.." />
                <button type="submit">Send</button>
              </form>
            </div>
            <div className="box_item_comment">
              <div className="box-view">
                <Link to="/order">
                  <BsPersonCircle className="btnViewMoew_comment" />
                </Link>
              </div>
              <div className="box-txt-comment">
                <p className="txtname_comment">User name</p>

                <p className="txtDate_comment">
                  <span className="icon-star">
                    {[...Array(5)].map((star, index) => {
                      return (
                        <span key={index} className="stars">
                          {index < Math.floor(rating) ? "★" : "☆"}
                        </span>
                      );
                    })}
                  </span>
                  <p>20/04/2024</p>
                </p>
                <p className="txtDes_comment">
                  Local food of our friens's country The shop's owner
                </p>
              </div>
            </div>
            <div className="box_item_comment">
              <div className="box-view">
                <Link to="/order">
                  <BsPersonCircle className="btnViewMoew_comment" />
                </Link>
              </div>
              <div className="box-txt-comment">
                <p className="txtname_comment">User name</p>

                <p className="txtDate_comment">
                  <span className="icon-star">
                    {[...Array(5)].map((star, index) => {
                      return (
                        <span key={index} className="stars">
                          {index < Math.floor(rating) ? "★" : "☆"}
                        </span>
                      );
                    })}
                  </span>
                  <p>20/04/2024</p>
                </p>
                <p className="txtDes_comment">
                  Local food of our friens's country The shop's owner
                </p>
              </div>
            </div>
            <div className="box_item_comment">
              <div className="box-view">
                <Link to="/order">
                  <BsPersonCircle className="btnViewMoew_comment" />
                </Link>
              </div>
              <div className="box-txt-comment">
                <p className="txtname_comment">User name</p>

                <p className="txtDate_comment">
                  <span className="icon-star">
                    {[...Array(5)].map((star, index) => {
                      return (
                        <span key={index} className="stars">
                          {index < Math.floor(rating) ? "★" : "☆"}
                        </span>
                      );
                    })}
                  </span>
                  <p>20/04/2024</p>
                </p>
                <p className="txtDes_comment">
                  Local food of our friens's country The shop's owner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review_admin;
