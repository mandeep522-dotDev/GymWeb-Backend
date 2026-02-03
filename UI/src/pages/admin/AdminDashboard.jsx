// ...existing code...
import api from "../../api/axios";
import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar.jsx";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(null);

  

  useEffect(() => {
    const loadUsers = async () => {
        try {
        // console.log("token:", localStorage.getItem("token"));
        const res = await api.get("/users/all-users", { withCredentials: true });
        // console.log("loadUsers response status:", res.status);
        // console.log("loadUsers response data:", res.data);

        const data = res.data?.users ?? res.data?.data ?? res.data;
        if (Array.isArray(data)) {
            setUsers(data);
        } else if (data && typeof data === "object") {
            // if single object, wrap into array
            setUsers([data]);
        } else {
            setUsers([]);
        }
        setErr(null);
        } catch (error) {
        console.log("Failed to fetch users:", error);
        setErr(error.response?.data?.message || error.message || "Fetch failed");
        // optional fallback if localStorage holds an array
        const stored = JSON.parse(localStorage.getItem("user"));
        if (Array.isArray(stored)) setUsers(stored);
        }
    };
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/delete/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full from-gray-100 p-8  flex gap-5">
        <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
            {err && <div className="text-red-400 mt-2">Error: {err}</div>}
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-300">
                <thead>
                    <tr className="bg-gray-400">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-center">Email</th>
                    <th className="p-3 text-center">Role</th>
                    <th className="p-3 text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="p-4 text-center text-gray-400">
                        No users found
                        </td>
                    </tr>
                    ) : (
                    users.map((u) => (
                        <tr key={u._id} className="border-b border-gray-700">
                        <td className="p-3 text-left">{u.name}</td>
                        <td className="p-3 text-center">{u.email}</td>
                        <td className="p-3 text-center">{u.role}</td>
                        <td className="p-3 text-center">
                            <button
                            onClick={() => deleteUser(u._id)}
                            className="bg-red-600 px-3 py-1 rounded"
                            >
                            Delete
                            </button>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
              </table>
            </div>
        </div>
     
    </div>
  );
}