import { useState } from "react";

export default function UserForm({ onAddUser }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    onAddUser(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add user..."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 
                   text-gray-700 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white font-medium px-5 py-2 rounded-lg
                   hover:bg-blue-700 active:scale-95 transition"
      >
        Add
      </button>
    </form>
  );
}
