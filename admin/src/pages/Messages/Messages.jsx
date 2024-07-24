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

export const Messages = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(true);
  const [msgForUpdate, setMsgForUpdate] = useState({
    message: "",
    type: "",
    sender: "",
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
      const response = await dispatch(deleteMessages(id));
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
      updateMessages({ ...msgForUpdate, sender: adminId })
    );
    if (response?.status === 200) {
      await handleGetMessages();
      toast.success(response?.data?.success);
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
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (adminData) {
      setAdminId(adminData.adminId);
      setMsgForUpdate((prevMsg) => ({
        ...prevMsg,
        sender: adminData.adminId,
      }));
    }
  }, []);

  if (msgDetails.isLoading) {
    return (
      <div className={styles.loader}>
        <ReactLoading type="spin" color="#00BFFF" height={40} width={40} />
        <h3>Loading...</h3>
      </div>
    );
  } else if (msgDetails.isError) {
    return <h1>Error...</h1>;
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
                  <h1 className={styles.sender}>
                    <span className={styles.bold}>Sender - </span>{" "}
                    {msg.sender.name}
                  </h1>

                  <div className={styles.btns}>
                    <button
                      className={styles.del}
                      onClick={() => {
                        handleDelete(msg._id);
                      }}
                    >
                      {msgDetails.deleteIsLoading ? (
                        <ReactLoading
                          type="spin"
                          color="white"
                          height={20}
                          width={20}
                        />
                      ) : (
                        <RiDeleteBin3Fill className={styles.delIcon} />
                      )}
                    </button>
                    <button
                      className={styles.edit}
                      onClick={() => {
                        setShowEditForm(true);
                        setMsgForUpdate({
                          _id: msg._id,
                          message: msg.message,
                          type: msg.type,
                          sender: msg.sender.name,
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

          {showEditForm && (
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
                <input
                  type="text"
                  placeholder="Enter id"
                  onChange={(event) => {
                    setMsgForUpdate({
                      ...msgForUpdate,
                      sender: event.target.value,
                    });
                  }}
                  value={msgForUpdate.sender}
                />
                {msgDetails.updateIsLoading ? (
                  <div className={styles.updateLoader}>
                    <ReactLoading
                      type="spin"
                      color="white"
                      height={30}
                      width={30}
                    />
                  </div>
                ) : (
                  <input
                    type="submit"
                    value="Update"
                    className={styles.updateBtn}
                  />
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
