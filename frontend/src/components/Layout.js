import { Outlet } from 'react-router-dom';

//This is parent component that will be rendered BEFORE you login as an employee.
const Layout = () => {
  return <Outlet />
}

export default Layout