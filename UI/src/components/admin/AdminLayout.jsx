import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  const admin = JSON.parse(localStorage.getItem("user")) || {};
    
  return (
    <div className="flex">
      <Sidebar admin={admin.name}/>
      <main className="flex-1 bg-gray-100 min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}
