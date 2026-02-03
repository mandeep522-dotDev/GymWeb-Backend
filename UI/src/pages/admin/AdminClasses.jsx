import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminClasses() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    trainer: "",
    schedule: "",
    description: "",
  });

  const loadClasses = async () => {
    const res = await api.get("/classes/get-classes");
    setClasses(res.data?.data || []);
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const addClass = async (e) => {
    e.preventDefault();
    await api.post("/classes/create-class", form);
    setForm({ title: "", trainer: "", schedule: "", description: "" });
    loadClasses();
  };

  const deleteClass = async (id) => {
    if (!confirm("Delete class?")) return;
    await api.delete(`/classes/${id}`);
    setClasses(classes.filter(c => c._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Classes</h1>

      {/* Add Form */}
      <form onSubmit={addClass} className="bg-gray-400 p-6 rounded-xl mb-8 grid md:grid-cols-4 gap-4">
        <input className="p-2 rounded bg-gray-100" placeholder="Title"
          value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <input className="p-2 rounded bg-gray-100" placeholder="Trainer"
          value={form.trainer} onChange={e=>setForm({...form,trainer:e.target.value})}/>
        <input className="p-2 rounded bg-gray-100" placeholder="Schedule"
          value={form.schedule} onChange={e=>setForm({...form,schedule:e.target.value})}/>
        <input className="p-2 rounded bg-gray-100 col-span-2" placeholder="Description"
          value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        <button className="bg-red-600 rounded px-4 py-2 col-span-2">Add Class</button>
      </form>

      {/* List */}
      <div className="grid md:grid-cols-3 gap-6">
        {classes.map(c => (
          <div key={c._id} className="bg-gray-400 p-6 rounded-xl">
            <h2 className="font-semibold">{c.title}</h2>
            <p className="text-gray-900">Trainer : {c.trainer} • {c.schedule}</p>
            <p className="text-gray-900">Scheduled : {c.schedule}</p>

            <p className="text-gray-900">Description : {c.description}</p>
            <button onClick={()=>deleteClass(c._id)}
              className="mt-4 bg-red-600 px-3 py-1 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
