import { Link } from 'react-router-dom';
import React from 'react'
import Navbar from '../components/Navbar';
import './SettingsPage.css';




const SettingsPage = () => {
  return (
    <>  
      <div className="settings">
        <div className="settings-content">
            <Link className="link-btn" to="/dash/users">
                <div className="view-users-btn"> View all users</div>               
            </Link>
        </div>
      </div>
    </>
  )
}
export default SettingsPage