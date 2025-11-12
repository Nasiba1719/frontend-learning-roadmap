import "./TodoItem.css";

export default function TodoItem({ task, onDelete }) {
  return (
    <li className="todo-item">
      <span>{task}</span>
      <button onClick={onDelete} className="delete-btn">❌</button>
    </li>
  );
}
