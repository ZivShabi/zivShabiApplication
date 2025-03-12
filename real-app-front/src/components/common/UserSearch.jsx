import '../../css/ChatBetweenUsers.css'
import { useState, useEffect } from 'react';
function UserSearch({ searchForAnExistingUser, setOpenChatUsers, openChatUsers, navigate, onMarkAsRead, onDelete, onReply, onMessageById, loading, onAudioUrls, onRecordAudio, isRecording, currentUserId, messages }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // למעקב אחרי המשתמש הנבחר
    const [chatMessages, setChatMessages] = useState([]); // למעקב אחרי ההודעות של המשתמש הנבחר

    // חיפוש אחרי משתמשים רק אם ה-term תואם
    useEffect(() => {
        if (searchTerm.trim().length > 2) {
            const delayDebounce = setTimeout(() => {
                fetchOpenChats();
            }, 500);
            return () => clearTimeout(delayDebounce);
        } else {
            setOpenChatUsers([]); // מנקה את הרשימה כשהחיפוש נמחק
        }
    }, [searchTerm]);

    // פונקציה להחזרת משתמשים קיימים
    async function fetchOpenChats() {
        if (!searchTerm.trim()) return;
        try {
            const results = await searchForAnExistingUser(searchTerm);
            if (Array.isArray(results) && results.length > 0) {
                setOpenChatUsers(results);
            } else {
                setOpenChatUsers([]);
            }
        } catch (error) {
            console.error('❌ Error fetching users', error);
            setOpenChatUsers([]);
        }
    }

    // טיפול בלחיצה על משתמש לצורך הצגת שיחה
    const handleUserClick = async (userId) => {
        try {
            if (!userId) return console.warn("⚠️ No user ID found!");
            const selectedUserData = openChatUsers.find(user => (user.userId || user._id) === userId);
            console.log("Selected User Data:", selectedUserData);
            if (!selectedUserData) return console.warn("⚠️ No user data found!");
            setSelectedUser(selectedUserData);
            const sentMessages = selectedUserData?.messages || [];
            setChatMessages(sentMessages);
        } catch (error) {
            console.error('❌ Error fetching messages:', error);
        }
    };


    return (
        <div>
            <input
                className='retrieveLastMessageFromAnyConversaTion'
                type="text"
                placeholder="חפש משתמש לפתיחת צ'אט..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={() => setSearchTerm('')}
            />

            {/* תוצאות החיפוש */}
            <ul className="open-chat-users">
                {openChatUsers?.map(user => (
                    <li
                        key={user?.userId || user?._id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleUserClick(user?.userId || user?._id)}
                    >
                        {typeof user?.userName === "object"
                            ? `${user?.userName?.first || ''} ${user?.userName?.last || ''}`.trim()
                            : user?.userName}
                    </li>
                ))}
            </ul>

            {/* אזור הצגת השיחה */}
            {selectedUser && (
                <div className="chat-window">
                    <h3>שיחה עם
                        {selectedUser?.userName?.first}
                        {selectedUser?.userName?.last}</h3>
                    <div className="messagesChatBetweenUsers">
                        {chatMessages.length > 0 ? (chatMessages.map((message) => (
                            <div key={message._id}
                                className={`message ${message.senderId ===
                                    currentUserId ? 'sent' : 'received'}`}>
                                <h5>
                                    {message.sender?.name?.first && message.sender?.name?.last ?
                                        `${message.sender.name.first} ${message.sender.name.last}`
                                        : 'משתמש לא מזוהה'}
                                </h5>
                                <p>
                                    {message.recipient?.name?.first && message.recipient?.name?.last
                                        ? `${message.recipient.name.first} ${message.recipient.name.last}`
                                        : 'נמען לא מזוהה'}
                                    {message.read ?
                                        <span> <i className="bi bi-check-all text-primary"></i> </span> :
                                        <span> <i className="bi bi-check-all "></i></span>
                                    } {' '}
                                    <span> {new Date(message.date).toLocaleString()} </span>
                                </p>
                                <span className="message-sender">{message.senderName}: </span>
                                <span className="message-content">{message.content}</span>
                                <div className="message-actions">
                                    {!message.read && (
                                        <button className='btn btn-outline-primary'
                                            onClick={() => onMarkAsRead(message._id)}>
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    )}
                                    <button className={`btn ${isRecording ?
                                        'btn-danger' : 'btn-outline-primary'}`}
                                        onClick={() => onRecordAudio(message._id)}>
                                        <i className={`bi ${isRecording ?
                                            'bi-mic-fill' : 'bi-mic'}`}></i>
                                    </button>
                                    <button className="btn btn-outline-secondary"
                                        onClick={() => onAudioUrls(message._id, message.audioUrls)}
                                        disabled={!message.audioUrls}>
                                        <i className="bi bi-headphones"></i>
                                    </button>
                                    <button className='btn btn-outline-danger'
                                        onClick={() => onDelete(message._id)}>
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                    <button className="btn btn-outline-info"
                                        onClick={() => onReply(message)}>
                                        <i className="bi bi-reply"></i>
                                    </button>
                                </div>
                            </div>
                        ))) : (<p>אין הודעות</p>)}
                    </div>
                    <div className="message-input">
                        <textarea placeholder="כתוב הודעה..."
                            className="message-input-text"></textarea>
                        <button>שלח</button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default UserSearch;
