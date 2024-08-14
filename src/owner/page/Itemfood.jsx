import React, { useState, useEffect } from "react";
import "./css/itemfood.css";
import foodImage from "../../img/foodImage.png";
import { Link } from "react-router-dom";
import imageicon from "../../img/imageicon.jpg";
import { IoCartOutline } from "react-icons/io5";
import iconshoppin1 from "../../img/iconshoppin1.png";
import { FaPencil } from "react-icons/fa6";
import { IoCamera } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import Alert2 from "../../img/alert2.png";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
//
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
function Itemfood() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  // const [cart, setCart] = useState([]);
  const [quantity, set_quantity] = useState(1);

  console.log(products);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = () => {
    axios
      .get(import.meta.env.VITE_API + "/restaurant/menu-items/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
// console.log("product0", products)
  const getCategories = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://43.201.166.195:8000/restaurant/category",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setCategories(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Add logic for sorting products based on selected option if needed
  };

  console.log("Category: ", categories);

  const filteredProducts = categoryId
    ? products.filter((product) => product.category === categoryId)
    : products;

  //
  const incrementCount = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: (product.quantity || 0) + 1 } // Increment count or initialize to 0
          : product
      )
    );
  };

  //PopUp box food item
  const [isPopupfood, setisPopupfood] = useState(false);

  const toggleisPopupfood = () => {
    setisPopupfood(!isPopupfood);
  };

  // const addToCart = (product) => {
  //   const existingItemIndex = cart.findIndex((item) => item.id === product.id);
  //   if (existingItemIndex !== -1) {
  //     // If item already exists in cart, update its quantity
  //     const updatedCart = [...cart];
  //     updatedCart[existingItemIndex].quantity += 1;
  //     setCart(updatedCart);
  //   } else {
  //     // If item does not exist in cart, add it to cart
  //     const updatedCart = [...cart, { ...product, quantity: 1 }];
  //     setCart(updatedCart);
  //   }
  // };


  // ============= Cart management ================

  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product, quantity = 1) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id && item.name === product.name
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }

    alert("This product has been added to cart.");
};


  useEffect(() => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `"/restaurant/menu-items/"${products}/review`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const sortedReviews = response.data.sort((a, b) => b.id - a.id);
        setReviews(sortedReviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [products]);
  const [showPopupOkDelete, setShowPopupOkDelete] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);
//  const handleDelete = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts.splice(index, 1);
//     setProducts(updatedProducts);
    
