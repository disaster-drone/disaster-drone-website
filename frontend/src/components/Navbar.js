import React, { useRef } from "react";
import {FaBars, FaTimes} from 'react-icons/fa';

import { useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'


import logo from '../images/DD1.png';
import './Navbar.css';

const DASH_REGEX = /^\/dash(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const Navbar = () => {

    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle('active-navbar');
    }

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])


    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "navbar"
    }

    const logoutButton = (
        <button
                className="logout-btn"
                title="Logout"
            onClick={sendLogout}
        > 
        Logout
        </button>
    )


    const content = (
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
                    {logoutButton}
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
    return content
}
export default Navbar;