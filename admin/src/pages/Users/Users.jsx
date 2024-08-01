import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllUsers,
  deleteUsers,
  getAllUsers,
} from "../../Redux/userReducer/Action";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import styles from "./User.module.css";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { ImBlocked } from "react-icons/im";
import Cookies from "js-cookie";
import {
  blockUsers,
  getBlockedUsers,
  unblockUser,
} from "../../Redux/blockUsersReducer/action.js";
import ReactLoading from 'react-loading';


export const Users = () => {
  const [adminData, setAdminData] = useState({});
  const [showUsers, setShowUsers] = useState(true);
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.usersDetails);
  const blockedUsersData = useSelector((state) => state.blockUsersDetails);

  // Get Users
  const handleGetUsers = async () => {
    const response = await dispatch(getAllUsers());
    if (response.status === 200) {
       setUsers(response.data);
    } else {
      console.log(response.error || "Not able to fech data.");
    }
  };

  // Get blocked users
  const handleGetBlockedUsers = async () => {
    const response = await dispatch(getBlockedUsers());
    if (response.status === 200) {
       setBlockedUsers(response.data);
    } else {
      console.log(response.error || "Not able to fech data.");
    }
  };

  //   delete User
  const handleDelete = async (id, name) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${name}'s account`
    );

    if (confirm) {
      const response = await dispatch(deleteUsers(id, adminData.adminToken));

      if (response.status === 200) {
         handleGetUsers();
        toast.success(response.data.success);
      } else {
        toast.error(
          response.error || `Unable to delete user with ${id} this id`
        );
      }
    }
  };

  //   block user
  const handleBlock = async (user) => {
    const confirm = window.confirm(
      `Are you sure you want to block ${user.name}'s account.`
    );
    if (confirm) {
      const response = await dispatch(blockUsers(user,adminData.adminToken));

      if (response.status === 200) {
        await handleGetUsers();
        await handleGetBlockedUsers();
        toast.success(response.data.success);
      } else {
        toast.error(response.error || `Unable to block ${user.name}'s account`);
      }
    }
  };

  // Unblock user
  const handleUnblock = async (user) => {
    const confirm = window.confirm(
      `Are you sure you want to unblock ${user.name} ${" "}(${user._id})`
    );
    if (confirm) {
      const response = await dispatch(unblockUser(user,adminData.adminToken));
      if (response?.status === 200) {
        await handleGetBlockedUsers();
        toast.success(response?.data?.success);
      } else {
        toast.error(
          response?.error || "Something went wrong while blocking member"
        );
      }
    }
  };

  // Search user
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.value;
    const filtered = showUsers
      ? userData?.users.filter((user, index) => {
          return (
            user?._id?.toLowerCase().includes(query.toLowerCase()) ||
            user?.name?.toLowerCase().includes(query.toLowerCase()) ||
            user?.email?.toLowerCase().includes(query.toLowerCase()) ||
            users?.contact?.toLowerCase().includes(query.toLowerCase())
          );
        })
      : blockedUsersData.blockedUsers.filter((user, index) => {
          return (
            user?._id?.toLowerCase().includes(query.toLowerCase()) ||
            user?.name?.toLowerCase().includes(query.toLowerCase()) ||
            user?.email?.toLowerCase().includes(query.toLowerCase()) ||
            user?.contact?.toLowerCase().includes(query.toLowerCase())
          );
        });

    showUsers ? setUsers(filtered) : setBlockedUsers(filtered);
  };

  // Delete All Users
  const handleDeleteAllUsers = async () => {
    const confirm = window.confirm(`Are you sure you want to delete all users`);

    if (confirm) {
      const response = await dispatch(deleteAllUsers(adminData.adminToken));

      if (response.status === 200) {
        await handleGetUsers();
        toast.success(response.data.success);
      } else {
        toast.error(response.error || `Unable to delete users`);
      }
    }
  };

  useEffect(() => {
    handleGetUsers();
    handleGetBlockedUsers();
    const admin = Cookies.get("admin");
    if(admin){
      setAdminData(JSON.parse(admin));
    }
  }, []);

  if (userData.isLoading) {
    return <div className={styles.loader}>
    <ReactLoading type="spin" color="#00BFFF" height={40} width={40} />
    <h3>Loading...</h3>
  </div>
  } else if (userData.isError) {
    return <h1 className= {styles.error}>An error occurred. Please refresh the page and try again.</h1>;
  }
 
  return (
    <>
      {userData.users.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.topContainer}>
            <div className={styles.search}>
              <input
                type="search"
                name=""
                id=""
                placeholder="You can search users by their ID..."
                className={styles.searchInput}
                onInput={handleSearch}
              />
            </div>
            <div className={styles.blockUsersListBtn}>
              {showUsers && blockedUsers.length > 0 && (
                <button
                  className={styles.detailsBtns}
                  onClick={() => {
                    setShowUsers(false);
                  }}
                >
                  Blocked List
                </button>
              )}
              {!showUsers && blockedUsers.length > 0 && (
                <button
                  className={styles.detailsBtns}
                  onClick={() => {
                    setShowUsers(true);
                  }}
                >
                  Users List
                </button>
              )}

              {showUsers && (
                <button
                  className={styles.deleteAllBtn}
                  onClick={handleDeleteAllUsers}
                >
                  Delete All
                </button>
              )}

              {showUsers ? (
                <p className={styles.allUsers}>{users.length}</p>
              ) : (
                <p className={styles.allUsers}>{blockedUsers.length}</p>
              )}
            </div>
          </div>
          {showUsers ? (
            <table>
              <thead>
                <tr>
                  <th>SR NO.</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.reverse().map((user, index) => {
                  return (
                    <tr>
                      <th>{index + 1}</th>
                      <th>{user.name}</th>
                      <th>{user.contact}</th>
                      <th>{user.email}</th>
                      <th className={styles.action}>
                        <button
                          className={styles.del}
                          onClick={() => {
                            handleDelete(user._id, user.name);
                          }}
                        >
                          {" "}
                          <RiDeleteBin3Fill className={styles.delIcon} />
                        </button>
                        <button
                          className={styles.del}
                          onClick={() => {
                            handleBlock(user);
                          }}
                        >
                          <ImBlocked className={styles.delIcon} />
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>SR NO.</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {blockedUsers.reverse().map((user, index) => {
                  return (
                    <tr>
                      <th>{index + 1}</th>
                      <th>{user.name}</th>
                      <th>{user.contact}</th>
                      <th>{user.email}</th>
                      <th className={styles.action}>
                        <button
                          onClick={() => handleUnblock(user)}
                          className={styles.unblockBtn}
                        >
                          Unblock
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className={styles.noDataContainer}>
          <div className={styles.noDataDetails}>
            <h1>Currently, There Are No Users.</h1>
            {blockUsers.length > 0 && (
              <button
                className={styles.blockListBtn}
                onClick={() => {
                  setShowUsers(!showUsers);
                }}
              >
                Blocked List
              </button>
            )}
          </div>
          {showUsers && (
            <table>
              <thead>
                <tr>
                  <th>SR NO.</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {blockedUsers.reverse().map((user, index) => {
                  return (
                    <tr>
                      <th>{index + 1}</th>
                      <th>{user.name}</th>
                      <th>{user.contact}</th>
                      <th>{user.email}</th>
                      <th className={styles.action}>
                        <button
                          onClick={() => handleUnblock(user)}
                          className={styles.unblockBtn}
                        >
                          Unblock
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};
