import { Outlet } from 'react-router-dom';

import React from 'react';
import Navbar from './Navbar';

//This is parent component that will be rendered AFTER you login as an employee.

const Layout = () => {
  return ( 
    <>
    <Navbar/>
    <div className="dash-container">
        <Outlet /> 
    </div>
    </>
  )
}

export default Layout
