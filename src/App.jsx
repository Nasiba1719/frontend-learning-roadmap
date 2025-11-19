import { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);


  const [search, setSearch] = useState("");


  const [filter, setFilter] = useState("none");


  const addUser = (name) => {
    const newUser = { id: Date.now(), name };
    setUsers([...users, newUser]);
  };


  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };


  const editUser = (id, newName) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, name: newName } : u
      )
    );
  };


  const filteredUsers = users
  
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    )
  
    .sort((a, b) => {
      if (filter === "asc") return a.name.localeCompare(b.name);
      if (filter === "desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">User Manager</h1>

   
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
      />
      

      <UserForm onAddUser={addUser} />
      <UserList 
        users={filteredUsers} 
        onDeleteUser={deleteUser}
        onEditUser={editUser}
      />
    </div>
  );
}

export default App;
