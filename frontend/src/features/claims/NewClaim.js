import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewClaimForm from './NewClaimForm'

const NewNote = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewClaimForm users={users} />

    return content
}
export default NewClaim