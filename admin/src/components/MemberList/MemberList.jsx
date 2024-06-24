import { ImBlocked } from "react-icons/im";
import { IoSendSharp } from "react-icons/io5";
import { RiDeleteBin3Fill } from "react-icons/ri";
import styles from "./MemberList.module.css";

export const MemberList = ({members, deleteMembers, blockMembers,memberListType}) => {
console.log(members)
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
              <th>Messages</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <th>{index + 1}</th>
                <th>{member.createdBy.name}</th>
                <th>{member.createdBy.email}</th>
                <th>{member.createdBy.contact}</th>
                <th>
                  <button className={styles.sendBtn}>
                    <IoSendSharp className={styles.sendBtnIcon} />
                  </button>
                </th>
                <th className={styles.action}>
                  <button
                    className={styles.del}
                    onClick={() => deleteMembers(member._id)}
                  >
                    <RiDeleteBin3Fill className={styles.delIcon} />
                  </button>
                  <button
                    className={styles.del}
                    onClick={() => blockMembers(member)}
                  >
                    <ImBlocked className={styles.delIcon} />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
