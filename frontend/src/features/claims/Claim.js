import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectClaimById } from './claimsApiSlice'
import './ClaimsList.css'

const Claim = ({ claimId }) => {

    const claim = useSelector(state => selectClaimById(state, claimId))

    const navigate = useNavigate()

    if (claim) {
        const created = new Date(claim.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(claim.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/claims/${claimId}`)

        return (
            <tr className="table__row">
                <td className="table__cell-claim claim__status">
                    {claim.completed
                        ? <span className="claim__status--completed">Completed</span>
                        : <span className="claim__status--open">Open</span>
                    }
                </td>
                <td className="table__cell-claim claim__created">{created}</td>
                <td className="table__cell-claim  claim__updated">{claim.title}</td>
                <td className="table__cell-claim  claim__title">{claim.desc}</td>
                <td className="table__cell-claim  claim__title">{claim.clientName}</td>
                <td className="table__cell-claim  claim__username">{claim.username}</td>

                <td className="table__cell-claim">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Claim