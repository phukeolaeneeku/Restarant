import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Menufooter2 from "../webs/Menufooter2";
import "./css/address2.css";
function Address2() {
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    // Add more input fields as needed
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  
  // Function to handle confirm button click
  const handleConfirmClick = () => {
    const { input1, input2, input3 } = inputValues;
    if (!input1.trim() && !input2.trim() && !input3.trim()) {
      setDialogContent("Please enter your information.");
      setOpenDialog(true); // Display dialog only when there are validation errors
    } else if (!input1.trim()) {
      setDialogContent("Please enter your name.");
      setOpenDialog(true);
    } else if (!input2.trim()) {
      setDialogContent("Please enter your phone number.");
      setOpenDialog(true);
    } else if (!input3.trim()) {
      setDialogContent("Please enter your address.");
      setOpenDialog(true);
    } else {
      window.location.href = "/payment2";
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Menufooter2 />
      <div className="continer_address_2">
        <div className="title_header_orderBox">
          <Link to="/payment2 " className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
          <h3>Address</h3>
        </div>
        <div className="box_address_2">
          <div className="input_box_2">
            <label>Name:</label>
            <input
              className="input_form"
              name="input1"
              placeholder="Enter Your Name"
              value={inputValues.input1}
              onChange={handleInputChange}
            />
            <label>Phone:</label>
            <input
              className="input_form"
              type="tel"
              name="input2"
              placeholder="Enter Your Phone Number"
              value={inputValues.input2}
              onChange={handleInputChange}
            />
            <label>Address:</label>
            <input
              className="input_form"
              name="input3"
              placeholder="Enter Your Address"
              value={inputValues.input3}
              onChange={handleInputChange}
            />
          </div>
          <div className="btn-con-address">
            <Link
              className="btn_confirm_address_2"
              onClick={handleConfirmClick}
            >
              Confirm
            </Link>
          </div>
        </div>
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
    </>
  );
}

export default Address2;

// import React, { useState } from "react";
// import "./css/address2.css";
// import { Link } from "react-router-dom";
// import Menufooter2 from "../webs/Menufooter2";
// import { IoIosArrowBack } from "react-icons/io";

// function Address2() {
//   const [inputValues, setInputValues] = useState({
//     input1: "",
//     input2: "",
//     input3: "",

//     // Add more input fields as needed
//   });

//   // Function to handle input changes
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setInputValues({ ...inputValues, [name]: value });
//   };

//   // Function to handle confirm button click
//   const handleConfirmClick = () => {
//     const { input1, input2, input3 } = inputValues;
//     if (!input1.trim() && !input2.trim() && !input3.trim()) {
//       alert("Please enter your information.");
//     } else if (!input1.trim()) {
//       alert("Please enter your name.");
//     } else if (!input2.trim()) {
//       alert("Please enter your phone number.");
//     } else if (!input3.trim()) {
//       alert("Please enter your address.");
//     } else {
//       // Navigate to the payment page
//       window.location.href = "/payment2";
//     }
//   };
//   return (
//     <>
//       <Menufooter2 />
//       <div className="continer_address_2">
//         <div className="title_header_orderBox">
//           <Link to="/payment2 " className="back_orderBox">
//             <IoIosArrowBack className="icon_closeReviwe" />
//             Back
//           </Link>
//           <h3>Address</h3>
//         </div>
//         <div className="box_address_2">
//           <div className="input_box_2">
//             <label>Name:</label>
//             <input
//               className="input_form"
//               // type="text"
//               name="input1"
//               placeholder="Enter Your Name"
//               value={inputValues.input1}
//               onChange={handleInputChange}
//             />
//             <label>Phone:</label>
//             <input
//               className="input_form"
//               type="tel"
//               name="input2"
//               placeholder="Enter Your Phone Number"
//               value={inputValues.input2}
//               onChange={handleInputChange}
//             />
//             <label>Address:</label>
//             <input
//               className="input_form"
//               // type="text"
//               name="input3"
//               placeholder="Enter Your Address"
//               value={inputValues.input3}
//               onChange={handleInputChange}
//             />
//             {/* Add more input fields as needed */}
//           </div>
//           <div className="btn-con-address">
//             <Link
//               className="btn_confirm_address_2"
//               onClick={handleConfirmClick}
//             >
//               Confirm
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Address2;
