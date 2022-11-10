import { Outlet } from 'react-router-dom';

import React from 'react'

const Layout = () => {
  return ( 
    <Outlet /> // renders the children of the outlet compoenent.
               // could give us parent would we could add things like a footer and header
               // that would be seen on every page of the app.
  )
}

export default Layout