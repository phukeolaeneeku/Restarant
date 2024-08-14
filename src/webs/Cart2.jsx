// import React, { useState } from "react";
// import "./css/cart.css";
// import { Link } from "react-router-dom";
// import foodImage from "../img/foodImage.png";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { FaPlus, FaMinus } from "react-icons/fa6";
// import Menufooter from "../components/Menufooter";
// import { AiOutlineDelete } from "react-icons/ai";

// function Cart() {
//   const handleDelete = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts.splice(index, 1);
//     setProducts(updatedProducts);
//   };

//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       image: foodImage,
//       name: "Product 1",
//       // description: "1 description.",
//       price: 29.99,
//     },
//     {
//       id: 2,
//       image: foodImage,
//       name: "Product 2",
//       price: 39.99,
//     },
//     {
//       id: 3,
//       image: foodImage,
//       name: "Product 3",
//       price: 49.99,
//     },
//     {
//       id: 4,
//       image: foodImage,
//       name: "Product 4",
//       price: 49.99,
//     },
//     {
//       id: 4,
//       image: foodImage,
//       name: "Product 5",
//       price: 49.99,
//     },
//     {
//       id: 4,
//       image: foodImage,
//       name: "Product 6",
//       price: 49.99,
//     },
//     {
//       id: 4,
//       image: foodImage,
//       name: "Product 7",
//       price: 49.99,
//     },
//     {
//       id: 4,
//       image: foodImage,
//       name: "Product 8",
//       price: 49.99,
//     },
//   ]);
//   const [count, setCount] = useState(1);

//   const incrementCount = () => {
//     setCount((prevCount) => prevCount + 1);
//   };

//   const decrementCount = () => {
//     if (count > 1) {
//       setCount((prevCount) => prevCount - 1);
//     }
//   };
//   return (
//     <>
//       <Menufooter />
//       <div className="cart_box_container">
//         <div className="titleCart">
//           <h2>Cart</h2>
//         </div>

//         <div className="box_cart_item_head">
//           <h4>List menu:</h4>
//         </div>
//         <div className="box_groupaCart_item">
//           <div className="box_content_cart">
//             {/* <div className="foodDetails_box">
//               <div className="box_ofDetails_food">
//                 <img src={foodImage} alt="" />
//                 <div className="txt_ofDetails_food">
//                   <p>Name food</p>
//                   <p>Price</p>
//                 </div>
//               </div>
//               <div className="right_oflastDetailsFood">
//                 <div
//                   className="icon_DetailsFood"
//                   onClick={() => handleDelete(id)}
//                 >
//                   <AiOutlineDelete />
//                 </div>
//                 <div className="boxCount_numfood">
//                   <p className="deleteIconCount" onClick={decrementCount}>
//                     <FaMinus />
//                   </p>
//                   <p className="countBtn_numberCount">{count}</p>
//                   <p className="addIconCount" onClick={incrementCount}>
//                     <FaPlus />
//                   </p>
//                 </div>
//               </div>
//             </div> */}
//             {products.map((product, id) => (
//               <Link to="#" className="foodDetails_box" key={id}>
//                 <div className="box_ofDetails_food">
//                   <img src={product.image} alt="" />

//                   <div className="txt_ofDetails_food">
//                     <div className="product-info">
//                       <p className="product-name">{product.name}</p>
//                     </div>
//                     <div className="product-info">
//                       <p className="product-price">Price: ${product.price}</p>
//                     </div>
//                   </div>
//                   <div className="right_oflastDetailsFood">
//                     <div
//                       className="icon_DetailsFood"
//                       onClick={() => handleDelete(id)}
//                     >
//                       <AiOutlineDelete />
//                     </div>
//                     <div className="boxCount_numfood">
//                       <p className="deleteIconCount" onClick={decrementCount}>
//                         <FaMinus />
//                       </p>
//                       <p className="countBtn_numberCount">{count}</p>
//                       <p className="addIconCount" onClick={incrementCount}>
//                         <FaPlus />
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           <div className="count_footmenu_box">
//             <h3>Cart Total</h3>
//             <div className="count_footmenu_box_content">
//               <div className="count_footmenu_box_item">
//                 <p>Quantity:</p>
//                 <p>2</p>
//               </div>
//               <div className="count_footmenu_box_item">
//                 <p>Total:</p>
//                 <p>2,00 Kip</p>
//               </div>
//               <div className="btn-cart">
//                 <Link to="/" className="btn_Continues">
//                   Continues Order
//                 </Link>
//                 <Link to="/payment" className="btn_confirmCart">
//                   Confirm Order
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cart;

