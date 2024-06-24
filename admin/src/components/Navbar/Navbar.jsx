import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = (event) => {
        event.preventDefault()
       let response =  window.confirm("Do you want to proceed with logging out?");
       if(response){
        localStorage.setItem("admin",JSON.stringify({adminToken : null, email : null,adminId : null}));
        navigate("/login")
       }
    }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer1}>
          <NavLink
            className={`${styles.navlink} ${styles.navHover}`}
            to={"/home"}
          >
            Home
          </NavLink>
          <NavLink
            className={`${styles.navlink} ${styles.navHover}`}
            to={"/members"}
          >
            Members
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
          <NavLink className={styles.addAdmin} to={"/signup"}>Admin +</NavLink>
        </div>
      </div>
    </>
  );
};
