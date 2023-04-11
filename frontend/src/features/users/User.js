import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

import './UsersList.css'

import React from 'react'

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()
    
    if(user){
        const handleEdit = () => navigate(`dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell-users ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell-users ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell-users ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <button className="new-button-needs-to-gohere"> button</button>
                    </button>
                </td>
            </tr>

        )
    } else return null
  
}
export default User
