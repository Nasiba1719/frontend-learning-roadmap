import { useState, useEffect } from 'react'
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {


  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

 
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (name) => {
    const newUser = { id: Date.now(), name };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">User Manager</h1>
      <UserForm onAddUser={addUser} />
      <UserList users={users} onDeleteUser={deleteUser} />
    </div>
  );
}

export default App;
