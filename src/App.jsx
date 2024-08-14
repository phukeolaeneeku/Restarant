import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";

// Import your pages/components here
import Home from "./pages/HomePage";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import OrderList from "./pages/OrderList";
import Review from "./pages/Review";
import Payment from "./pages/Payment";
import Address from "./pages/Address";
import HomeRestaurant from "./pages/HomeRestaurant";
import Search from "./components/Search";


import HomeSeller2 from "./seller/homeSeller copy";
import HomeSeller from "./seller/homeSeller";
import Addfood from "./seller/Addfood";
import Dashborard from "./seller/Dashborard";
import Login from "./seller/Login";

import Signup1 from "./owner/page/Signup1";
import Signup2 from "./owner/page/Signup2";
import Signup from "./owner/page/Signup";
import LoginO from "./owner/page/LoginO";
import Mainpage from "./owner/page/Mainpage";
import Addproduct from "./owner/page/Addproduct";
import Manageorder from "./owner/page/Manageorder";
import Detailorder from "./owner/page/Detailorder";
import Dashborardpc from "./owner/page/Dashboardpc";
import History from "./owner/page/History";
import Orderhistory from "./owner/page/Orderhistory";
import Detailorder2 from "./owner/page/Detailorder2";


import Homepage2 from "./webs/Homepage2";
import Order2 from "./webs/Order2";
import Cart2 from "./webs/Cart2";
import FoodItem2 from "./webs/FoodItem2";
import OrderList2 from "./webs/OrderList2";
import Review2 from "./webs/Review2";
import Payment2 from "./webs/Payment2";
import Address2 from "./webs/Address2";
import Profile from "./pages/Profile";

//Admin
import Dashboard from "./admin/Dashboard";
import Board from "./admin/components/board/Board";
import OwnerMenu from "./admin/components/ownerMenu/OwnerMenu";
import Itemfood from "./admin/components/Food/Itemfood";
import Addproduct1 from "./admin/components/Food/Addproduct1";
import Category from "./admin/components/Category/Category";
import Employee from "./admin/components/Employee/Employee";
import Tables from "./admin/components/Table/Tables";
import Addtable from "./admin/components/Table/Addtable";
import TableDetails from "./admin/components/Table/TableDetails";
import AddEmployee from "./admin/components/Employee/AddEmployee";
import EditEmployee from "./admin/components/Employee/EditEmployee";
import Restaurant_admin from "./admin/components/Restaurant-manage/Restaurant_admin";

// Counter
import Counter from "./owner/counter/Counter";
import Menu from "./owner/counter/Menu";
// import Notestfication from "./owner/page/Notestfication";
import Ordermenu from "./owner/counter/Ordermenu";
import Orderr from "./owner/counter/Orderr";
import Edit_restaurant from "./admin/components/Restaurant-manage/Edit_restaurant";
import Add_Restaurant from "./admin/components/Restaurant-manage/Add_Restaurant";
import History_order from "./admin/components/History_order/History_order";
import Review_admin from "./admin/components/Review/Review_admin";
import OrderDetail from "./owner/counter/OrderDetail";
// import ScanQR from "./components/ScanQR";

