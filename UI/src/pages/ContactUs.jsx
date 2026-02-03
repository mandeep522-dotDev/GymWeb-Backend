import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl overflow-hidden grid md:grid-cols-2">

        <div className="bg-indigo-600 text-white p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-indigo-100 mb-6">
              Have questions or need help? Fill out the form and our team will get
              back to you shortly.
            </p>

            <div className="space-y-4 text-sm">
              <p>📍 Kurukshetra, India</p>
              <p>📧 gymsupport@gmail.com</p>
              <p>📞 +91 72068 59892</p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <a
              href="https://www.facebook.com/profile.php?id=100008727150631"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:bg-indigo-500 hover:text-white transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/pyara_fojji_1/"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:bg-indigo-500 hover:text-white transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:bg-indigo-500 hover:text-white transition"
            >
              <FaTwitter />
            </a>

            <a
              href="https://www.linkedin.com/in/mandeep-kashyap-2a7b17338/"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:bg-indigo-500 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
              value={formData.name}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
              value={formData.message}
              required
            />
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
