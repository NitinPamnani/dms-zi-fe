import React, { useContext } from 'react'
import Logo from "../img/logo.png"
import {Link} from "react-router-dom";
import { useJwt } from 'react-jwt';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const {currentUser, logout} = useContext(AuthContext);
  const {isExpired, decodedToken} = useJwt(currentUser);

  return (
    <div className='navbar'>
      <div className="container">
        <div className='logo'>
          <Link to="/root">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className='links'>
           <span>{(!isExpired &&  decodedToken) ? decodedToken.username : ""}</span>
          {currentUser ? <span onClick={logout}>Logout</span> : <Link className='link' to="/login">Login</Link>}
        </div>
      </div>

    </div>
  )
}

export default Navbar
