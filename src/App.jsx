import { useState } from "react";
import UserForm from "./components/UserForm/UserForm";
import UserList from "./components/UserList/UserList";
import styles from "./App.module.css";

export default function App() {
  const [users, setUsers] = useState([]);

  const addUser = (name) => {
    const newUser = { id: Date.now(), name };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>User Manager</h1>

      <UserForm onAddUser={addUser} />
      <UserList users={users} onDeleteUser={deleteUser} />
    </div>
  );
}
