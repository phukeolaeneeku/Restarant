import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import "./tabledetail.css";

const TableDetails = () => {
  const { id } = useParams();
  const [table, setTable] = useState(null);

  useEffect(() => {
    axios
      .get(`${
        import.meta.env.VITE_API
      }/restaurant/tables/${id}`)
      .then((response) => {
        setTable(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the table details!", error);
      });
  }, [id]);
console.log(table)
  if (!table) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <OwnerMenu />
      <div className="table-details">
        <h2>Table Details</h2>
        <p><strong>Table ID:</strong> {table.id}</p>
        <p><strong>Table Number:</strong> {table.number}</p>
        <p><strong>Restaurant ID:</strong> {table.restaurant}</p>
        <img
          src={table.qr_code}
          alt={`QR Code for Table ${table.number}`}
          className="qr-code"
        />
      </div>
    </>
  );
};

export default TableDetails;
