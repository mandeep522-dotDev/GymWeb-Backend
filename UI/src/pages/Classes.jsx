import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminClasses() {
  const [classes, setClasses] = useState([]);
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  const handleCount = () =>{
    setCount(prev => prev + 1);
  }
  if(count > 0){
      navigate("/dashboard", {
      state: {count: count}
    })
  }
  
  
  useEffect(() => {
    const loadClasses = async () => {
        const res = await api.get("/classes/get-classes");
        setClasses(res.data?.data || []);
    };
    loadClasses();
  }, []);
  return (
    <div className="min-h-screen bg-gray-200 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold font-serif mb-6">Join Classes</h1>
      {/* List */}
      <div className="grid md:grid-cols-3 gap-6 ">
        {classes.map(c => (
          <div key={c._id} className="bg-white p-6 rounded-xl relative h-auto">
            <h2 className="font-bold text-black">{c.title}</h2>
            <p className="text-gray-900">Trainer : {c.trainer} • {c.schedule}</p>
            <p className="text-gray-900">Scheduled : {c.schedule}</p>

            <p className="text-gray-900">Description : {c.description}</p>
            <button
              onClick={handleCount}
              className="mt-4 bg-amber-500 px-3 py-1 rounded hover:bg-amber-600">
              Join Class
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
