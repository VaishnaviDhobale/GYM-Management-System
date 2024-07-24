import { useEffect, useState } from "react";
import styles from "./Login.module.css";

// to show multiple type of msg's
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// for password visibility
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

import { useNavigate } from "react-router-dom"; // to redirect user on another page
import axios from "axios";
import { baseUrl } from "../../comman";

export const Login = () => {
  const [login, setLogin] = useState({});
  const [viewPassword, setViewPassword] = useState(false);
  const [adminToken,setAdminToken] = useState("")
  const navigate = useNavigate();

  if(adminToken){
    navigate("/home")
  }

  // Handle Submit 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = axios.post(`${baseUrl}/admin/login`, login);
      response
        .then(async (result) => {
          toast.success(result.data.success);
          await localStorage.setItem(
            "admin",
            JSON.stringify({
              adminToken: result.data.adminToken,
              email: login.email,
              adminId : result.data.adminId
            })
          );
          navigate("/members");
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    } catch (error) {
      toast.error("An error occurred while processing the login request.");
    }
  };

  // Handle input change 
  const handleInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  useEffect(()=>{
   setAdminToken( JSON.parse(localStorage.getItem('admin')).adminToken)
  },[]);

  
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Admin Login</h1>
        <form action="" onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            className={styles.inputs}
            required
            placeholder="Enter Email"
            name="email"
            onChange={handleInput}
          />{" "}
          <br />
          {/* show and hide pass start */}
          {!viewPassword ? (
            <FaRegEye
              className={styles.forPassword}
              onClick={() => {
                setViewPassword(!viewPassword);
              }}
            />
          ) : (
            <FaRegEyeSlash
              className={styles.forPassword}
              onClick={() => {
                setViewPassword(!viewPassword);
              }}
            />
          )}
          {/* show and hide pass ends */}
          <input
            type={viewPassword ? "text" : "password"}
            className={styles.inputs}
            required
            placeholder="Enter password"
            name="password"
            onChange={handleInput}
          />
          <br />
          <input type="submit" className={styles.loginBtn} value="Login" />
        </form>
        <p className={styles.noAccount}>
          Don't have account?{" "}
          <span className={styles.noAccountSpan}>Sign Up</span>
        </p>
      </div>
    </>
  );
};
