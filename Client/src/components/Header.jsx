import React, { useState } from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import "../Styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")

    const HandleLogout = () =>{
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      alert('Logout successfully')
      navigate('/login');
    }
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        Kishore's Blog
      </Link>
      <div
        className={`menu ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/add-blog">Add Blog</NavLink>
        </li>
        <li>
          <NavLink to="/add-category">Add Category</NavLink>
        </li>

        {token && token !== null ? (
          <>
            <button className="btn btn-primary">Welcome : {username}</button>
            <button className="btn btn-danger" onClick={HandleLogout}>Logout</button>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
