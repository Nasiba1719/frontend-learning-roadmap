import { useEffect, useState } from "react";

export default function ClientUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Client-side Users</h1>

      {loading && <p>Loading...</p>}

      {users.map((user) => (
        <div key={user.id} className="bg-white p-4 rounded-xl shadow mb-3">
          <h3 className="font-bold text-blue-600">{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
