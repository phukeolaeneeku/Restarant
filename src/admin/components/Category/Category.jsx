import React, { useEffect, useState } from "react";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import "./category.css";
import Editcategory from "./Editcategory";
import Addcategory from "./Addcategory";
import Swal from "sweetalert2";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const storage = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    fetchData(); // Fetch categories on component mount
  }, []);

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/categories/list/`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedCategory) => {
    fetch(`${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/categories/${updatedCategory.id}/update/`, {
      method: "PUT",
      body: JSON.stringify(updatedCategory),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        setCategories(
          categories.map((cat) =>
            cat.id === updatedCategory.id ? updatedCategory : cat
          )
        );
        setShowEditModal(false);
      }
    });
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleDelete = (category) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${category.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/categories/${category.id}/delete/`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            setCategories(categories.filter((cat) => cat.id !== category.id));
            Swal.fire(
              'Deleted!',
              `${category.name} has been deleted.`,
              'success'
            );
          } else {
            Swal.fire(
              'Error!',
              'There was a problem deleting the category.',
              'error'
            );
          }
        }).catch((error) => {
          Swal.fire(
            'Error!',
            `There was a problem deleting the category: ${error.message}`,
            'error'
          );
        });
      }
    });
  };

  const handleOpenPopup = () => {
    setShowAddModal(true);
  };

  const handleClosePopup = () => {
    setShowAddModal(false);
  };

  const handleSubmitForm = () => {
    // After adding a category, close the modal and refresh the category list
    handleClosePopup();
    fetchData(); // Refresh category list
  };

  return (
    <>
      <OwnerMenu />
      <div className="board_category">
        <div className="container_category">
          <div className="box-category">
            <h2>Category in Restaurant</h2>
            <div className="box-add-category">
              <button className="add_table_btn" onClick={handleOpenPopup}>
                <p>Add Category</p>
              </button>
            </div>
          </div>
          <div className="category-box">
            {categories.map((category) => (
              <div key={category.id} className="category-item">
                <p>{category.name}</p>
                <div className="category-actions">
                  <button
                    className="btn-edit-cat"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete-cat"
                    onClick={() => handleDelete(category)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showEditModal && (
        <Editcategory
          category={selectedCategory}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
      {showAddModal && (
        <Addcategory onClose={handleClosePopup} onSubmit={handleSubmitForm} />
      )}
    </>
  );
};

export default Category;
