import { useState} from 'react'
import api from '../../api/axios';

const Sub = () => {
    const [email, setEmail] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/subscriber/save-subscribers", email);
            alert("Subscribed successfully")
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className="sub-section w-[100%] h-70 flex flex-col items-center justify-center mt-5">
        <img className='w-full h-64 object-cover' src="https://png.pngtree.com/background/20230708/original/pngtree-contemporary-gym-equipment-in-3d-render-user-friendly-machines-and-assorted-picture-image_4176599.jpg" alt="Profession Background" />

        <div className='flex flex-col justify-center items-center -mt-15'>
            <h2 className="text-zinc-200 text-3xl font-bold font-serif mb-2 relative -mt-48">Subscribe to our Newsletter</h2>
            <p className="text-gray-300">Stay updated with the latest Machine trends and exclusive offers.</p>
            <div className='mt-4'>
                <form onSubmit={handleSubmit}>
                    <input 
                        className='bg-zinc-100 px-6 py-3 w-80' 
                        type="text" 
                        placeholder='Enter your mail'
                        onChange={(e) => setEmail({email: e.target.value})} 
                    />
                    <button className='bg-amber-500 px-4 py-3' type='submit'>Subscribe</button>
                </form>
            </div>
        </div>
    </div>
  )
}


export default Sub