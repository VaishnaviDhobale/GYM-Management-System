import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAdmin } from "../../Redux/addAdminReducer/Action";

// for password visibility
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

// to show multiple type of msg's
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// module css
import styles from "./SignUp.module.css";
import axios from "axios";
import { baseUrl } from "../../comman";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";

// Sign Up page start
export const SignUp = () => {
  const [admin, setAdmin] = useState({});
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setConfirmViewPassword] = useState(false);
  const [adminData, setAdminData] = useState({});
  const [isPostLoading, setIsPostLoading] = useState(false);
  const formRef = useRef(); // for clear from after submited
  const dispatch = useDispatch();

  // Handle Form input
  const handleInput = (event) => {
    const { name, value, files } = event.target;
    event.preventDefault();
    if (name === "profileImg") {
      setAdmin({ ...admin, [name]: files[0] });
    } else {
      setAdmin({ ...admin, [name]: value });
    }
  };

  // Check admin alredy exist
  const isAdminAlredyExist = async () => {
    try {
      const adminExists = await axios.get(
        `${baseUrl}/admin/adminByEmail/${admin?.email}`,
        {
          headers: {
            "Content-Type": "application/json",
            adminToken: adminData.adminToken,
          },
        }
      );
      return adminExists;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      return error;
    }
  };

  // Clear form
  const handleReset = () => {
    formRef.current.reset();
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Admin details validation start
    if (!admin.email.includes("@gmail.com")) {
      toast.error("Please enter a valid email address.");
    } else if (admin.password !== admin.confirmPassword) {
      toast.error("Password ans confirm password should be match");
    } else if (admin.contact.length < 10 || admin.contact.length > 10) {
      toast.error("Please enter a valid contact number");
    } else if (admin.password.length <= 8) {
      toast.error("Password length should be greater than 8 characters.");
      // Admin details validation ends
    } else {
      const adminExists = await isAdminAlredyExist();

      if (adminExists.data) {
        toast.error("An admin with the provided email already exists.");
      } else {
        // Adding Package data into the formData;
        const formData = new FormData();
        for (const key in admin) {
          if (Array.isArray(admin[key])) {
            admin[key].forEach((item) => formData.append(`${key}[]`, item));
          } else {
            formData.append(key, admin[key]);
          }
        }

        setIsPostLoading(true);
        const response = await dispatch(
          addAdmin(formData, adminData.adminToken)
        );
        if (response?.status === 200) {
          toast.success(response?.data?.success);
          handleReset();
          setIsPostLoading(false);
        } else {
          setIsPostLoading(false);
          toast.error(response.error || `Unable to add new `);
        }
      }
    }
  };

  useEffect(() => {
    const admin = Cookies.get("admin");
    if (admin) {
      setAdminData(JSON.parse(admin));
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Admin Registration</h1>
        <form
          ref={formRef}
          action=""
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <input
            type="text"
            name="name"
            onChange={handleInput}
            placeholder="Enter name"
            className={styles.inputs}
            required
          />
          <input
            type="text"
            name="email"
            onChange={handleInput}
            placeholder="Enter email"
            className={styles.inputs}
            required
          />
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
            name="password"
            onChange={handleInput}
            placeholder="Enter password"
            className={styles.inputs}
            required
          />
          {/* show and hide confirm pass start */}
          {!viewConfirmPassword ? (
            <FaRegEye
              className={styles.forConfirmPassword}
              onClick={() => {
                setConfirmViewPassword(!viewConfirmPassword);
              }}
            />
          ) : (
            <FaRegEyeSlash
              className={styles.forConfirmPassword}
              onClick={() => {
                setConfirmViewPassword(!viewConfirmPassword);
              }}
            />
          )}
          {/* show and hide confirm pass ends */}
          <input
            type={viewConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            onChange={handleInput}
            placeholder="Confirm password"
            className={styles.inputs}
            required
          />
          <input
            type="text"
            name="contact"
            onChange={handleInput}
            placeholder="Enter contact"
            className={styles.inputs}
            required
          />
          <label htmlFor="profileImg">Profile Image.</label>
          <br />
          <input
            type="file"
            name="profileImg"
            id="profileImg"
            className={styles.inputs}
            onChange={handleInput}
            required
          />
          <input
            type="submit"
            className={`${styles.signUpBtn} ${
              isPostLoading ? "hidden" : ""
            }`}
            value={"Sign Up"}
          />
          {isPostLoading && (
            <div className={styles.spinner}>
              <ReactLoading type="spin" color="white" height={20} width={20} />
            </div>
          )}
        </form>
        <p className={styles.alreadyAccount}>
          Already have account?{" "}
          <span className={styles.alreadyAccountSpan}>Login</span>
        </p>
      </div>
    </>
  );
};
