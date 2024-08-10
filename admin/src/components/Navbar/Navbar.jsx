import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { adminById } from "../../Redux/addAdminReducer/Action";
import { toast } from "react-toastify";

// import { RxCross1 } from "react-icons/rx";

export const Navbar = () => {
  const [showResponsiveBox, setShowResponsiveBox] = useState(false);
  const [adminData, setAdminData] = useState({});
  const [showLogoutForm, setShowLogoutForm] = useState(false);
  const navigate = useNavigate();

  // Handle admin logout
  const handleLogout = async (event) => {
    event.preventDefault();
    setShowResponsiveBox(false);
    const response = window.confirm("Do you want to proceed with logging out?");

    if (response) {
      Cookies.remove("admin");
      setShowLogoutForm(false);
      navigate("/login");
      window.location.reload();
    }
  };

  useEffect(() => {
    const admin = Cookies.get("admin");
    if (admin) {
      setAdminData(JSON.parse(admin));
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* Responsive navbar start  */}
      <div className={styles.responsiveNav}>
        {!showResponsiveBox && (
          <div className={styles.threeLines}>
            <IoReorderThreeOutline
              onClick={() => setShowResponsiveBox(!showResponsiveBox)}
            />
          </div>
        )}
        {showResponsiveBox && (
          <div className={styles.responsiveBox}>
            <div
              className={styles.cross}
              onClick={() => setShowResponsiveBox(false)}
            >
              Close
            </div>
            <div className={styles.subContainer1}>
            <NavLink
                to="/trainers"
                className={({ isActive }) =>
                  `${styles.navlink} ${styles.navHover} ${
                    isActive && styles.active
                  }`
                }
                onClick={() => setShowResponsiveBox(false)}
              >
                Trainers
              </NavLink>
              <NavLink
                to="/admins"
                className={({ isActive }) =>
                  `${styles.navlink} ${styles.navHover} ${
                    isActive && styles.active
                  }`
                }
                onClick={() => setShowResponsiveBox(false)}
              >
                Admins
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${styles.navlink} ${styles.navHover} ${
                    isActive && styles.active
                  }`
                }
                to={"/members"}
                onClick={() => setShowResponsiveBox(false)}
              >
                Members
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `${styles.navlink} ${styles.navHover} ${
                    isActive && styles.active
                  }`
                }
                to={"/users"}
                onClick={() => setShowResponsiveBox(false)}
              >
                Users
              </NavLink>
              <NavLink
                to="/packages"
                className={({ isActive }) =>
                  `${styles.navlink} ${styles.navHover} ${
                    isActive && styles.active
                  }`
                }
                onClick={() => setShowResponsiveBox(false)}
              >
                Packages
              </NavLink>

              <NavLink
                to="/supplementStore"
                className={({ isActive }) =>
                  `${styles.navlink} ${styles.navHover} ${
                    isActive && styles.active
                  }`
                }
                onClick={() => setShowResponsiveBox(false)}
              >
                Supplement Store
              </NavLink>
            </div>

            <div className={styles.subContainer2}>
              <NavLink
                className={`${styles.logout} ${styles.navHover}`}
                to={"/logout"}
                onClick={handleLogout}
              >
                Logout
              </NavLink>
              <NavLink
                className={styles.addAdmin}
                to={"/signup"}
                onClick={() => setShowResponsiveBox(false)}
              >
                Admin +
              </NavLink>
            </div>
          </div>
        )}
      </div>
      {/* Responsive navbar ends  */}

      <div className={styles.navContainer}>
        <div className={styles.subContainer1}>
        <NavLink
            to="/trainers"
            className={({ isActive }) =>
              `${styles.navlink} ${styles.navHover} ${
                isActive && styles.underline
              }`
            }
          >
            Trainers
          </NavLink>
          <NavLink
            to="/admins"
            className={({ isActive }) =>
              `${styles.navlink} ${styles.navHover} ${
                isActive && styles.underline
              }`
            }
          >
            Admins
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.navlink} ${styles.navHover} ${
                isActive && styles.underline
              }`
            }
            to={"/members"}
          >
            Members
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${styles.navlink} ${styles.navHover} ${
                isActive && styles.underline
              }`
            }
            to={"/users"}
          >
            Users
          </NavLink>
          <NavLink
            to="/packages"
            className={({ isActive }) =>
              `${styles.navlink} ${styles.navHover} ${
                isActive && styles.underline
              }`
            }
          >
            Packages
          </NavLink>
          <NavLink
            to="/supplementStore"
            className={({ isActive }) =>
              `${styles.navlink} ${styles.navHover} ${
                isActive && styles.underline
              }`
            }
          >
            Supplement Store
          </NavLink>
          
        </div>
        <div className={styles.subContainer2}>
          <NavLink className={styles.addAdmin} to={"/signup"}>
            Admin +
          </NavLink>

          <NavLink
            className={`${styles.logout} ${styles.navHover}`}
            onClick={() => {
              setShowLogoutForm(!showLogoutForm);
            }}
          >
            <p className={styles.profile}>
              <img
                className={styles.profileImg}
                src={adminData.profileImg}
                alt=""
              />
              {/* {adminData?.email?.charAt(0).toUpperCase()} */}
            </p>
          </NavLink>

          {showLogoutForm && (
            <div className={styles.profileBox}>
              {adminData?.email}{" "}
              <span onClick={handleLogout} className={styles.profileLogout}>
                <HiOutlineLogout />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
