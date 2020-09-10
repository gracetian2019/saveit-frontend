import React from 'react';
import {NavLink} from 'react-router-dom'

const NavBar = () => {
  return(
    <ul className="nav">
      <li>
        <NavLink to="/">SAVEIT</NavLink>
      </li>
      <div className="spacer"></div>
      <li>
      <NavLink to="/collection">Collection</NavLink>
      </li>
      <li>
       <NavLink to="/signup">Signup</NavLink>
      </li>
      <li>
       <NavLink to="/login">Login</NavLink>
        
      </li>
    </ul>
  )
};

export default NavBar;