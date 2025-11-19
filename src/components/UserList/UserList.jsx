import UserItem from "../UserItem/UserItem";
import styles from "./UserList.module.css";

export default function UserList({ users, onDeleteUser }) {
  if (users.length === 0) {
    return <p className={styles.empty}>No users yet...</p>;
  }

  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onDeleteUser={onDeleteUser}
        />
      ))}
    </ul>
  );
}
