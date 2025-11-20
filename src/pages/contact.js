export default function Contact() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h1>

      <p className="text-gray-600 mb-6">
        Have any questions? Feel free to reach out using the form below.
      </p>

      <form className="grid gap-4">

        <input
          type="text"
          placeholder="Your name"
          className="border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="email"
          placeholder="Your email"
          className="border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          rows="4"
          placeholder="Your message..."
          className="border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Send Message
        </button>

      </form>
    </div>
  );
}
