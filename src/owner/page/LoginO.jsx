import React, { useState } from "react";
import "./css/logino.css";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Menubar from "./Menubar";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Menufooter from "../../components/Menufooter";

const LoginO = () => {
  const login_en = "Login";
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    console.log("Data..........", data);

    axios
      .request(config)
      .then((response) => {
        const result = response.data;
        const user = {
          user_id: result.user_id,
          is_admin: result.is_admin,
          store_id: result.store_id,
          user_name: result.user_name,
          origin_store_name: result.origin_store_name,
          email: result.email,
          image: result.image,
          restaurant_id: result.restaurant_id,
          restaurnt_name: result.restaurnt_name,
          employee_id: result.employee_id,
          employee_role: result.employee_role,
        };

        const token = result.token.access;
        if (token) {
          window.localStorage.setItem("token", token);
        }
        window.localStorage.setItem("user", JSON.stringify(user));

        if (user.restaurant_id) {
          window.localStorage.setItem(
            "restaurant",
            JSON.stringify(user.restaurant_id)
          );
          navigate("/home", { replace: true });
        } else if (user.is_admin) {
          window.localStorage.setItem(
            "restaurant",
            JSON.stringify(user.is_admin)
          );
          navigate("/restaurant_admin", { replace: true });
        } else if (user.employee_id) {
          window.localStorage.setItem(
            "restaurant",
            JSON.stringify(user.employee_id)
          );
          navigate("/counter", { replace: true });
        } else {
          navigate("/logino", { replace: true });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          MySwal.fire({
            icon: 'question',
            title: 'Oops...',
            text: error.response.data.message || 'Something went wrong!',
          });
        } else {
          MySwal.fire({
            icon: 'question',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      });
  };

  return (
    <>
      {/* <Menufooter /> */}
      <div className="box_container_logino">
        <div className="container-box-logino">
          <Link to="/" className="box-icon-close">
            <IoClose />
          </Link>
          <div className="contian-box-logino">
            <h3>{login_en}</h3>
            <p>Please login to use the service!</p>
            <div className="input_boxForm-login">
              <label>Email</label>
              <input
                className="input_form"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={handleEmail}
              />
              <label>Password</label>
              <input
                className="input_form"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={handlePassword}
              />
            </div>

            {errorText.length > 0 && (
              <div id="error_msg" className="error mt20">
                {errorText}
              </div>
            )}

            <div className="forgot_password2">
              Forgot your password? {"\n"}
              <Link to="#" className="findpassword2">
                Find password
              </Link>
            </div>

            <button type="submit" className="login_btn2" onClick={handleLogin}>
              Login
            </button>
            <div className="dont_account">
              Is this your first time? {"\n"}
              <Link to="/signup1" className="signup2">
                Join the membership
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Menubar /> */}
    </>
  );
};

export default LoginO;
