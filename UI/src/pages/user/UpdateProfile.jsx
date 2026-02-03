import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Yahan baad me backend API call karna
    const updateddet = await api.patch("/users/update-details", formData)
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    console.log(updateddet);
    
    alert("Profile updated successfully ✅");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-xl shadow m-20">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Profile
        </button>
      </form>
    </div>
  );
}
