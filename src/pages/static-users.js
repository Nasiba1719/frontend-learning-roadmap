import { useState, useEffect } from "react";
import SkeletonCard from "@/components/SkeletonCard";

export default function StaticUsersPage({ users }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Static Users (getStaticProps)
      </h1>

      <div className="grid gap-4">

        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
          : users.map((u) => (
              <div
                key={u.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-blue-600">{u.name}</h3>
                <p className="text-gray-600"><b>Email:</b> {u.email}</p>
                <p className="text-gray-600"><b>City:</b> {u.address.city}</p>
              </div>
            ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return { props: { users } };
}
