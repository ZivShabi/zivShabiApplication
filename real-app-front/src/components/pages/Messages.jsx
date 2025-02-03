
import PageHeader from '../common/PageHeader'
import '../../css/messages.css'
import { useMessages } from '../../contexts/MessagesContext'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
// import MessageItem from '../common/MessageItem'

function MessageComponent() {
    const { newMessage, setNewMessage, recipientId, setRecipientId, loading, successMessage,
        handleSendMessage, handleUpdateMessageCount, fetchRecipientName, recipientName } = useMessages()
    const location = useLocation()

    useEffect(() => {
        if (recipientId) {
            handleUpdateMessageCount(recipientId)
        }
    }, [recipientId])

    useEffect(() => {
        if (location.state?.recipientId) {
            setRecipientId(location.state.recipientId)
            fetchRecipientName(location.state.recipientId)
        }
    }, [location.state, setRecipientId])


    function renderMessageTree(messages) {
        return (
            <ul>
                {messages.map((message) => (
                    <li key={message._id}>
                        <h5>{message.content}</h5>
                        <button
                            className="btn btn-outline-info"
                            onClick={() => setNewMessage(`Replying to: ${message.content}`)} >
                            <i className="bi bi-reply"></i>
                        </button>
                        {renderMessageTree(message.children)}
                    </li>
                ))}
            </ul>
        );
    }
    function buildMessageTree(messages) {
        const messageMap = {};
        const roots = [];

        messages.forEach((message) => {
            messageMap[message._id] = { ...message, children: [] };
        });

        messages.forEach((message) => {
            if (message.parentMessageId) {
                messageMap[message.parentMessageId]?.children.push(messageMap[message._id]);
            } else {
                roots.push(messageMap[message._id]);
            }
        });

        return roots;
    }

    return (<div className='messages-container'>
        <div className="PageHeader">
            <PageHeader title="Messages"
                description="You welcome search for users update them with private" />
            {newMessage && <span className="new-message-alert">🔔</span>}
        </div>
        <div>  {loading && <p></p>}
            {successMessage && <p>{successMessage}</p>}
            <div className="message-form">
                <div className="inputs">
                    <input type="text"
                        placeholder="Recipient Name"
                        value={recipientName}
                        readOnly
                    />
                    <input type="hidden" value={recipientId} />
                    <textarea className=''
                        placeholder="Write your message" value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}>
                    </textarea>
                </div>
                <div className="">
                    <button
                        className='btn btn-outline-primary like-button'
                        onClick={handleSendMessage} disabled={loading}>
                        {loading ? 'Sending...' : ''}
                        <i className="bi bi-send-plus"></i>
                    </button>
                </div>
            </div>
        </div>
        {/* <div className="messages-list">
            <div className="messages-list">
                {renderMessageTree(buildMessageTree(messages))}
            </div>
            <ul className="user-suggestions ">
                {loading ? '' : (<ul>
                    {messages.map((message) => (
                        <MessageItem
                            key={message._id}
                            message={message}
                            onMarkAsRead={handleMarkAsRead}
                            onDelete={handleDeleteMessage}
                            onReply={(msg) => setNewMessage(`Replying to: ${msg.content}`)}
                            loading={loading}
                            onMessageById={(senderId, messageId) => handleGetMessageById(senderId, messageId)}
                        />
                    ))}
                </ul>)}
            </ul>
        </div> */}
    </div >)
}

export default MessageComponent
