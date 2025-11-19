import { useState } from "react";

export default function UserItem({ user, onDeleteUser, onEditUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);

  return (
    <li className="flex justify-between items-center bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-3">
      
   
      {isEditing ? (
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
        />
      ) : (
        <span className="text-lg">{user.name}</span>
      )}

      <div className="flex gap-2">
    
        {isEditing ? (
          <button
            onClick={() => {
              onEditUser(user.id, newName);
              setIsEditing(false);
            }}
            className="bg-green-500 text-white px-3 py-1 rounded-md"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md"
          >
            Edit
          </button>
        )}

   
        <button
          onClick={() => onDeleteUser(user.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Del
        </button>
      </div>
    </li>
  );
}
