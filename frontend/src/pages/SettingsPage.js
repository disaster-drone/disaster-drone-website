import { Link } from 'react-router-dom';
import React from 'react'
import './SettingsPage.css';


/* Not functional, this is where we would want to add the ability to view all users and their roles, so a manager
could go in and add speicifc cases to specific users. */ 
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