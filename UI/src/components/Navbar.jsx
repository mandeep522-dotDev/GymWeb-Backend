import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useState } from "react";

const Navbar = () => {

  const [user] = useState(() =>
  JSON.parse(localStorage.getItem("user"))
);


  

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-gen">Gen</span>
        <span className="logo-sep">-</span>
        <span className="logo-gym">Gym</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/classes">Classes</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      <div className="flex gap-4">
        {user ? (
          <>
            <div className="flex gap-4 items-center">
              {user.role === "admin" && <Link to="/admin">Admin</Link>}
              <Link to="/dashboard">Dashboard</Link>
              <LogoutBtn />
            </div>
            
          </>
        ) : (
          <>
            <div className="auth-links">
              <Link to="/register" className="btn register">Register</Link>
              <Link to="/login" className="btn login">Login</Link>
            </div> 
          </>
        )}
      </div>
      {/* <div className="auth-links">
        <Link to="/register" className="btn register">Register</Link>
        <Link to="/login" className="btn login">Login</Link>
      </div> */}

      <style>{`
        .navbar{
          width:100%;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:12px 20px;
          background: #fff;
          box-shadow:0 2px 6px rgba(0,0,0,0.05);
          font-family:Arial, Helvetica, sans-serif;
        }
        .logo{
          font-size:22px;
          font-weight:700;
          display:flex;
          align-items:center;
          gap:4px;
        }
        .logo-gen{ color:#ff7f00; }
        .logo-sep{ color:#333; }
        .logo-gym{ color:#000; }

        .nav-links{
          list-style:none;
          display:flex;
          gap:20px;
          margin:0;
          padding:0;
        }
        .nav-links a{
          text-decoration:none;
          color:#444;
          padding:6px 8px;
          border-radius:4px;
          transition:all 0.18s ease;
          font-size:15px;
        }
        .nav-links a:hover{
          color:#ff7f00;
          background:rgba(255,127,0,0.08);
          transform:translateY(-2px);
        }

        .auth-links{ display:flex; gap:10px; }
        .btn{
          text-decoration:none;
          padding:8px 12px;
          border-radius:6px;
          font-weight:600;
          font-size:14px;
          transition:all 0.15s ease;
        }
        .btn.register{
          color:#ff7f00;
          border:1px solid #ff7f00;
          background:transparent;
        }
        .btn.register:hover{
          background:#ff7f00;
          color:#fff;
        }
        .btn.login{
          color:#fff;
          background:#333;
          border:1px solid #333;
        }
        .btn.login:hover{
          background:#000;
        }

        /* responsive small screens */
        @media (max-width:640px){
          .nav-links{ display:none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
