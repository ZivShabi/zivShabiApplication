
import MessageItem from '../MessageItem'
function MessagesView({ messages, handleMarkAsRead, handleDeleteMessage, handleGetMessageById, loading, setNewMessage, navigate }) {
    return (
        <div className="messages-list">
            <ul className="user-suggestions">
                {loading ? '' : (
                    messages.map(message => (
                        <MessageItem
                            key={message._id}
                            message={message}
                            onMarkAsRead={handleMarkAsRead}
                            onDelete={handleDeleteMessage}
                            onReply={(msg) => {
                                setNewMessage(`Replying to: ${msg.content}`);
                                navigate('/messages', { state: { messageId: msg._id } });
                            }}
                            loading={loading}
                            onMessageById={(senderId, messageId) => handleGetMessageById(senderId, messageId)}
                        />
                    ))
                )}
            </ul>
        </div>
    );
}
export default MessagesView