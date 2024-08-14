import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addemployee.css";
import AdminMenu from "../ownerMenu/OwnerMenu";
import Swal from "sweetalert2";

const AddEmployee = () => {
  const [addEmployee, setAddEmployee] = useState({
    restaurant: "",
    email: "",
    password: "",
    password2: "",
    name: "",
    address: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    // Retrieve the restaurant ID from local storage
    const storage = JSON.parse(window.localStorage.getItem("user"));
    const restaurantId = storage.restaurant_id;
    if (restaurantId) {
      setAddEmployee((prevState) => ({
        ...prevState,
        restaurant: restaurantId,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (addEmployee.password !== addEmployee.password2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    let data = JSON.stringify({
      restaurant: addEmployee.restaurant,
      email: addEmployee.email,
      password: addEmployee.password,
      password2: addEmployee.password2,
      name: addEmployee.name,
      address: addEmployee.address,
      phone: addEmployee.phone,
      role: addEmployee.role.toUpperCase(),
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/user/signup-employee`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
       
        setAddEmployee({
          restaurant: addEmployee.restaurant,
          email: "",
          password: "",
          password2: "",
          name: "",
          address: "",
          phone: "",
          role: "",
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Employee added successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add employee. Please try again.",
        });
      });
  };

  return (
    <>
      <AdminMenu />
      <section id="Employee">
        <div className="box_Employee">
          <div className="add-employee-containers">
            <h2>Add Employee</h2>
            <form className="add-employee-form" onSubmit={handleSubmit}>
              <div className="add-employee-form">
                <label htmlFor="name">Name:</label>
                <input
                  // type="text"
                  id="name"
                  name="name"
                  placeholder="Name..."
                  value={addEmployee.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-form">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email..."
                  value={addEmployee.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-form">
                <label htmlFor="address">Address:</label>
                <input
                  // type="text"
                  id="address"
                  name="address"
                  placeholder="Address..."
                  value={addEmployee.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-form">
                <label htmlFor="phone">Phone number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone number..."
                  value={addEmployee.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-form">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password..."
                  value={addEmployee.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="add-employee-form">
                <label htmlFor="password2">Confirm password:</label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  placeholder="Confirm password..."
                  value={addEmployee.password2}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-form">
                <label htmlFor="role">Role:</label>
                <select
                  name="role"
                  value={addEmployee.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option value="counter">Counter</option>
                  <option value="waiter">Waiter</option>
                </select>
              </div>
              <button type="submit">Add Employee</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddEmployee;


// // const { name, email, address, phone, password, password2, role } = formData;

// // const formdata = new FormData();
// // formdata.append("restaurant", storage.restaurant_id);
// // formdata.append("name", name);
// // formdata.append("email", email);
// // formdata.append("address", address);
// // formdata.append("phone", phone);
// // formdata.append("password", password);
// // formdata.append("password2", password2);
// // formdata.append("role", role);

// // const requestOptions = {
// //   method: "POST",
// //   body: formdata,
// //   redirect: "follow",
// // };

// // try {
// //   const response = await fetch(
// //     "http://43.201.166.195:8000/user/signup-employee",
// //     requestOptions
// //   );

// //   if (!response.ok) {
// //     throw new Error("Failed to add employee");
// //   }

// //   // Clear form after successful submission
// //   setFormData({
// //     name: "",
// //     email: "",
// //     address: "",
// //     phone: "",
// //     password: "",
// //     password2: "",
// //     role: "",
// //   });

// //   // Show success message using SweetAlert2
// //   Swal.fire({
// //     icon: "success",
// //     title: "Employee added successfully",
// //     showConfirmButton: false,
// //     timer: 1500, // Automatically close after 1.5 seconds
// //   });
// // } catch (error) {
// //   console.error("Error adding employee:", error);
// //   // Show error message using SweetAlert2
// //   Swal.fire({
// //     icon: "error",
// //     title: "Failed to add employee",
// //     text: error.message,
// //   });
// // }







// New 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./addemployee.css";
// import AdminMenu from "../ownerMenu/OwnerMenu";
// import Swal from "sweetalert2";

// const AddEmployee = () => {
//   const [addEmployee, setAddEmployee] = useState({
//     restaurant: "",
//     email: "",
//     password: "",
//     password2: "",
//     name: "",
//     address: "",
//     phone: "",
//     role: "",
//   });

//   useEffect(() => {
//     // Retrieve the restaurant ID from local storage
//     const storage = JSON.parse(window.localStorage.getItem("user"));
//     const restaurantId = storage.restaurant_id;
//     if (restaurantId) {
//       setAddEmployee((prevState) => ({
//         ...prevState,
//         restaurant: restaurantId,
//       }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddEmployee((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (addEmployee.password !== addEmployee.password2) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Passwords do not match!",
//       });
//       return;
//     }

//     let data = JSON.stringify({
//       restaurant: addEmployee.restaurant,
//       email: addEmployee.email,
//       password: addEmployee.password,
//       password2: addEmployee.password2,
//       name: addEmployee.name,
//       address: addEmployee.address,
//       phone: addEmployee.phone,
//       role: addEmployee.role.toUpperCase(),
//     });

//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: import.meta.env.VITE_API + `/user/signup-employee`,
//       headers: { 
//         'Content-Type': 'application/json'
//       },
//       data: data
//     };

//     axios.request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Employee added successfully!",
//         });
//         setAddEmployee({
//           restaurant: addEmployee.restaurant,
//           email: "",
//           password: "",
//           password2: "",
//           name: "",
//           address: "",
//           phone: "",
//           role: "",
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to add employee. Please try again.",
//         });
//       });
//   };

//   return (
//     <>
//       <AdminMenu />
//       <section id="Employee">
//         <div className="box_Employee">
//           <div className="add-employee-containers">
//             <h2>Add Employee</h2>
//             <form className="add-employee-form" onSubmit={handleSubmit}>
              
//               <div className="add-employee-form">
//                 <label htmlFor="email">Email:</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="Email..."
//                   value={addEmployee.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="add-employee-form">
//                 <label htmlFor="password">Password:</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="Password..."
//                   value={addEmployee.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="add-employee-form">
//                 <label htmlFor="password2">Confirm password:</label>
//                 <input
//                   type="password"
//                   id="password2"
//                   name="password2"
//                   placeholder="Confirm password..."
//                   value={addEmployee.password2}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="add-employee-form">
//                 <label htmlFor="role">Role:</label>
//                 <select
//                   name="role"
//                   value={addEmployee.role}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select role</option>
//                   <option value="counter">Counter</option>
//                   <option value="waiter">Waiter</option>
//                 </select>
//               </div>
//               <div className="button-addemp">
//               <button className="btn-add-newemp">Add Employee</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default AddEmployee;



