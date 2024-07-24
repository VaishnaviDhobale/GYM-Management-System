import { ImBlocked } from "react-icons/im";
import { RiDeleteBin3Fill } from "react-icons/ri";
import styles from "./MemberList.module.css";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

export const MemberList = ({
  members,
  handleDeleteMembers,
  handleBlock,
  memberListType,
  handleUnblock,
}) => {
  const memberData = useSelector((state) => state.membersDetails);
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
                    <button className={styles.sendBtn}>
                      {/* <IoSendSharp className={styles.sendBtnIcon} /> */}
                      Message
                    </button>
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
