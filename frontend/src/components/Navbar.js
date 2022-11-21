import React, { useRef } from "react";
import { Link } from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa';

import logo from '../images/DD1.png';
import './Navbar.css';

const Navbar = () => {

    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle('active-navbar');
    }


    return(
        <>
        <div className="navbar-top "></div>
        <div className="navbar">
            <nav className="navbar-content" ref={navRef}>
                <ul className="navbar-left">
                    <Link to="/dash/Homepage" className="navbar-logo">
                        <img src={logo} className="logo" />
                    </Link>
                    <Link className="link-btn" to="/dash/Homepage">
                        <li className="navbar-text">Home</li>                    
                    </Link>
                    <Link className="link-btn" to="/dash/AboutPage">
                        <li className="navbar-text">About</li>                    
                    </Link>
                    <Link className="link-btn" to="/dash/FileClaimsPage">
                        <li className="navbar-text">File A Claim</li>                    
                    </Link>
                    <Link className="link-btn" to="/dash/ClosedClaimsPage">
                        <li className="navbar-text">Closed Claims</li>                    
                    </Link>
                </ul>
                <ul className="navbar-right">
                    <Link className="link-btn" to="/dash/Homepage">
                        <li className="logout-btn">Log out</li>              
                    </Link>
                    <Link className="link-btn" to="/dash/Homepage">
                        <li className="settings-btn">Settings</li>           
                    </Link>
                </ul>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}> 
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars/> 
            </button>
        </div>
        </>
    )
}
export default Navbar;