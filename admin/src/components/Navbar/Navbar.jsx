import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";

// import { RxCross1 } from "react-icons/rx";

export const Navbar = () => {
  const [showResponsiveBox, setShowResponsiveBox] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [showLogoutForm, setShowLogoutForm] = useState(false);
  const navigate = useNavigate();

  // Handle admin logout
  const handleLogout = async (event) => {
    event.preventDefault();
    await setShowResponsiveBox(false);
    let response = window.confirm("Do you want to proceed with logging out?");
    if (response) {
      localStorage.setItem(
        "admin",
        JSON.stringify({ adminToken: null, email: null, adminId: null })
      );
      setShowLogoutForm(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    setAdminData(JSON.parse(localStorage.getItem("admin")));
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
                className={({ isActive }) =>
                  `${styles.navlink} ${styles.navHover} ${
                    isActive && styles.active
                  }`
                }
                to={"/home"}
                onClick={() => setShowResponsiveBox(false)}
              >
                Home
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
            className={({ isActive }) =>
              `${styles.navlink} ${styles.navHover} ${
                isActive && styles.underline
              }`
            }
            to={"/home"}
          >
            Home
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
              {adminData?.email?.charAt(0).toUpperCase()}
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
