import { useState } from "react";
import styles from "./UserForm.module.css";

export default function UserForm({ onAddUser }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    onAddUser(input);
    setInput("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add user..."
      />
      <button className={styles.button}>Add</button>
    </form>
  );
}
