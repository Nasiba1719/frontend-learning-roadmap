import { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoApp.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">📝 My To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Tapşırıq əlavə et..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="todo-input"
        />
        <button onClick={addTask} className="add-btn">
          Əlavə et
        </button>
      </div>

      <ul className="todo-list">
        {tasks.map((task, index) => (
          <TodoItem key={index} task={task} onDelete={() => deleteTask(index)} />
        ))}
      </ul>
    </div>
  );
}
