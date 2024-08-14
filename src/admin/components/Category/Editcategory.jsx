import React, { useState } from "react";
import Swal from "sweetalert2";
import "./editcategory.css";

const Editcategory = ({ category, onSave, onCancel }) => {
  const [name, setName] = useState(category.name);

  const handleSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        onSave({ ...category, name });
        Swal.fire("Saved!", "Your changes have been saved.", "success");
      }
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel editing?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        onCancel();
      }
    });
  };

  return (
    <div className="popup-overlay-edit">
      <div className="modal-content-edit">
        <h2>Edit Category</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn-save-edit" onClick={handleSave}>
          Save
        </button>
        <button className="btn-cancel-edit" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Editcategory;
