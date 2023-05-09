import { Outlet } from 'react-router-dom';

import React from 'react';
import Navbar from './Navbar';

//This is parent component that will be rendered AFTER you login as an agent.

const DashLayout = () => {
  return ( 
    <>
        <Navbar/>
        <div className="dash-container">
            <Outlet /> 
        </div>
    </>
  )
}

export default DashLayout
