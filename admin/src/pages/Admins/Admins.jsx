import { useEffect, useState } from "react";
import styles from "./Admins.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins } from "../../Redux/addAdminReducer/Action";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";

export const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [adminData, setAdminData] = useState({});
  const dispatch = useDispatch();
  const adminDetails = useSelector((store) => {
    return store.adminDetails;
  });
  // Handle get admins
  const handleGetAdmins = async () => {
    try {
      const response = await dispatch(getAdmins());
      if (response.status === 200) {
        setAdmins(response?.data.reverse());
      } else {
        toast.error(response.error || `Unable to load admins.`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAdmins();
    const adminData = Cookies.get("admin");
    if (adminData) {
      setAdminData(JSON.parse(adminData));
    }
  }, []);

  // Search packages basis of package info or admin info
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.value;
    // console.log(adminDetails)
    const filtered = adminDetails?.admins?.filter((admin, index) => {
      return (
        admin._id.toLowerCase().includes(query.toLowerCase()) ||
        admin.name.toLowerCase().includes(query.toLowerCase()) ||
        admin.email.toLowerCase().includes(query.toLowerCase()) ||
        admin.contact.toLowerCase().includes(query.toLowerCase())
      );
    });

    setAdmins(filtered);
  };
  
  if (adminDetails.isLoading) {
    return (
      <div className={styles.loader}>
        <ReactLoading type="spin" color="#00BFFF" height={40} width={40} />
        <h3>Loading...</h3>
      </div>
    );
  } else if (adminDetails.isError) {
    return <h1 className= {styles.error}>An error occurred. Please refresh the page and try again.</h1>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topDetails}>
          <input
            type="search"
            onInput={handleSearch}
            className={styles.search}
            placeholder="You can search Admin by Admin ID and Admin details..."
          />
        </div>
        <div className={styles.tableDetails}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>SR.NO</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.contact}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
