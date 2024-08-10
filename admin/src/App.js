import "./App.css";
import { LoginNavbar } from "./components/LoginNavbar/LoginNavbar.jsx";
import { MainRoutes } from "./pages/MainRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {

  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    const storedAdminData = Cookies.get("admin");
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    }
  }, []);


  return (
    <div className="font-sans">
      <ToastContainer position="top-center" />
      {adminData?.adminToken ? <Navbar /> : <LoginNavbar />}
      <MainRoutes />
    </div>
  );
}

export default App;
