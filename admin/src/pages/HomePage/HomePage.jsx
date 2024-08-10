import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const HomePage = () => {
    const [adminData, setAdminData] = useState({});

  useEffect(() => {
    const storedAdminData = Cookies.get("admin");
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    }
  }, []);

  console.log(adminData);
    return<>
        <h1>Welcome to homepage</h1>
    </>
}