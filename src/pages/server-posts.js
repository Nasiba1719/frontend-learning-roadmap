import { useState, useEffect } from "react";
import SkeletonCard from "@/components/SkeletonCard";

export default function ServerPostsPage({ posts }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Server Posts (getServerSideProps)
      </h1>

      <div className="grid gap-4">

        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
          : posts.slice(0, 10).map((p) => (
              <div
                key={p.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-blue-600">{p.title}</h3>
                <p className="text-gray-600">{p.body}</p>
              </div>
            ))
        }

      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: { posts },
  };
}