import React, { useState } from "react";
import "./css/cart2.css";
import { Link } from "react-router-dom";
import foodImage from "../img/foodImage.png";
import { FaPlus, FaMinus } from "react-icons/fa";
import Menufooter2 from "../webs/Menufooter2";
import { AiOutlineDelete } from "react-icons/ai";
import Alert2 from "../img/alert2.png";

function Cart2() {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: foodImage,
      name: "Margherita Pizza",
      price: 10.99,
      count: 1, // Initial count for product 1
    },
    {
      id: 2,
      image: foodImage,
      name: "Pepperoni Pizza",
      price: 11.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 3,
      image: foodImage,
      name: "Hawaiian Pizza",
      price: 12.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 4,
      image: foodImage,
      name: "Vegetarian Pizza",
      price: 11.49,
      count: 1, // Initial count for product 2
    },
    {
      id: 5,
      image: foodImage,
      name: "Meat Lover's Pizza",
      price: 13.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 6,
      image: foodImage,
      name: "BBQ Chicken Pizza",
      price: 12.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 7,
      image: foodImage,
      name: "Buffalo Chicken Pizza",
      price: 13.49,
      count: 1, // Initial count for product 2
    },
    {
      id: 8,
      image: foodImage,
      name: "Four Cheese Pizza",
      price: 11.99,
      count: 1, // Initial count for product 2
    },
    // Add count property for other products as needed
  ]);

  const incrementCount = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, count: product.count + 1 }
          : product
      )
    );
  };

  const decrementCount = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.count > 1
          ? { ...product, count: product.count - 1 }
          : product
      )
    );
  };

  const handleDelete = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };
 // Alert
 const [showPopupalert, setShowPopupalert] = useState(false);
 const handleNoProductAlert = () => {
   setShowPopupalert(!showPopupalert);
   // alert("Please add products to your cart before confirming your order.");
 };
  return (
    <>
      <Menufooter2 products={products} />

      <div className="cart_box_container_delivery">
        <div className="titleCart-delivery">
          <h2>Cart</h2>
        </div>

        <div className="box_cart_item_head_delivery">
          <h4>List menu:</h4>
        </div>

        <div className="box_groupaCart_item_delivery">
          <div className="box_content_cart_delivery">
            {products.map((product) => (
              <div className="foodDetails_box_delivery" key={product.id}>
                <div className="box_ofDetails_food_delivery">
                  <img src={product.image} alt={product.name} />
                  <div className="txt_ofDetails_food_delivery">
                    <p>{product.name}</p>
                    <p>$ {product.price}</p>
                  </div>
                </div>
                <div className="right_oflastDetailsFood_delivery">
                  <div
                    className="icon_DetailsFood_delivery"
                    onClick={() => handleDelete(product.id)}
                  >
                    <AiOutlineDelete />
                  </div>
                  <div className="boxCount_numfood_delivery">
                    <p
                      className="deleteIconCount_delivery"
                      onClick={() => decrementCount(product.id)}
                    >
                      <FaMinus />
                    </p>
                    <p className="countBtn_numberCount_delivery">{product.count}</p>
                    <p
                      className="addIconCount_delivery"
                      onClick={() => incrementCount(product.id)}
                    >
                      <FaPlus />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="count_footmenu_box_delivery">
            <h3>Cart Total</h3>
            <div className="count_footmenu_box_content_delivery">
              <div className="count_footmenu_box_item_1_delivery">
                <p>Quantity:</p>
                <p>
                  {products.reduce(
                    (total, product) => total + product.count,
                    0
                  )}
                </p>
              </div>
              <div className="count_footmenu_box_item_2_delivery">
                <p>Total:</p>
                <p className="text-dollar">$</p>
                <p>
                  {products
                    .reduce(
                      (total, product) =>
                        parseInt(total) +
                        parseInt(product.count) * parseInt(product.price),
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="btn-cart-delivery">
                <Link to="/homepage2" className="btn_Continues-delivery">
                  Continues Order
                </Link>
                {products.length > 0 ? (
                  <Link className="btn_confirmCart" to="/payment2">
                    Confirm Order
                  </Link>
                ) : (
                  <Link
                  className="btn_confirmCart-delivery"
                    onClick={handleNoProductAlert}
                  >
                    Confirm Order
                  </Link>
                )}
                {/* <Link  className="btn_confirmCart-delivery" onClick={handleNoProductAlert}>
                  Confirm Order
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
     {/*  */}
     {showPopupalert && (
        <div className="background_popup_alert">
          <div className="hover_popup_alert">
            <div className="box_input_alert">
              <img src={Alert2} alt="alert"></img>
              <h3>
                Please add products to your cart before confirming your order
              </h3>
            </div>
            <div className="btn_foasdf">
              <button className="btn_alert" onClick={handleNoProductAlert}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart2;
