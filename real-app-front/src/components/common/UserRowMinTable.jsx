const UserRowMinTable = ({ user, onSendRequest, onAcceptRequest, onDeclineRequest }) => {
    const { _id, name, isBusiness, address } = user;

    return (
        <tr>
            <td>{name.first}</td>
            <td>{name.middle || '-'}</td>
            <td>{name.last}</td>
            <td>{isBusiness ? "Business" : "Private"}</td>
            <td>{address.state || '-'}</td>
            <td>{address.city}</td>
            <td>{address.street}</td>
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