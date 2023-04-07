import { useNavigate, Link } from 'react-router-dom'

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
                <td className="table__cell-claim  claim__title">
                    <Link to="/dash/DocumentPage">
                    <button
                        className="press-btn">
                        Case Document
                    </button>
                    </Link>
                </td>
                <td className="table__cell-claim  claim__title">
                    <button
                        className="press-btn"
                        >
                        Open Diaster App
                    </button>
                </td>

                <td className="table__cell-claim  claim__title">
                    <Link to="/dash/GalleryPage">
                    <button
                        className="press-btn"
                        onClick={handleEdit}
                    >
                    Case Images
                    </button>
                    </Link>
                </td>
            </tr>
        )

    } else return null
}
export default Claim