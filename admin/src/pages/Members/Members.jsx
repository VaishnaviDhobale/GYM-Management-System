import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllMembers,
  deleteMembers,
  getMembers,
} from "../../Redux/memberReducer/Action";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { addMessages } from "../../Redux/messageReducer/Action";
import { MemberList } from "../../components/MemberList/MemberList";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";

import {
  blockMembers,
  getBlockedMembers,
  unblockMembers,
} from "../../Redux/blockedMember/Action";
import styles from "./Members.module.css";
import { Link } from "react-router-dom";

export const Members = () => {
  const [members, setMembers] = useState([]);
  // const [adminId, setAdminId] = useState(null);
  const [showMsgToAllForm, setShowMsgToAllForm] = useState(false);
  const [showBlockedMember, setShowBlockedMember] = useState(false);
  const [showMembers, setShowMembers] = useState(true);
  const [blockMembersList, setBlockedMembersList] = useState([]);
  // const [adminToken, setAdminToken] = useState(null);
  const [openThreeDots, setOpenThreeDots] = useState(false);
  const [adminData, setAdminData] = useState({});
  // console.log(adminData)

  const [publicMsg, setPublicMsg] = useState({
    message: "",
    type: "",
    sender: adminData.adminId,
    msgType: "Public",
  });

  const dispatch = useDispatch();
  const memberData = useSelector((state) => state.memberDetails);
  const blockMembersData = useSelector((state) => state.blockMembersDetails);

  // Get member
  const handleGetMembers = async () => {
    // console.log(adminToken);
    const response = await dispatch(getMembers(adminData?.adminToken));
    if (response.status === 200) {
      // console.log(response.data)
      await setMembers(response?.data);
    } else {
      console.log(
        response?.error || "Something went wrong while getting members."
      );
    }
  };

  // Get Blocked Members
  const handleGetBlockedMembers = async () => {
    try {
      const response = await dispatch(getBlockedMembers());
      if (response.status === 200) {
        await setBlockedMembersList(response.data);
        if (response.data.length < 1 && showBlockedMember) {
          window.location.reload();
        }
      } else {
        console.log(
          response?.error ||
            "Something went wrong while getting blocked member."
        );
      }
    } catch (error) {
      console.error("Failed to fetch blocked members list", error);
      toast.error("Failed to fetch blocked members list");
    }
  };

  // Search member
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.value;

    const filtered = showMembers
      ? memberData.members.filter((member, index) => {
          return (
            member._id.toLowerCase().includes(query.toLowerCase()) ||
            member.createdBy.name.toLowerCase().includes(query.toLowerCase()) ||
            member.createdBy.email
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            member.createdBy.contact.toLowerCase().includes(query.toLowerCase())
          );
        })
      : blockMembersData.blockedMembers.filter((member, index) => {
          return (
            member._id.toLowerCase().includes(query.toLowerCase()) ||
            member.createdBy.name.toLowerCase().includes(query.toLowerCase()) ||
            member.createdBy.email
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            member.createdBy.contact.toLowerCase().includes(query.toLowerCase())
          );
        });

    showMembers ? setMembers(filtered) : setBlockedMembersList(filtered);
  };

  // Send msg to all
  const handleSendMsgToAll = async (event) => {
    event.preventDefault();
    const updatedPublicMsg = { ...publicMsg, sender: adminData.adminId };
    const response = await dispatch(
      addMessages(updatedPublicMsg, adminData.adminToken)
    );
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
  const handleDeleteMembers = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this member"
    );
    if (confirm) {
      const response = await dispatch(deleteMembers(id, adminData.adminToken));
      if (response.status === 200) {
        handleGetMembers();
        toast.success(response?.data?.success);
      } else {
        toast.error(
          response?.error || "Something went wrong while deleting member"
        );
      }
    }
  };

  // Block members
  const handleBlock = async (member) => {
    const confirm = window.confirm(
      `Are you sure you want to block ${member?.createdBy?.name}`
    );
    if (confirm) {
      // console.log(memberWithToken)
      const response = await dispatch(blockMembers(member,adminData.adminToken));
      if (response.status === 200) {
        await handleGetMembers();
        await handleGetBlockedMembers();
        toast.success(response.data.success);
      } else {
        toast.error(
          response?.error || "Something went wrong while blocking member"
        );
      }
    }
  };

  // Unblock members
  const handleUnblock = async (member) => {
    const confirm = window.confirm(
      `Are you sure you want to unblock ${member.createdBy.name} ${" "}(${
        member._id
      })`
    );
    if (confirm) {
      const response = await dispatch(unblockMembers(member,adminData.adminToken));
      if (response?.status === 200) {
        await handleGetBlockedMembers();
        toast.success(response?.data?.success);
      } else {
        toast.error(
          response?.error || "Something went wrong while blocking member"
        );
      }
    }
  };

  // Delete All members
  const handleDeleteAllUsers = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete all members`
    );

    if (confirm) {
      const response = await dispatch(deleteAllMembers(adminData.adminToken));

      if (response.status === 200) {
        await handleGetMembers();
        toast.success(response.data.success);
      } else {
        toast.error(response.error || `Unable to delete members`);
      }
    }
  };

  useEffect(() => {
    handleGetMembers();
    handleGetBlockedMembers();
    const adminData = Cookies.get("admin");
    if (adminData) {
      setAdminData(JSON.parse(adminData));
    }
  }, []);

  // console.log(memberData);
  if (memberData.isLoading) {
    return (
      <div className={styles.loader}>
        <ReactLoading type="spin" color="#00BFFF" height={40} width={40} />
        <h3>Loading...</h3>
      </div>
    );
  } else if (memberData.isError) {
    return <h1 className= {styles.error}>An error occurred. Please refresh the page and try again.</h1>;
  }

  // console.log(memberData);

  return (
    <>
      {memberData.members.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.detailsContainer}>
            <div className={styles.leftDetails}>
              <input
                type="search"
                name=""
                className={styles.search}
                placeholder="You can search members by their ID..."
                onInput={handleSearch}
              />
              <div className={styles.allMembers}>
                {showMembers ? members.length : blockMembersList.length}
              </div>
            </div>
            <div className={styles.rightDetails}>
              {openThreeDots && (
                <div className={styles.openOnThreeDotsOptions}>
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
                        onSubmit={handleSendMsgToAll}
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
                        setShowMsgToAllForm(!showMsgToAllForm);
                      }}
                    >
                      Msg All
                    </button>
                  )}
                  {showMembers && blockMembersList.length > 0 && (
                    <button
                      className={styles.detailsBtns}
                      onClick={() => {
                        setShowBlockedMember(true);
                        setShowMembers(false);
                      }}
                    >
                      Blocked List
                    </button>
                  )}
                  {!showMembers && blockMembersList.length > 0 && (
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

                  {showMembers && (
                    <Link to={"/messages"}>
                      <button className={styles.detailsBtns}>Messages</button>
                    </Link>
                  )}

                  {showMembers && (
                    <button
                      className={styles.deleteAll}
                      onClick={handleDeleteAllUsers}
                    >
                      {memberData.deleteAllIsLoading ? (
                        <h1>
                          <ReactLoading
                            type="spin"
                            color="white"
                            height={20}
                            width={20}
                          />
                        </h1>
                      ) : (
                        "Delete All"
                      )}
                    </button>
                  )}
                </div>
              )}

              <div
                onClick={() => setOpenThreeDots(!openThreeDots)}
                className={styles.threeDotsContainer}
              >
                <BsThreeDotsVertical className={styles.threeDots} />
              </div>
            </div>
          </div>
          <div className={styles.tableContainer}>
            {showMembers ? (
              <MemberList
                members={members}
                handleDeleteMembers={handleDeleteMembers}
                handleBlock={handleBlock}
                memberListType="regular"
              />
            ) : (
              <MemberList
                members={blockMembersList}
                memberListType="blocked"
                handleUnblock={handleUnblock}
              />
            )}
          </div>
        </div>
      ) : (
        <div className={styles.noDataContainer}>
          <div className={styles.noDataDetails}>
            <h1>Currently, There Are No Members.</h1>
            {blockMembersList.length > 0 && (
              <button
                className={styles.blockListBtn}
                onClick={() => {
                  setShowBlockedMember(!showBlockedMember);
                  setShowMembers(false);
                }}
              >
                Blocked List
              </button>
            )}
          </div>

          <div className={blockMembersData}>
            {showBlockedMember && (
              <MemberList
                members={blockMembersList}
                memberListType="blocked"
                handleUnblock={handleUnblock}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
