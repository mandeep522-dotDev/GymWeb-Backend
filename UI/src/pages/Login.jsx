// ...existing code...
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await api.post("/users/login", { email, password });
      console.log("loginRes.data:", loginRes.data);

      // pick token if API returns it in body
      const token = loginRes.data?.token ?? loginRes.data?.data?.token ?? loginRes.data?.user?.token;
      if (token) {
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      // now call current-user — cookie or Authorization header will be sent
      const userResp = await api.get("/users/current-user");
      const payload = userResp.data;
      const user = payload?.user ?? payload?.data ?? payload;
      console.log(user);
      
      if (!user) throw new Error("No user returned");

      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.message)
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-[87.75vh] bg-gradient-to-l from-gray-400 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-gradient-to-r from-gray-500 to-gray-900 rounded-lg p-6 shadow-lg w-96"
      >
        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Login
        </h2>

        <input
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 mb-6 rounded bg-gray-700 text-white"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded font-semibold">
          Login
        </button>
        <h4 className="text-gray-300 mt-5">create account: <Link to="/register" className="text-blue-600 underline">Click here</Link></h4>
      </form>
    </div>
  );
}
