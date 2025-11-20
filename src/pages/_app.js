import Link from "next/link";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <nav className="flex gap-6 p-4 bg-white shadow-md sticky top-0">
        <Link className="text-gray-700 hover:text-blue-600" href="/">Home</Link>
        <Link className="text-gray-700 hover:text-blue-600" href="/about">About</Link>
        <Link className="text-gray-700 hover:text-blue-600" href="/contact">Contact</Link>
        <Link className="text-gray-700 hover:text-blue-600" href="/server-posts">Server Posts</Link>
        <Link className="text-gray-700 hover:text-blue-600" href="/static-users">Static Users</Link>
        <Link href="/client-users">Client Users</Link>
        <Link href="/client-posts">Client Posts</Link>

      </nav>

      <div className="max-w-4xl mx-auto mt-10">
        <Component {...pageProps} />
      </div>
    </>
  );
}
