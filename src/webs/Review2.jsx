import React from "react";
import "./css/review2.css";
import { Link } from "react-router-dom";
import Menufooter2 from "../webs/Menufooter2";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import Rating from '@mui/material/Rating';

const Review2 = () => {
  const [value, setValue] = React.useState(3);
  const rating = 3.9;
  const reviews = 29;
  //   const barFills = {
  //     veryGood: "95%",
  //   };
  //   const barFillsgood = {
  //     good: "60%",
  //   };
  //   const barFillscommonly = {
  //     commonly: "30%",
  //   };
  //   const barFillsnotreally = {
  //     notReally: "10%",
  //   };
  //   const barFillsworst = {
  //     worst: "0%",
  //   };

  // const levels1 = [{ label: "Very good", width: "100%" }];
  // const levels2 = [{ label: "Good", width: "60%" }];
  // const levels3 = [{ label: "Commonly", width: "30%" }];
  // const levels4 = [{ label: "Not Really", width: "10%" }];
  // const levels5 = [{ label: "Worst", width: "0%" }];
  // const RatingBar = ({ label, width }) => {
  //   return (
  //     <div style={{ margin: "5px 18rem" }}>
  //       <div>{label}</div>
  //       <div
  //         style={{
  //           background: "grey",
  //           width: "650%",
  //           height: "20px",
  //           borderRadius: "5px",
  //         }}
  //       >
  //         <div
  //           style={{
  //             background: "black",
  //             width: width,
  //             height: "20px",
  //             borderRadius: "5px",
  //           }}
  //         ></div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
        <Menufooter2 />
    <div className="review_box_container">
      <div className="title_header_orderBox">
        <Link to="/" className="back_orderBox">
          <IoIosArrowBack className="icon_closeReviwe" />
          Back
        </Link>
        <h3>Rating & Reviews</h3>
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

              <div className="text-rate"><p>Good</p></div>
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

export default Review2;
