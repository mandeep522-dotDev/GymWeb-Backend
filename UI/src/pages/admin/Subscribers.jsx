import { useEffect, useState } from "react";
import api from "../../api/axios";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const getSubscribers = async () => {
      try {
        const res = await api.get("/subscriber/getAllSubscribers");
        setSubscribers(res.data?.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    getSubscribers();
  }, []);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 font-serif">Subscribers</h2>

      {subscribers.map((s, index) => (
        <p key={index} className="bg-gray-400 w-64 mb-3 rounded-lg py-2 font-serif hover:bg-slate-500 text-center">{s.email}</p>
      ))}
    </div>
  );
};

export default Subscribers;
