import { ImBlocked, ImCross } from "react-icons/im";
import { RiDeleteBin3Fill } from "react-icons/ri";
import styles from "./MemberList.module.css";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import { sendMsg } from "../../Redux/privateMsgsReducer/Action";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const MemberList = ({
  members,
  handleDeleteMembers,
  handleBlock,
  memberListType,
  handleUnblock,
}) => {
  const memberData = useSelector((state) => state.membersDetails);
  const msgData = useSelector((state) => state.privateMsgDetails);
  const [activeFormMemberId, setActiveFormMemberId] = useState(null);
  const [adminData, setAdminData] = useState({});
  const [msg, setMsg] = useState({});
  const dispatch = useDispatch();

  // Handle Change
  const handleChange = async (event) => {
    const { name, value } = event.target;
    setMsg({ ...msg, [name]: value });
  };

  //Handle Submit
  const handleSubmit = async (event, memberId) => {
    event.preventDefault();
    try {
      const updatedMsg = {
        ...msg,
        createdBy: adminData.adminId,
        sendTo: memberId,
        user: JSON.parse(localStorage.getItem("admin")) && "Admin",
      };
      const response = await dispatch(sendMsg(updatedMsg, adminData));
      if (response.status === 200) {
        toast.success(response.data.success);
      } else {
        toast.error(response.error || "Unable to send message.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAdminData(JSON.parse(localStorage.getItem("admin")));
  }, []);

  const toggleForm = (memberId) => {
    setActiveFormMemberId(activeFormMemberId === memberId ? null : memberId);
  };

  return (
    <>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>SR.NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              {memberListType === "regular" && <th>Messages</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <th>{index + 1}</th>
                <th>{member?.createdBy?.name}</th>
                <th>{member?.createdBy?.email}</th>
                <th>{member?.createdBy?.contact}</th>
                {memberListType === "regular" && (
                  <th>
                    <button
                      className={styles.sendBtn}
                      onClick={() => toggleForm(member._id)}
                    >
                      Message
                    </button>
                    {activeFormMemberId === member._id && (
                      <div className={styles.privateMsgFormContainer}>
                        <ImCross
                          className={styles.crossPrivateMsgFoem}
                          onClick={() => {
                            toggleForm(member._id);
                          }}
                        />
                        <form
                          className={styles.privateMsgForm}
                          onSubmit={(event) => {
                            handleSubmit(event, member._id);
                          }}
                        >
                          <input type="text" value={adminData.adminId} />
                          <select name="msgType" onChange={handleChange} required>
                            <option value="">Select Type</option>
                            <option value="General">General</option>
                            <option value="Alert">Alert</option>
                          </select>
                          <textarea
                            name="msg"
                            placeholder="Enter msg"
                            onChange={handleChange}
                            required
                          ></textarea>
                          <br />
                          <input
                            type="submit"
                            value="Send Msg"
                            // className={styles.privateMsgBtn}
                            className={`${styles.privateMsgBtn} ${
                              msgData.postIsLoading ? "hidden" : ""
                            }`}
                          />
                          {msgData.postIsLoading && (
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
                    )}

                    <Link to={`/memberProfile/${member._id}`}><button className={styles.openProfile}>Visit Profile</button></Link>
                  </th>
                )}
                {memberListType === "regular" ? (
                  <th className={styles.action}>
                    <button
                      className={styles.del}
                      onClick={() => handleDeleteMembers(member?._id)}
                    >
                      <RiDeleteBin3Fill className={styles.delIcon} />
                    </button>
                    <button
                      className={styles.del}
                      onClick={() => handleBlock(member)}
                    >
                      <ImBlocked className={styles.delIcon} />
                    </button>
                  </th>
                ) : (
                  <th>
                    <button
                      className={styles.unblockBtn}
                      onClick={() => {
                        handleUnblock(member);
                      }}
                    >
                      Unblock
                    </button>
                  </th>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
