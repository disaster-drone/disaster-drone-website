import { useGetClaimsQuery } from "./claimsApiSlice"
import Claim from "./Claim"
import './ClaimsList.css'

const ClaimsList = () => {
    const {
        data: claims,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetClaimsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = claims

        const tableContent = ids?.length
            ? ids.map(claimId => <Claim key={claimId} claimId={claimId} />)
            : null

        content = (
            <div className="claims-list-container"> 
                <div className="table-conatiner">
                    <table className="table-claims table--claims">
                    <thead className="table__thead-claims">
                        <tr>
                            <th scope="col" className="table__th-claims claim__status">Status</th>
                            <th scope="col" className="table__th-claims claim__created">Created</th>
                            <th scope="col" className="table__th-claims claim__updated">Title</th>
                            <th scope="col" className="table__th-claims claim__title">Description</th>
                            <th scope="col" className="table__th-claims claim__title"></th>
                            <th scope="col" className="table__th-claims claim__username"></th>
                            <th scope="col" className="table__th-claims claim__edit"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return content
}
export default ClaimsList