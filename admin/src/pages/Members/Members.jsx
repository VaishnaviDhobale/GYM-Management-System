import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMember, getMembers } from "../../Redux/memberReducer/Action";
import { toast } from "react-toastify";

// Icons
import { RxCross2 } from "react-icons/rx";

import styles from "./Members.module.css";
import { addMsg } from "../../Redux/messageReducer/Action";
import { MemberList } from "../../components/MemberList/MemberList";
import {
  blockMember,
  getBlockedMembers,
} from "../../Redux/blockedMember/Action";

export const Members = () => {
  const [members, setMembers] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [showMsgToAllForm, setShowMsgToAllForm] = useState(false);
  const [showBlockedMember, setShowBlockedMember] = useState(false);
  const [showMembers, setShowMembers] = useState(true);
  const [blockMembersList, setBlockedMembersList] = useState([]);
  // const [adminToken, setAdminToken] = useState(null);

  const [publicMsg, setPublicMsg] = useState({
    message: "",
    type: "",
    sender: adminId,
    msgType: "Public",
  });

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const memberData = useSelector((state) => state.memberDetails);

  //   Get member
  const getMember = async () => {
    const response = await dispatch(getMembers());
    await setMembers(response);
  };

  // Get Blocked Members
  const getBlockedMembersList = async () => {
    const response = await dispatch(getBlockedMembers());
    if (response.status === 200) {
      await setBlockedMembersList(response.data);
    } else {
      toast.error(
        response?.error || "Something went wrong while getting blocked member."
      );
    }
  };


  // Search member
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.value;
    const filtered = memberData.members.filter((member, index) => {
      return (
        member._id.toLowerCase().includes(query.toLowerCase()) ||
        member.createdBy.name.toLowerCase().includes(query.toLowerCase()) ||
        member.createdBy.email.toLowerCase().includes(query.toLowerCase()) ||
        member.createdBy.contact.toLowerCase().includes(query.toLowerCase())
      );
    });
    setMembers(filtered);
  };

  //   Send msg to all
  const sendMsgToAll = async (event) => {
    event.preventDefault();
    const response = await dispatch(addMsg(publicMsg));
    if (response.status === 200) {
      setShowMsgToAllForm(false);
      toast.success(response?.data?.success);
    } else {
      toast.error(
        response?.error || "Something went wrong while sending message"
      );
    }
  };

  // Delete member
  const deleteMembers = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this member"
    );
    if (confirm) {
      const response = await dispatch(deleteMember(id));
      if (response.status === 200) {
        getMember();
        toast.success(response?.data?.success);
      } else {
        toast.error(
          response?.error || "Something went wrong while deleting member"
        );
      }
    }
  };

  // Block members
  const blockMembers = async (member) => {
    const confirm = window.confirm(
      `Are you sure you want to block ${member?.createdBy?.name}`
    );
    if (confirm) {
      // console.log(memberWithToken)
      const response = await dispatch(blockMember(member));
      if (response.status === 200) {
        await getMember();
        toast.success(response.data.success);
      } else {
        toast.error(
          response?.error || "Something went wrong while blocking member"
        );
      }
    }
  };

  useEffect(() => {
    getMember();
    getBlockedMembersList();
    const adminData = JSON.parse(localStorage.getItem("admin"));
    // setAdminToken(adminData.adminToken);
    if (adminData) {
      setAdminId(adminData.adminId);
      setPublicMsg((prevMsg) => ({
        ...prevMsg,
        sender: adminData.adminId,
      }));
    }
  }, []);

  if (memberData.isLoading) {
    return <h1>Loading...</h1>;
  } else if (memberData.isError) {
    return <h1>There is an Error please referesh page</h1>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.detailsContainer}>
          <div>
            <input
              type="search"
              name=""
              className={styles.search}
              placeholder="Search members..."
              onInput={handleSearch}
            />
          </div>
          <div className={styles.rightDetails}>
            {showMsgToAllForm && (
              <div className={styles.msgToAllContainer}>
                <div
                  className={styles.cross}
                  onClick={() => {
                    setShowMsgToAllForm(false);
                  }}
                >
                  {" "}
                  <RxCross2 className={styles.crossIcon} />
                </div>
                <form
                  action=""
                  className={styles.msgToAllForm}
                  onSubmit={sendMsgToAll}
                >
                  <textarea
                    name="message"
                    id=""
                    placeholder="Enter msg"
                    onChange={(e) => {
                      setPublicMsg({
                        ...publicMsg,
                        message: e.target.value,
                      });
                    }}
                  ></textarea>{" "}
                  <br />
                  <select
                    name="type"
                    id=""
                    onChange={(e) => {
                      setPublicMsg({
                        ...publicMsg,
                        type: e.target.value,
                      });
                    }}
                  >
                    <option value="">Select Type</option>
                    <option value="general">General</option>
                    <option value="alert">Alert</option>
                  </select>{" "}
                  <br />
                  <input
                    type="text"
                    placeholder="Sender"
                    name="sender"
                    onChange={(e) => {
                      setPublicMsg({
                        ...publicMsg,
                        sender: e.target.value,
                      });
                    }}
                    value={publicMsg.sender}
                  />{" "}
                  <br />
                  <input
                    type="submit"
                    value="Send"
                    className={styles.sendAllMsgBtn}
                  />
                </form>
              </div>
            )}
            {showMembers && (
              <button
                className={styles.detailsBtns}
                onClick={() => {
                  setShowMsgToAllForm(true);
                }}
              >
                Msg All
              </button>
            )}
            {showMembers ? (
              <button
                className={styles.detailsBtns}
                onClick={() => {
                  setShowBlockedMember(true);
                  setShowMembers(false);
                }}
              >
                Blocked List
              </button>
            ) : (
              <button
                className={styles.detailsBtns}
                onClick={() => {
                  setShowMembers(true);
                  setShowBlockedMember(false);
                }}
              >
                Members List
              </button>
            )}
            <p className={styles.allMembers}>{showMembers ? members.length : blockMembersList.length}</p>          </div>
        </div>
        <p className={styles.note}> You can also find members by their ID.</p>
        <div className={styles.tableContainer}>
          {showMembers ? (
            <MemberList
              members={members}
              deleteMembers={deleteMembers}
              blockMembers={blockMembers}
              memberListType="regular"
            />
          ) : (
            <MemberList
              members={blockMembersList}
              memberListType="blocked"
            />
          )}
        </div>
      </div>
    </>
  );
};
