
import MessageItem from '../MessageItem'
import PostAudioTable from '../PostAudioTable'
function MessagesView({ messages, handleMarkAsRead, handleDeleteMessage, handleGetMessageById, loading, setNewMessage, navigate, handleRecordAudioMessages, handleMarkAsListenedMessages, isRecordingMessages }) {
    return (
        <div className="messages-list">
            <ul className="user-suggestions">
                <PostAudioTable />
                {loading ? '' : (
                    messages.map(message => (
                        <MessageItem
                            key={message._id}
                            message={message}
                            onMarkAsRead={handleMarkAsRead}
                            onDelete={handleDeleteMessage}
                            onAudioUrls={handleMarkAsListenedMessages}
                            onRecordAudio={handleRecordAudioMessages}
                            isRecording={isRecordingMessages}
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