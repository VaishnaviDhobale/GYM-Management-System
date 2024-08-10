import { NavLink } from "react-router-dom"
import styles from "./LoginNavbar.module.css"

export const LoginNavbar = () =>{
    return <>
        <NavLink to="/login" className={styles.login}>
            Login
        </NavLink>
    </>
}