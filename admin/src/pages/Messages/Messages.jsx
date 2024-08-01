import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessages,
  getMessages,
  updateMessages,
} from "../../Redux/messageReducer/Action";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import styles from "./Messages.module.css";
import { RiDeleteBin3Fill, RiFileEditFill } from "react-icons/ri";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";

export const Messages = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [msgForUpdate, setMsgForUpdate] = useState({
    message: "",
    type: "",
    // sender: adminData.adminId,
  });
  const msgDetails = useSelector((state) => state.messageDetails);

  // Get all messages
  const handleGetMessages = async () => {
    const response = await dispatch(getMessages());

    if (response?.status === 200) {
      await setMessages(response?.data.reverse());
    } else {
      toast.error(response?.error || "Fail to fetch data");
    }
  };

  // Delete msg
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete message?");
    if (confirm) {
      const response = await dispatch(deleteMessages(id,adminData.adminToken));
      if (response?.status === 200) {
        await handleGetMessages();
        toast.success(response?.data?.success);
      } else {
        toast.error(response?.error || "Unable to delete message.");
      }
    }
  };

  // Update messages
  const handleUpdate = async (event) => {
    event.preventDefault();

    const response = await dispatch(
      updateMessages({ ...msgForUpdate, sender: adminData.adminId },adminData.adminToken)
    );
    if (response?.status === 200) {
      toast.success(response?.data?.success);
      handleGetMessages();
    } else {
      toast.error(response?.error || "Unable to update message.");
    }
  };

  // Handle Search
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.value;
    const filtered = msgDetails.messages.filter((message, index) => {
      return (
        message._id.toLowerCase().includes(query.toLowerCase()) ||
        message.sender.name.toLowerCase().includes(query.toLowerCase()) ||
        message.message.toLowerCase().includes(query.toLowerCase())
      );
    });
    setMessages(filtered);
  };

  useEffect(() => {
    handleGetMessages();
    const adminData = Cookies.get("admin");
    if (adminData) {
      setAdminData(JSON.parse(adminData));
    }
  }, []);

  // console.log(messages);

  if (msgDetails.isLoading) {
    return (
      <div className={styles.loader}>
        <ReactLoading type="spin" color="#00BFFF" height={40} width={40} />
        <h3>Loading...</h3>
      </div>
    );
  } else if (msgDetails.isError) {
    return <h1 className= {styles.error}>An error occurred. Please refresh the page and try again.</h1>;
  }

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.msgDesign} ${showEditForm && styles.opacity}`}
        >
          {messages.map((msg, index) => {
            return (
              <div className={styles.msgDesignSubContainer} key={msg._id}>
                <div className={styles.buttonsContainer}>
                  <div className={styles.types}>
                    {msg.type === "general" ? (
                      <p className={styles.general}>
                        {msg.type.charAt(0).toUpperCase() + msg.type.slice(1)}
                      </p>
                    ) : (
                      <p className={styles.alert}>
                        {msg.type.charAt(0).toUpperCase() + msg.type.slice(1)}
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.infoContainer}>
                  <h1 className={styles.msg}>
                    <span className={styles.bold}>Message - </span>{" "}
                    {msg.message}
                  </h1>

                  <div className={styles.btns}>
                    <button
                      className={styles.del}
                      onClick={() => {
                        handleDelete(msg._id);
                      }}
                    >
                      <RiDeleteBin3Fill className={styles.delIcon} />
                    </button>
                    <button
                      className={styles.edit}
                      onClick={() => {
                        setShowEditForm(true);
                        setMsgForUpdate({
                          _id: msg._id,
                          message: msg.message,
                          type: msg.type,
                          // sender: msg.sender.name,
                        });
                      }}
                    >
                      <RiFileEditFill className={styles.editIcon} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.editMsgFormDetails}>
          <div className={styles.search}>
            <input
              type="search"
              placeholder="Search Messages..."
              onInput={handleSearch}
            />
          </div>

          {showEditForm ? (
            <div className={styles.editMsgForm}>
              <div
                className={styles.cross}
                onClick={() => {
                  setShowEditForm(false);
                }}
              >
                <RxCross2 />
              </div>
              <form onSubmit={handleUpdate}>
                <textarea
                  name="message"
                  placeholder="Edit message"
                  onChange={(event) => {
                    setMsgForUpdate({
                      ...msgForUpdate,
                      message: event.target.value,
                    });
                  }}
                  value={msgForUpdate.message}
                ></textarea>{" "}
                <br />
                <select
                  name="type"
                  onChange={(event) => {
                    setMsgForUpdate({
                      ...msgForUpdate,
                      type: event.target.value,
                    });
                  }}
                  value={msgForUpdate.type}
                >
                  <option value="">Select Type</option>
                  <option value="general">General</option>
                  <option value="alert">Alert</option>
                </select>{" "}
                <br />
                {/* <input
                  type="text"
                  placeholder="Enter id"
                  onChange={(event) => {
                    setMsgForUpdate({
                      ...msgForUpdate,
                      sender: event.target.value,
                    });
                  }}
                  value={msgForUpdate.sender}
                /> */}
                <input
                  type="submit"
                  value="Update"
                  // className={styles.updateBtn}
                  className={`${styles.updateBtn} ${
                    msgDetails.postIsLoading ? "hidden" : ""
                  }`}
                />
                {msgDetails.postIsLoading && (
                  <div className={styles.spinner}>
                    <ReactLoading
                      type="spin"
                      color="white"
                      height={20}
                      width={20}
                    />
                  </div>
                )}
              </form>
            </div>
          ): <h1 className={styles.displayMsg}>The update form will appear in this space when you click the update button.</h1>}
        </div>
      </div>
    </>
  );
};
