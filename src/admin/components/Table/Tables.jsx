import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import "./table.css";
import { Link } from "react-router-dom";
import axios from "axios";
import TableImage from "../../../img/table2.png";
import AddTable from "./Addtable";
import QRCodes from "./QRCodes";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    const storage = JSON.parse(window.localStorage.getItem("user"));
    if (storage && storage.restaurant_id) {
      fetchData(storage.restaurant_id);
    } else {
      console.error("No restaurant ID found in local storage.");
    }
  }, []);

  const fetchData = (restaurant_id) => {
    axios
      .get(
        `${import.meta.env.VITE_API}/restaurants/${restaurant_id}/tables/list/`
      )
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveTable = (tableNumber) => {
    const storage = JSON.parse(window.localStorage.getItem("user"));
    const restaurant_id = storage.restaurant_id;

    axios
      .post(
        `${
          import.meta.env.VITE_API
        }/restaurants/${restaurant_id}/tables/create/`,
        {
          table_number: tableNumber,
        }
      )
      .then((response) => {
        setTables([...tables, response.data]);
        setShowPopup(false);
        fetchData(restaurant_id); // Reload the tables after saving a new table
      })
      .catch((error) => {
        console.error("Error saving table:", error);
      });
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  const handleCloseModal = () => {
    setSelectedTable(null);
  };

  const handleTableClick = (tableId) => {
    setSelectedTableId(tableId);
    setIsQRModalOpen(true);
  };

  const handleQRModalClose = () => {
    setIsQRModalOpen(false);
  };

  const handleDelete = (tableId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this table?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        const storage = JSON.parse(window.localStorage.getItem("user"));
        const restaurantId = storage.restaurant_id;

        axios
          .delete(
            `${
              import.meta.env.VITE_API
            }/restaurants/${restaurantId}/tables/${tableId}/delete/`
          )
          .then(() => {
            setTables(tables.filter((table) => table.id !== tableId));
            Swal.fire("Deleted!", "The table has been deleted.", "success");
            fetchData(restaurantId); // Reload the tables after deleting
          })
          .catch((error) => {
            console.error("Error deleting table:", error);
            Swal.fire(
              "Error!",
              "There was an issue deleting the table.",
              "error"
            );
          });
      }
    });
  };

  return (
    <>
      <OwnerMenu />
      <div className="board-table">
        <div className="container_box_table">
          <div className="box-add-table">
            <button onClick={handleOpenPopup} className="add_table_btn">
              <p>Add Table</p>
            </button>
          </div>
          <h2>Tables in Restaurant</h2>
          <div className="container-table-dash">
            {tables.map((table) => (
              <div key={table.id} className="box-table-dash">
                <div className="box-img-table-dash">
                  <div
                    className="deleteBox_productcontent22"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(table.id);
                    }}
                  >
                    <AiOutlineDelete />
                  </div>
                  <Link
                    to="#"
                    onClick={() => handleTableClick(table.id)}
                    className="Open"
                  >
                    <img src={TableImage} alt={`Table ${table.id}`} />
                    <h3>{`Table ${table.number}`}</h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <QRCodes
        isOpen={isQRModalOpen}
        onClose={handleQRModalClose}
        selectedTableId={selectedTableId}
      />
      <AddTable
        show={showPopup}
        onClose={handleClosePopup}
        onSave={handleSaveTable}
        fetchData={fetchData}
      />
    </>
  );
};

export default Tables;
