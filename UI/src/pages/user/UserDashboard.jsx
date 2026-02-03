import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function UserDashboard() {
  const [count, setCount] = useState()
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const { state } = useLocation();
  useEffect(() => {
    setCount(state?.count);
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

        <ul className="space-y-4">
          <li
            className="cursor-pointer text-gray-700 hover:text-blue-600"
            onClick={() => navigate("/dashboard/update-profile")}
          >
            ✏️ Update Profile
          </li>

          <li
            className="cursor-pointer text-gray-700 hover:text-blue-600"
            onClick={() => navigate("/dashboard/change-password")}
          >
            🔒 Change Password
          </li>

          <li
            className="cursor-pointer text-red-600 hover:text-red-800"
            onClick={() => navigate("/dashboard/delete-account")}
          >
            🗑 Delete Account
          </li>

          <li
            className="cursor-pointer text-gray-700 hover:text-red-600"
            onClick={handleLogout}
          >
            🚪 Logout
          </li>
        </ul>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">My Dashboard</h2>

        {/* USER INFO CARD */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Profile Information</h3>

          <div className="space-y-2">
            <p>
              <b>Name:</b> {user?.name}
            </p>
            <p>
              <b>Email:</b> {user?.email}
            </p>
            <p>
              <b>Role:</b> {user?.role}
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-gray-500">Enrolled Classes</h4>
            <p className="text-2xl font-semibold">{count}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-gray-500">Membership</h4>
            <p>
              <b>Status:</b>{" "}
              <span
                className={
                  user?.membership === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {user?.membership || "Inactive"}
              </span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-gray-500">Next Class</h4>
            <p className="font-semibold">Not Scheduled</p>
          </div>
        </div>
      </main>
    </div>
  );
}