//   };
  const handleDelete = (productId) => {
    setProductToDeleteId(productId); // Set the ID of the product to delete
    setShowPopupOkDelete(true); // Show the delete confirmation popup
  };

  const togglePopupdialogokdelete = () => {
    setShowPopupOkDelete(!showPopupOkDelete);
  };

  const confirmDelete = () => {
    // Filter out the product to delete from the products list
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productToDeleteId)
    );
    setShowPopupOkDelete(false); // Close the delete confirmation popup after deletion
  };
  // const products = ;



  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [pro, setPro] = useState("");

  const togglePopup = (id) => {
    setIsOpen(!isOpen);
    setPro(id);
  };

  const handleSubmit = (event) => {
    event.preventDefualt();
  };
  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  };
  const [mainImageBanner, setMainImageBanner] = useState(null);

  // Popup Edit Image
  const [isOpenimage, setIsOpenimage] = useState(false);
  const togglePopupimage = () => {
    setIsOpenimage(!isOpenimage);
  };
    ///Choose image handleImage
    const handleImage = (e) => {
      const file = e.target.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setMainImage([file]);
        };
  
        reader.readAsDataURL(file);
      }
    };
  //
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // Alert Name restaurant
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
// Name
  const handleConfirmClickName = () => {
    const { input1 } = inputValues;
    if (!input1.trim() ) {
      setDialogContent("Please enter name.");
      setOpenDialog(true); // Display dialog only when there are validation errors
    } else {
      
      setInputValues({
        ...inputValues,
        input1: "",
      });
      togglePopup();
    }
};
// Price
const handleConfirmClickPrice = () => {
  const { input2 } = inputValues;
  if (!input2.trim() ) {
    setDialogContent("Please enter price.");
    setOpenDialog(true); // Display dialog only when there are validation errors
  } else {
    
    setInputValues({
      ...inputValues,
      input2: "",
    });
    togglePopup2();
  }
};
// Image food
const handleConfirmClickImage = () => {
  const { input3 } = inputValues;
  if (!input3.trim() ) {
    setDialogContent("Please choose an image.");
    setOpenDialog(true);
  }
  else{
    setInputValues({
      ...inputValues,
      input3: "",
    });
    togglePopupimage();
  }
};
  return (
    <>
     <div className="container_boxcategory_hp">
        {categories.map((category, index) => (
          <div key={index}>
            <Link
              className="link_categor_l activeCategory"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="food_container_box-main">
        
        <div className="poster_food-mainpage">
          
          <div className="filter2">
            <div></div>

            <h3>Food</h3>
          </div>

          <div>
            <Link to="/addproduct" className="add_food_btn">
              <img src={iconshoppin1} alt="" />
              <p>Add food</p>
            </Link>
          </div>
        </div>

        <div className="box_itemFood_container_main">
          {products.map((product, id) => (
            <Link to="#" className="box_itemFood-main" key={id}>
              <div className="box_itemFood_item_main">
                <img src={product.image} alt="" onClick={toggleisPopupfood} />
                <div
                  className="deleteBox_productcontent"
                  // onClick={() => handleDelete(id)}
                  onClick={() => handleDelete(product.id)}
                >
                  <AiOutlineDelete />
                </div>
                <div className="icon_cameraDp22">
                  <IoCamera onClick={togglePopupimage} />
                </div>
                <div className="txt_boxDescription3">
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <div className="edit-icon-name">
                      <FaPencil onClick={() => togglePopup(product.id)} />
                    </div>
                  </div>
                  <div className="product-info">
                    <p className="product-price">Price: ${product.price}</p>
                    <div className="edit-icon-price">
                      <FaPencil onClick={togglePopup2} />
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="icon_addcartTo"
                onClick={() => addToCart(product)}
              >
                <IoCartOutline className="icon_addcartToIN" />
              </Link>
            </Link>
          ))}
        </div>

        {/* {cart.map((item) => (
          <div className="box_addTocart_content">
            <div> 1 View cart {item.price}</div>
          </div>
        ))} */}
      </div>
      {/* Popup Edit Logo */}
      {isOpenimage && (
       <form className="popup-image">
       <div className="popup-content-image">
         <div className="box_input_image">
           <h2>Add banner mage</h2>

           <div className="input-container2">
             {mainImageBanner && mainImageBanner.length > 0 ? (
               <img
                 src={URL.createObjectURL(mainImageBanner[0])}
                 alt="Banner"
               />
             ) : (
               <img src={imageicon} alt="Banner" />
             )}
           </div>

           <label className="popup_Border_Boximagae">
             <input
               type="file"
               id="img"
               onChange={handleImage}
               required
               name="input3"
               accept="image/*" // Specify accepted file types, e.g., images
             />
             <IoImageOutline className="icon_cameraDp2" />
             <span className="file-upload-text">Choose Image...</span>
           </label>
         </div>
         <div className="btn_foasdf">
           <button
             className="btn_cancel btn_addproducttxt_popup"
             onClick={togglePopupimage}
           >
             CANCEL
           </button>
           <button className="btn_confirm btn_addproducttxt_popup" onClick={handleConfirmClickImage}>
             OK
           </button>
         </div>
         <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <p>{dialogContent}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>OK</Button>
              </DialogActions>
            </Dialog>
       </div>
     </form>
      )}
      {/*  */}
      {isOpen && (
        <div className="background_addproductpopup_box2">
          <div className="hover_addproductpopup_box2">
            <div className="box_input2">
              <p>Add product name</p>
              <input
                name="input1"
                value={inputValues.input1}
                onChange={handleInputChange}
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
              <button className="btn_confirm btn_addproducttxt_popup" onClick={handleConfirmClickName}>
                OK
              </button>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <p>{dialogContent}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>OK</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
      {/* {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="">
              <h2>Add Product name</h2>
              <input
                type="text"
                placeholder="Name..."
                className="text-input-name"
              />
              <div className="btn-popup">
                <button onClick={togglePopup} className="btn-cancel">
                  Cancel
                </button>
                <button className="btn-ok">OK</button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {isOpen2 && (
        <div className="background_addproductpopup_box2">
          <div className="hover_addproductpopup_box2">
            <div className="box_input2">
              <p>Add product price</p>
              <input
               name="input2"
               value={inputValues.input2}
               onChange={handleInputChange}
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
              <button className="btn_confirm btn_addproducttxt_popup" onClick={handleConfirmClickPrice}>
                OK
              </button>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <p>{dialogContent}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>OK</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
      {/* Delete */}
      {showPopupOkDelete && (
        <div className="background_popup_dialog2">
          <div className="hover_popup_dialog2">
            <div className="box_input_dialog2">
              <Box
                sx={{
                  m: 2.5,
                  position: "relative",
                  display: "inline-flex", // Use inline-flex to keep Fab and CircularProgress on the same line
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Fab
                  aria-label="save"
                  color="error"
                  sx={{
                    ...buttonSx,
                    width: "70px",
                    height: "70px",
                    transition: "transform 0.2s ease-in-out", // Add smooth transition
                    "&:hover": {
                      transform: "scale(1.1)", // Scale up on hover
                    },
                  }}
                >
                  {success ? (
                    <CheckIcon fontSize="large" />
                  ) : (
                    <DeleteOutlineIcon fontSize="large" />
                  )}
                </Fab>
                {loading && (
                  <CircularProgress
                    size={80}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>

              <h3>Are you sure?</h3>
              <p>You want to delete item</p>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopupdialogokdelete}
              >
                CANCEL
              </button>
              <button
                className="btn-delete"
                onClick={confirmDelete}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Popup detail food */}
      {/* {isPopupfood && (
        <div className="background_popup_box">
          <div className="foodDetails_container">
            <div className="goBack_foodDetails" onClick={toggleisPopupfood}>
              <IoClose className="goBack_foodDetails_icon" />
            </div>
            <div className="box_content_deatilsfood">
              <img src={foodImage2} alt="" />
            </div>
            <div className="details_food_box_item">
              <div className="box_gput_details">
                <h3>Name</h3>
                <p>100,000 Kip</p>
                <p>description</p>
              </div>
              <div className="write_moreBox">
                <h4>Special recommendations</h4>
                <p>Please tell us if you have any food allergies</p>
                <textarea
                  className="boxWrite_more"
                  rows="6"
                  cols="65"
                  placeholder="The cat was playing in the garden..."
                ></textarea>
              </div>
            </div>

            <div className="footer_foodDetails_box">
              <div className="DetailsFood_item_box">
                <div className="boxCount_numfood_foodDetails">
                  <p className="deleteIconCount">
                    <FaMinus />
                  </p>
                  <p className="countBtn_numberCount">1</p>
                  <p className="addIconCount">
                    <FaPlus />
                  </p>
                </div>
                <Link to="#" className="box_btnCON_addCart">
                  Cart to cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Itemfood;
