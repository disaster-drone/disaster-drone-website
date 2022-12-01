import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectClaimById } from './claimsApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditClaimForm from './ClaimNoteForm'

const EditClaim = () => {
    const { id } = useParams()

    const claim = useSelector(state => selectClaimById(state, id))
    const users = useSelector(selectAllUsers)

    const content = claim && users ? <EditNoteForm claim={claim} users={users} /> : <p>Loading...</p>

    return content
}
export default EditClaim