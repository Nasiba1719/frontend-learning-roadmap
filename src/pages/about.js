export default function About() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">About Us</h1>

      <p className="text-gray-600 leading-7">
        Welcome to our mini project! This page was styled with Tailwind CSS to
        demonstrate how modern, clean UI can be built quickly and beautifully.
      </p>

      <p className="text-gray-600 leading-7 mt-4">
        Our goal is to learn Next.js, routing, server rendering, and professional UI 
        step-by-step — and you're doing amazing ❤️
      </p>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700">
          ✨ Tailwind CSS gives you the power to style components easily and fast.
        </p>
      </div>
    </div>
  );
}
