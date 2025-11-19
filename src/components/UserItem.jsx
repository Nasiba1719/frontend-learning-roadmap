import React from "react";

export default function UserItem({ user, onDeleteUser }) {
  return (
    <li className="flex justify-between items-center bg-white shadow-sm 
                   border border-gray-200 rounded-lg px-4 py-3">
      <span className="text-lg">{user.name}</span>

      <button
        onClick={() => onDeleteUser(user.id)}
        className="bg-red-500 text-white px-3 py-1.5 rounded-md 
                   hover:bg-red-600 active:scale-95 transition"
      >
        Delete
      </button>
    </li>
  );
}
