import '../../../css/MessageUserTable.css'
function MessageUserTable({ fetchMessagesUsers }) {
    return (
        <div className="messages-container">
            <table className="messages-table">
                <thead>
                    <tr>
                        <th>Name first</th>
                        <th>Name middle</th>
                        <th>Name last</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>

                    </tr>
                </thead>
                <tbody>
                    {fetchMessagesUsers?.length > 0 ? (
                        fetchMessagesUsers.map(user => (
                            <tr key={user._id} className="message-item">
                                <td>{user.name.first}</td>
                                <td>{user.name.middle}</td>
                                <td>{user.name.last}</td>
                                <td>{user.email}</td>
                                <td>{user.lastMessage}</td>
                                <td>{user.date ? new Date(user.date).toLocaleString() : 'אין תאריך'}</td>
                            </tr>))
                    ) : (
                        <tr>
                            <td colSpan="6"
                                style={{ textAlign: 'center', padding: '15px', color: '#888' }}>
                                אין הודעות זמינות
                            </td>
                        </tr>

                    )}

                </tbody>
            </table>
        </div>

    );
};

export default MessageUserTable
