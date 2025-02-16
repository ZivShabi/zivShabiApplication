const UserRowMinTable = ({ user = {}, onSendRequest, onAcceptRequest, onDeclineRequest }) => {
    const { _id, name = {}, isBusiness, address = {} } = user;
    console.log("User data:", user);

    return (
        <tr>
            <td>{name?.first || 'N/A'}</td>
            <td>{name?.middle || '-'}</td>
            <td>{name?.last || 'N/A'}</td>
            <td>{isBusiness ? "Business" : "Private"}</td>
            <td>{address?.state || '-'}</td>
            <td>{address?.city || 'N/A'}</td>
            <td>{address?.street || 'N/A'}</td>



            <td>
                {onSendRequest && (
                    <button
                        className="btn btn-outline-info"
                        onClick={() => onSendRequest(_id)}
                    >
                        <i className="bi bi-person-plus"></i>
                    </button>
                )}
                {onAcceptRequest && (
                    <button
                        className="btn btn-outline-success"
                        onClick={() => onAcceptRequest(_id)}
                    >
                        <i className="bi bi-check"></i>
                    </button>
                )}
                {onDeclineRequest && (
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => onDeclineRequest(_id)}
                    >
                        <i className="bi bi-person-x"></i>
                    </button>
                )}
            </td>
        </tr>
    );
};
export default UserRowMinTable