// import React, { useState } from "react";
// import OwnerMenu from "../ownerMenu/OwnerMenu";
// import Swal from "sweetalert2";
// import axios from 'axios';
// import "./addtable.css";

// const AddTable = ({ show, onClose, onSave }) => {
//   const [tableNumber, setTableNumber] = useState("");

//   const handleSave = async () => {
//     const storage = JSON.parse(window.localStorage.getItem("user"));
//     const restaurant_id = storage.restaurant_id;
//     try {
//       const data = new FormData();
//       data.append("number", tableNumber);

//       let config = {
//         method: "post",
//         maxBodyLength: Infinity,
//         url: import.meta.env.VITE_API + `/restaurants/${restaurant_id}/tables/create/`,
//         data: data
//       };

//       const response = await axios.request(config);

//       if (response.status !== 201) {
//         const errorText = response.statusText;
//         console.error(`HTTP error! Status: ${response.status}, StatusText: ${errorText}`);
//         throw new Error("Network response was not ok");
//       }

//       const dataResponse = response.data;
//       console.log("Table saved:", dataResponse);

//       Swal.fire({
//         icon: "success",
//         title: "Table Saved",
//         text: `Table number ${dataResponse.number} was saved successfully!`,
//       });

//       onSave(dataResponse.number);
//       setTableNumber("");
//       onClose();
//       window.location.reload(); // Reload the page after saving
//     } catch (error) {
//       console.error("Error saving table:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: `There was an error saving the table: ${error.message}`,
//       });
//     }
//   };

//   if (!show) {
//     return null;
//   }

//   return (
//     <>
//       <OwnerMenu />
//       <div className="popup-overlay">
//         <div className="popup-container">
//           <h2>Add Table</h2>
//           <input
//             type="number"
//             value={tableNumber}
//             onChange={(e) => setTableNumber(e.target.value)}
//             placeholder="Enter table number"
//             className="input-number"
//           />
//           <button className="save-btn" onClick={handleSave}>
//             Save
//           </button>
//           <button className="close-btn" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddTable;

// New Add Tables

import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./addtable.css";

const AddTable = ({ show, onClose, onSave, fetchData }) => {
  const [tableCount, setTableCount] = useState("");

  const handleSave = async () => {
    const storage = JSON.parse(window.localStorage.getItem("user"));
    const restaurant_id = storage.restaurant_id;
    const count = parseInt(tableCount, 10);

    if (isNaN(count) || count <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a valid number greater than zero.",
      });
      return;
    }

    try {
      const promises = [];
      for (let i = 0; i < count; i++) {
        const data = new FormData();
        // Assuming you want to start table numbering from 1 up to count
        data.append("number", i + 1);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url:
            import.meta.env.VITE_API +
            `/restaurants/${restaurant_id}/tables/create/`,
          data: data,
        };

        promises.push(axios.request(config));
      }

      const responses = await Promise.all(promises);

      const failedRequests = responses.filter(
        (response) => response.status !== 201
      );
      if (failedRequests.length > 0) {
        console.error("Some requests failed:", failedRequests);
        throw new Error("Some tables could not be saved");
      }

      Swal.fire({
        icon: "success",
        title: "Tables Saved",
        text: `${count} tables were saved successfully!`,
      });

      onSave(count);
      setTableCount("");
      onClose();

      // Reload tables after saving
      fetchData(restaurant_id);
    } catch (error) {
      console.error("Error saving tables:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: `There was an error saving the tables: ${error.message}`,
      });
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-container">
          <h2>Add Tables</h2>
          <input
            type="number"
            value={tableCount}
            onChange={(e) => setTableCount(e.target.value)}
            placeholder="Enter number of tables to create"
            className="input-number"
          />
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTable;
