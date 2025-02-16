
import UserRowMinTable from '../UserRowMinTable'
function UsersView({ users, handleSendFriendRequest }) {
    if (!Array.isArray(users)) return null; // טיפול במקרה של null או לא מערך

    const seenIds = new Set();
    const uniqueUsers = users.filter((user) => {
        if (seenIds.has(user._id)) return false;
        seenIds.add(user._id);
        return true;
    });


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

                        {uniqueUsers.map((user) => (
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
