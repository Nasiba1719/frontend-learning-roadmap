import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data.slice(0, 10));
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Client-side Posts (Axios)</h1>

      {loading && <p>Loading...</p>}

      {posts.map((p) => (
        <div key={p.id} className="bg-white p-4 rounded-xl shadow mb-3">
          <h3 className="font-bold text-blue-600">{p.title}</h3>
          <p>{p.body}</p>
        </div>
      ))}
    </div>
  );
}
