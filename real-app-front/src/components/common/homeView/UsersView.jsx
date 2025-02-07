
import UserRowMinTable from '../UserRowMinTable'
function UsersView({ users, handleSendFriendRequest }) {
    return (
        <div className="table-container">
            <div className="table-responsive user-table">
                <table className="table table-bordered table-striped table-hover user-table__content">
                    <thead className="table-dark">
                        <tr>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th>Type</th>
                            <th>State</th>
                            <th>City</th>
                            <th> Add Friend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.map(user => (
                            <UserRowMinTable
                                key={user._id}
                                user={user}
                                onSendRequest={() => handleSendFriendRequest(user._id)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersView
