import React from "react";
import { Link } from 'react-router-dom'

import logo from '../images/DD1.png';
import './Navbar.css';

const Navbar = () => {
    return(
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/Homepage" className="navbar-logo">
                    <img src={logo} className="logo" />
                </Link>
                <ul className="navbar-right">
                    <Link className="link-btn" to="/Homepage">
                        <li className="navbar-text"> Home</li>                    
                    </Link>
                    <Link className="link-btn" to="/AboutPage">
                        <li className="navbar-text"> About</li>                    
                    </Link>
                    <Link className="link-btn" to="/FileClaimsPage">
                        <li className="navbar-text"> File A Claim</li>                    
                    </Link>
                    <Link className="link-btn" to="/ClosedClaimsPage">
                        <li className="navbar-text"> Closed Claims</li>                    
                    </Link>
                </ul>
                <ul className="navbar-left">
                    <Link className="link-btn" to="/Homepage">
                        <li className="logout-btn">Log out</li>              
                    </Link>
                    <Link className="link-btn" to="/Homepage">
                        <li className="settings-btn">Settings</li>           
                    </Link>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;