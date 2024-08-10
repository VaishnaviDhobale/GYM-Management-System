import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../comman";
import ReactLoading from "react-loading";


export const Login = () => {
  const [login, setLogin] = useState({
    email : "admin@gmail.com",
    password : "admin@123"
  });
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the page has been refreshed during this session
    if (!sessionStorage.getItem("refreshed")) {
      sessionStorage.setItem("refreshed", "true");
      window.location.reload();
    }
  }, []);

  // Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsPostLoading(true);
      const response = axios.post(`${baseUrl}/admin/login`, login);
      response
        .then(async (result) => {
          console.log(result, "result");
          toast.success(result.data.success);
          const adminData = {
            adminToken: result?.data?.adminToken,
            email: login?.email,
            adminId: result?.data?.adminId,
            profileImg: result?.data?.profileImg,
          };
          setIsPostLoading(false);
          Cookies.set("admin", JSON.stringify(adminData));
          navigate("/trainers");
          window.location.reload();
        })
        .catch((error) => {
          setIsPostLoading(false);
          toast.error(error?.response?.data?.error);
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
            value={login.email}
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
            value={login.password}
          />
          <br />
          <input type="submit" className={`${styles.loginBtn} ${
              isPostLoading ? "hidden" : ""
            }`} value="Login" />
          {isPostLoading && (
            <div className={styles.spinner}>
              <ReactLoading type="spin" color="white" height={20} width={20} />
            </div>
          )}
        </form>
      </div>
    </>
  );
};
