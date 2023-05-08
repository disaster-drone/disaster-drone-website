import { Link } from 'react-router-dom';
import React from 'react'
import './SettingsPage.css';


// Setting page that isn't funcitonal and is just a placeholder for now because did not really need to create 
// for the POC.

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