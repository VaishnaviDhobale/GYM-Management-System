import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMemberById } from "../../Redux/memberReducer/Action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./MemberProfile.module.css";
import { FaCircle } from "react-icons/fa";
import { deleteMsg, getAllPrivateMsgs, sendMsg } from "../../Redux/privateMsgsReducer/Action";
import { LuSend } from "react-icons/lu";
import { RiDeleteBin2Line } from "react-icons/ri";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";

export const MemberProfile = () => {
  const [member, setMember] = useState([]);
  const [privateMsgs, setPrivateMsgs] = useState([]);
  const [msg, setMsg] = useState({});
  const [adminData, setAdminData] = useState({});
  const [activeFormMemberId, setActiveFormMemberId] = useState(null);
  const msgsRef = useRef(null);
  const memberId = useParams().memberId;
  const dispatch = useDispatch();
  const chatHistoryRef = useRef(null);

  const messageData = useSelector((store) => store.privateMsgDetails);

  // Handle get member by id
  const handleGetMemberById = async () => {
    try {
      const response = await dispatch(getMemberById(memberId, adminData.adminToken));
      if (response.status === 200) {
        setMember(response.data);
      } else {
        toast.error(response.error || "Unable to get member.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get private msgs
  const handleGetMsgs = async () => {
    try {
      const response = await dispatch(getAllPrivateMsgs());
      if (response.status === 200) {
        const updatedMsgs = response.data.map((msg, index) => {
          if (index < 2) {
            return { ...msg, user: "User" };
          }
          return msg;
        });
        setPrivateMsgs(updatedMsgs);
        // Scroll to bottom after loading messages
        setTimeout(() => {
          if (msgsRef.current) {
            msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
          }
        }, 100);
      } else {
        toast.error(response.error || "Unable to get messages.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMsg({ ...msg, [name]: value });
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      if (Object.keys(msg).length === 0) {
        toast.error("Message is required.");
        return;
      }
      const updatedMsg = {
        ...msg,
        createdBy: adminData.adminId,
        sendTo: memberId,
        user: "Admin",
      };
      const response = await dispatch(sendMsg(updatedMsg, adminData));
      if (response.status === 200) {
        await handleGetMsgs();
        setMsg({}); // Clear the message
      } else {
        toast.error(response.error || "Unable to send message.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle keydown event
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent the default behavior of adding a newline
      handleSubmit();
    }
  };

  // Scroll down to the chat history
  const handleChatButtonClick = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleForm = (memberId) => {
    setActiveFormMemberId(activeFormMemberId === memberId ? null : memberId);
  };

  // Handle delete msg
  const handleDeleteMsg = async (id) => {
    try {
      const confirm = window.confirm(`Are you sure to delete message with id "${id}"`);
      if (confirm) {
        const response = await dispatch(deleteMsg(id,adminData.adminToken));
        if (response.status === 200) {
          await handleGetMsgs();
        } else {
          toast.error(response.error || `Unable to delete message.`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetMemberById();
    handleGetMsgs();
    const storedAdminData = Cookies.get("admin");
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    }
  }, []);

  if (messageData.isLoading) {
    return (
      <div className={styles.loader}>
        <ReactLoading type="spin" color="#00BFFF" height={40} width={40} />
        <h3>Loading...</h3>
      </div>
    );
  } else if (messageData.isError) {
    return <h1 className= {styles.error}>An error occurred. Please refresh the page and try again.</h1>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.chatHistory} onClick={handleChatButtonClick}>
        Chat
      </button>
      <div className={styles.topContainer}>
        <div className={styles.profileImg}>
          <p className={styles.img}></p>
          <h1 className={styles.memberName}>
            {member?.createdBy?.name &&
              member.createdBy.name.charAt(0).toUpperCase() + member.createdBy.name.slice(1)}
          </h1>
          <p className={styles.phone}>{member?.createdBy?.contact}</p>
          <p className={styles.email}>{member?.createdBy?.email}</p>
        </div>
        <div className={styles.profileInfo}>
          <button className={styles.paymentRecipt}>Payment Receipt</button>
          <h1 className={styles.membershipType}>
            Membership Type -{" "}
            <span>
              {member?.membershipType &&
                member.membershipType.charAt(0).toUpperCase() + member.membershipType.slice(1)}
            </span>
          </h1>
          <div className={styles.physicalInfo}>
            <div className={styles.allergies}>
              {member?.allergies?.length > 0 && (
                <p className={styles.allergieHeading}>Allergies</p>
              )}
              {member?.allergies?.map((allergie, index) => (
                <p className={styles.allergie} key={index}>
                  <FaCircle className={styles.circle} />
                  {allergie}
                </p>
              ))}
            </div>
            <div className={styles.medicals}>
              {member?.medicalConditions?.length > 0 && (
                <p className={styles.medicalHeading}>Medical Conditions</p>
              )}
              {member?.medicalConditions?.map((medical, index) => (
                <p className={styles.medical} key={index}>
                  <FaCircle className={styles.circle} />
                  {medical}
                </p>
              ))}
            </div>
          </div>
          <p className={styles.startDate}>
            Start Date : <span> {member.startDate}</span>
          </p>
        </div>
      </div>
      <div className={styles.allMsgs} ref={chatHistoryRef}>
        <h1 className={styles.msgHeading}>Chat History</h1>
        <div className={styles.msgs} ref={msgsRef}>
          {privateMsgs.map((msg, index) => (
            <div
              className={`${msg.user === "Admin" ? styles.adminMsg : styles.userMsg}`}
              key={index}
              onClick={() => toggleForm(msg._id)}
            >
              {msg?.msg}
              {activeFormMemberId === msg._id && (
                <button className={styles.msgDelete} onClick={() => handleDeleteMsg(msg._id)}>
                  <RiDeleteBin2Line />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className={styles.sendMsgContainer}>
          <textarea
            rows={1}
            type="text"
            className={styles.sendMsg}
            name="msg"
            placeholder="Enter Message"
            value={msg.msg || ""} // Bind the textarea value to the msg state
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Add the keydown event listener
            required
          />
          <button className={styles.sendMsgBtn} onClick={handleSubmit}>
            <LuSend className={styles.btnIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};
