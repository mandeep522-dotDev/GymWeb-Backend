// ...existing code...
import api from "../api/axios";

const LogoutBtn = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });

      // clear client state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];

      if (onLogout) onLogout();
      // force full page reload so Navbar re-reads localStorage
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.message || "Logout failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
// ...existing code...