// Waiter
// import Waiter from "./owner/counter copy/Waiter";
// import Menu2 from "./owner/counter copy/Menu2";
// import Ordermenu2 from "./owner/counter copy/Ordermenu2";
function App() {


  ////
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = false;
    document.body.appendChild(script);

    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  function googleTranslateElementInit() {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,es,fr,de,ja,ko,lo",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  }

  function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Function to scroll to the top of the page
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scroll behavior
      });
    };

    // Function to handle scroll event and toggle visibility of the button
    const toggleVisibility = () => {
      if (window.pageYOffset > 50) {
        // Change this value as needed
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add event listener to scroll event
    useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
      <div className="scroll-to-top">
        {isVisible && (
          <button onClick={scrollToTop}>
            <i>Click to top</i>
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div>
        <div id="google_translate_element" className="fixedElement"></div>
      </div>
      <Router>
        <Routes>
          {/* --------- Home Page ---------- */}
          <Route path="/logino" Component={LoginO} />
          <Route path="/home/restaurant/:restaurantId/table/:table_id" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/restaurant" element={<Home />} />
          <Route path="/orderList" element={<OrderList />} />
          <Route path="/home/restaurant/:restaurantId/table/:table_id/order" element={<Order />} />
          <Route path="/home/restaurant/:restaurantId/table/:table_id/cart" element={<Cart />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/address" element={<Address />} />
          <Route path="/" element={<HomeRestaurant />} />
          <Route path="/search" element={<Search />} />
         {/* ? <Route path="/scanqr" element={<ScanQR />} /> */}

          {/* --------- Seller Page ---------- */}
          {/* <Route path="/homeSeller2" element={<HomeSeller2 />} />
          <Route path="/homeSeller" element={<HomeSeller />} /> */}
          <Route path="/addfood" element={<Addfood />} />
          <Route path="/dashborard" element={<Dashborard />} />
         {/* Admin */}
          <Route path="/restaurant_admin" element={<Restaurant_admin />} />
          <Route path="/edit_restaurant/:id" element={<Edit_restaurant />} />
          <Route path="/add_restaurant" element={<Add_Restaurant />} />
          <Route path="/history_order" element={<History_order />} />
          <Route path="/review_admin" element={<Review_admin />} />
          <Route path="/edit_employee/:id" element={<EditEmployee />} />

          {/* --------- Owner Page ---------- */}
          <Route path="/home/restaurant/:restaurantId/table/:table_id/logino" element={<LoginO />} />
          <Route path="/logino" element={<LoginO />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup1" element={<Signup1 />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/manageorder" element={<Manageorder />} />
          <Route path="/detailorder" element={<Detailorder />} />
          <Route path="/dashboardpc" element={<Dashborardpc />} />
          <Route path="/history" element={<History />} />
          <Route path="/orderhistory" element={<Orderhistory />} />
          <Route path="/detailorder2" element={<Detailorder2 />} />

          <Route path="/ownermunu" element={<OwnerMenu />} />
          <Route path="/board" element={<Board />} />
          <Route path="/itemfood2" element={<Itemfood />} />
          <Route path="/addproduct1" element={<Addproduct1 />} />
          <Route path="/category" element={<Category />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/table" element={<Tables />} />
          <Route path="/addtable" element={<Addtable />} />
          <Route path="/restaurant/tables/:id" component={TableDetails} />
          <Route path="/add-employee" element={<AddEmployee />} />
          
          {/* --------- Web delivery ---------- */}
          <Route path="/homepage2" element={<Homepage2 />} />
          <Route path="/orderList2" element={<OrderList2 />} />
          <Route path="/order2" element={<Order2 />} />
          <Route path="/cart2" element={<Cart2 />} />
          <Route path="/foodItem2" element={<FoodItem2 />} />
          <Route path="/reviews2" element={<Review2 />} />
          <Route path="/payment2" element={<Payment2 />} />
          <Route path="/address2" element={<Address2 />} />
          <Route path="/profile" element={<Profile />} />

          {/* --------- Web delivery ---------- */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* --------- Counter ---------- */}
          <Route path="/counter"  element={<Counter/>} />
          {/* <Route path="/notestfication"  element={<Notestfication/>} /> */}
          <Route path="/restaurant/orders/:tableId" element={<Menu/>}/>
          {/* <Route path="/restaurant/orders/:tableId" element={<OrderDetail/>}/> */}
          {/* <Route path="/restaurant/orders/:tableId" element={<Ordermenu/>}/> */}
          <Route path="/orderr/:orderId" element={<Orderr />} />

          {/* --------- Waiter ---------- */}
          {/* <Route path="/waiter"  element={<Waiter/>} />
          <Route path="/restaurant/orders/:tableId" element={<Detailorder2/>}/>
          <Route path="/restaurant/waiter/orders/:tableId" element={<Ordermenu2/>}/> */}
        </Routes>
      </Router>
      <ScrollToTopButton />
    </>
  );
}

export default App;
