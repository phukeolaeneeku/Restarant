import "./editEmplotee.css";
import React, { useState, useEffect } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { FaAngleLeft } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoKeySharp } from "react-icons/io5";
import AdminMenu from "../ownerMenu/OwnerMenu";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditEmployee = () => {
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    password2: "",
    role: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/employees/${id}/detail/`
        );
        const { name, email, address, phone, role } = response.data;
        setEmployee({
          name,
          email,
          address,
          phone,
          password: "", // Assuming you do not receive password information from the API
          role,
        });
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id, storage.restaurant_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/employees/${id}/update/`,
        employee
      );
      console.log("Employee updated:", response.data);
      // Optionally, show a success message
      Swal.fire("Success!", "Employee updated successfully!", "success");
    } catch (error) {
      console.error("Error updating employee:", error);
      // Show an error message
      Swal.fire("Error!", "Failed to update employee.", "error");
    }
  };


  return (
    <>
      <AdminMenu />
      <section id="addAmins">
        <div className="box_addAdmin">
          <form onSubmit={handleSubmit}>
            <div className="addAdminForm">
              <div className="boxhead_subminandtitle">
                <h2 className="titleaddmin">Edit Employee</h2>
                <div className="button-updateemp">
                  <button type="submit" className="btn_submit22">
                    Update
                  </button>
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">
                  Name:
                </label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <input
                    
                    type="name"
                    id="name"
                    className="input"
                    placeholder="Name..."
                    value={employee.name}
                    onChange={handleChange}
                    name="name"
                  />
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="email" className="titlelabel">
                  Email:
                </label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="Email address..."
                    value={employee.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="address" className="titlelabel">
                  Address:
                </label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <input
                   type="address"
                   id="address"
                   className="input"
                   placeholder="Address..."
                   value={employee.address}
                   onChange={handleChange}
                   name="address"
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="phone" className="titlelabel">
                  Phone number:
                </label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <input
                    type="phone"
                    id="phone"
                    className="input"
                    placeholder="Phone number..."
                    value={employee.phone}
                    onChange={handleChange}
                    name="phone"
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="password" className="titlelabel">
                  Password:
                </label>
                <div className="boxiconnandinput">
                  <IoKeySharp className="iconinput" />
                  <input
                     type="password"
                     id="password"
                     className="input"
                     placeholder="Password..."
                     value={employee.password}
                     onChange={handleChange}
                     name="password"
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="password" className="titlelabel">
                  Confirm password:
                </label>
                <div className="boxiconnandinput">
                  <IoKeySharp className="iconinput" />
                  <input
                    type="password2"
                    id="password2"
                    className="input"
                    placeholder="Confirm password..."
                    value={employee.password2}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="role" className="titlelabel">
                  Role:
                </label>
                <div className="boxiconnandinput">
                  <IoKeySharp className="iconinput" />
                  <select
                    name="role"
                    className="input"
                    value={employee.role}
                    onChange={handleChange}
                  >
                    <option value="">Select role</option>
                    <option value="counter">Counter</option>
                    <option value="waiter">Waiter</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditEmployee;
