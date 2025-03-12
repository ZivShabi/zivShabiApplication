import { useEffect, useState } from 'react';
import MessageItem from '../MessageItem'
import PostAudioTable from '../PostAudioTable'
import MessageUserTable from '../table/MessageUserTable'
import UserSearch from '../UserSearch';

function MessagesView({ messages, handleMarkAsRead, handleDeleteMessage, handleGetMessageById, loading, setNewMessage, navigate, handleRecordAudioMessages, handleMarkAsListenedMessages, isRecordingMessages, fetchMessagesUsers, openChatUsers, searchForAnExistingUser, setOpenChatUsers, currentUserId }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (fetchMessagesUsers) {
            setUsers(fetchMessagesUsers);
            setOpenChatUsers([]);
        }
    }, [fetchMessagesUsers]);

    return (
        <div className="messages-list">
            <MessageUserTable fetchMessagesUsers={users} />

            <UserSearch
                messages={messages}
                searchForAnExistingUser={searchForAnExistingUser}
                setOpenChatUsers={setOpenChatUsers}
                openChatUsers={openChatUsers}
                navigate={navigate}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDeleteMessage}
                onReply={(msg) => {
                    setNewMessage(`Replying to: ${msg.content}`);
                    navigate('/messages', { state: { messageId: msg._id } });
                }}
                onMessageById={handleGetMessageById}
                loading={loading}
                onAudioUrls={handleMarkAsListenedMessages}
                onRecordAudio={handleRecordAudioMessages}
                isRecording={isRecordingMessages}
                currentUserId={currentUserId}
            />

            <ul className="user-suggestions">
                <PostAudioTable />
                {messages.map(message => (
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
                ))}
            </ul>
        </div>
    );
}
export default MessagesView

