import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Recipe Book</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add">Add Recipe</Link></li>
        <li><Link to="/recipes">Recipe List</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
