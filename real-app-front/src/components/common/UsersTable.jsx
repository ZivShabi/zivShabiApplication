import { useAuth } from '../../contexts/User.Identification'
import { useImageContext } from '../../contexts/ImageContext'


function UsersTable({ users, onEditClick }) {

    const { user } = useAuth()
    const { image } = useImageContext();
    const userImage = image || user?.image?.url

    if (users.length === 0) {
        return <div className="alert alert-warning text-center"></div>
    }

    return (
        <div className="table-container">
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>private/Business </th>
                            <th>Image</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>Street</th>
                            <th>House Number</th>
                            <th>Actions</th>
                            <th>Block Until</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name.first}</td>
                                <td>{user.name.middle || '-'}</td>
                                <td>{user.name.last}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.isBusiness ? "Business " : "private"}</td>
                                <td>
                                    {userImage !== '-' ? (<img
                                        className="userImg"
                                        src={userImage}
                                        alt={`${user?.name?.first || ''} 
                                        ${user?.name?.last || ''}`} />
                                    ) : ('-')}
                                </td>
                                <td>{user.address.state || '-'}</td>
                                <td>{user.address.country}</td>
                                <td>{user.address.city}</td>
                                <td>{user.address.street}</td>
                                <td>{user.address.houseNumber}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger like-button-danger"
                                        onClick={() => onEditClick(user)} >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </td>
                                <td>{user.blockUntil || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersTable
