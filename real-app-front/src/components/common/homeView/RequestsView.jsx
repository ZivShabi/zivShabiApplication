
import UserRowMinTable from '../UserRowMinTable'
function RequestsView({ requests, handleAcceptRequest, handleDeleteRequest }) {
    console.log("Rendered RequestsView with requests:", requests);
    const requestsToDisplay = requests || []


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

                        {requestsToDisplay.length === 0 ? (
                            <tr>
                                <td colSpan="8"><p>No membership requests</p></td>
                            </tr>) : (
                            requestsToDisplay.map((request, index) => (
                                <UserRowMinTable
                                    key={request._id || index}
                                    user={request}
                                    onAcceptRequest={() => handleAcceptRequest(request._id)}
                                    onDeclineRequest={() => handleDeleteRequest(request._id)}
                                />
                            ))
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default RequestsView
