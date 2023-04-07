import React, { useRef } from "react";
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

import logo from '../images/DD1.png';

const DASH_REGEX = /^\/dash(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const Navbar = () => {

    const [nav, setNav ] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    const navRef = useRef();

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

    const content = (
        <>
        <div className="flex h-4 bg-slate-300"></div>

        <div className="h-16 bg-white">
        <div className="flex bg-white justify-between item-center h-full max-w-[1240px] mx-auto px-4 text-gray-80 no-underline" >
            <Link to="/dash/Homepage">
                <img className="h-16" src={logo} />
            </Link>
            <ul className="hidden md:flex">
                <Link className="no-underline text-slate-900" to="/dash/Homepage">
                    <li className="p-4 decoration-black">Home</li>                    
                </Link>
                <Link className="no-underline text-slate-900" to="/dash/AboutPage">
                    <li className="p-4">About</li>                    
                </Link> 
                <Link className="no-underline text-slate-900" to="/dash/FileClaimsPage">
                    <li className="p-4">Cases</li>                    
                </Link>
                <button className="p-4" title="Logout" onClick={sendLogout}>Logout</button>
                <Link className="no-underline text-slate-900" to="/dash/SettingsPage">
                    <li className="p-4">Settings</li>           
                </Link>
            </ul>
            <div onClick={handleNav} className='block md:hidden'>
                {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/> }
            </div>
            <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-white bg-white ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <Link to="/dash/Homepage">
                    <img className="h-16 ml-4" src={logo} />
                </Link>
                <ul className='uppercase p-4'>
                    <Link className="no-underline text-slate-900" to="/dash/Homepage">
                        <li className="p-4 border-b">Home</li>                    
                    </Link>
                    <Link className="no-underline text-slate-900" to="/dash/AboutPage">
                        <li className="p-4 border-b">About</li>                    
                    </Link> 
                    <Link className="no-underline text-slate-900" to="/dash/FileClaimsPage">
                        <li className="p-4 border-b">Cases</li>                    
                    </Link>
                        <li className="p-4 uppercase border-b" title="Logout" onClick={sendLogout}>Logout</li>
                    <Link className="no-underline text-slate-900" to="/dash/SettingsPage">
                        <li className="p-4">Settings</li>           
                    </Link>
                </ul>
            </div>
        </div>
        </div>
        </>
    )
    return content
}
export default Navbar;