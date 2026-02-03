import { useState } from 'react'
import api from '../api/axios';
import { useNavigate } from "react-router-dom";


const Register = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        age: ''
    })

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await api.post("/users/register", form);
        alert("Registration successfully");
        navigate("/login");
        } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
        }
    };

  return (
    <>
        <div className=" w-full flex items-center justify-center min-h-[87.75vh] bg-gradient-to-r from-gray-400 to-gray-900">
            <form onSubmit={handleSubmit} className="flex flex-col bg-gradient-to-l from-gray-500 to-gray-900 rounded-lg p-6 shadow-lg w-96">
                <input 
                    type="text" 
                    placeholder='Name' 
                    className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
                    onChange={(e) => setForm({...form, name: e.target.value})}
                />
                
                <input 
                    type="email" 
                    placeholder='Email' 
                    className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
                    onChange={(e) => setForm({...form, email: e.target.value})}
                />
                
                <input 
                    type="password" 
                    placeholder='Password' 
                    className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
                    onChange={(e) => setForm({...form, password: e.target.value})}
                />
                
                <input 
                    type="number" 
                    placeholder='Age' 
                    className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
                    onChange={(e) => setForm({...form, age: e.target.value})}
                />
                <button type="submit" className="bg-blue-600 p-2 rounded-md w-full hover:bg-blue-700">Register</button>
            </form>
        </div>
    </>
  )
}

export default Register