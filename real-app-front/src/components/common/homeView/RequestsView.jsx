
import UserRowMinTable from '../UserRowMinTable'
function RequestsView({ requests, handleAcceptRequest, handleDeleteRequest }) {
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests?.length > 0 ? (
                            requests.map(request => (
                                <UserRowMinTable
                                    key={request._id}
                                    user={request}
                                    onAcceptRequest={() => handleAcceptRequest(request._id)}
                                    onDeclineRequest={() => handleDeleteRequest(request._id)}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No requests found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default RequestsView
