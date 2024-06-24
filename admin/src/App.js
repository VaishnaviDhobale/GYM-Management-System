import "./App.css";

import { LoginNavbar } from "./components/LoginNavbar/LoginNavbar.jsx";
import { MainRoutes } from "./pages/MainRoutes";

import { ToastContainer } from "react-toastify"; // to set msg container possition
import "react-toastify/dist/ReactToastify.css"; // css for msg container

import { Navbar } from "./components/Navbar/Navbar.jsx";
import { useEffect, useState } from "react";

function App() {
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    setAdminToken(JSON.parse(localStorage.getItem("admin")).adminToken);
  }, []);
  return (
    <div class="font-sans">
      <ToastContainer position="top-center" />
      {adminToken ? <Navbar /> : <LoginNavbar />}
      <MainRoutes />
    </div>
  );
}

export default App;
