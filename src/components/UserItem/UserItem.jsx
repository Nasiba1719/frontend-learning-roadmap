import styles from "./UserItem.module.css";

export default function UserItem({ user, onDeleteUser }) {
  return (
    <li className={styles.item}>
      <span className={styles.name}>{user.name}</span>
      <button
        className={styles.deleteBtn}
        onClick={() => onDeleteUser(user.id)}
      >
        Delete
      </button>
    </li>
  );
}
