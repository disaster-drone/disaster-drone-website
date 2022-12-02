import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import './UsersList.css'

const UsersList = () => {

    const{ data: users,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetUsersQuery();

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
            <div className="users-list-container">
            <div className="table-container">
                <table className="table-users table--users">
                    <tr className="table-header-users">
                        <th scope="col" className="table__th-users user__username">Username</th>
                        <th scope="col" className="table__th-users user__roles">Roles</th>
                        <th scope="col" className="table__th-users user__edit">Edit</th>
                    </tr>
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
export default UsersList;