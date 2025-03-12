import { createContext, useContext, useState, useEffect } from 'react'
import { getAllMessages, sendMessage, markMessageAsRead, deleteMessage, updateMessageCount, getMessageById, getAllMessagesUsers, getSummaryMessagesUsers, openChatMessagesUsers } from '../services/messages/messagesService'
import { getUserById } from '../services/users/users'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/User.Identification"

const MessagesContext = createContext()
export function MessagesProvider({ children }) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [recipientId, setRecipientId] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [recipientName, setRecipientName] = useState('')
    const [fetchMessagesUsers, setFetchMessagesUsers] = useState([])
    const [openChatUsers, setOpenChatUsers] = useState([]);

    const { user } = useAuth()
    const navigate = useNavigate()
    let notificationTimeout

    useEffect(() => {
        ViewAllExistingMessages()
        if (user && user._id) {
            retrieveLastMessageFromAnyConversaTion()
        }
    }, [user])

    async function ViewAllExistingMessages() {
        try {
            const { data } = await getAllMessages()
            setMessages(data.messages)
        } catch (err) {
            console.error(err)
        }
    }

    async function searchForAnExistingUser(name) {
        try {
            const res = await openChatMessagesUsers(name)
            const usersArray = Array.isArray(res) ? res : res?.userId ? [res] : []
            setOpenChatUsers(usersArray)
            console.log(usersArray)
            return usersArray
        } catch (err) {
            console.error("❌ Error fetching open chat users", err)
            setOpenChatUsers([])
            return []
        }
    }

    async function retrieveLastMessageFromAnyConversaTion() {
        const users = await getAllMessagesUsers()
        if (!users || users.length === 0) { setFetchMessagesUsers([]); return }
        const usersWithLastMessage = await Promise.all(users.map(async (chatUser) => {
            try {
                const summary = await getSummaryMessagesUsers(chatUser._id, user._id)
                return {
                    ...chatUser,
                    lastMessage: summary?.content || "אין הודעה זמינה"
                };
            } catch (err) {
                console.error(`❌ Error fetching last message for user ${chatUser._id}`, err)
                return { ...chatUser, lastMessage: "שגיאה בטעינת הודעה" }
            }
        }))
        setFetchMessagesUsers(usersWithLastMessage)
    }


    async function handleSendMessage() {
        if (!newMessage || !recipientId) return
        try {
            await sendMessage(recipientId, newMessage)
            setSuccessMessage('Message sent successfully')
            setNewMessage('')
            setRecipientId('')
            ViewAllExistingMessages()
            navigate('/')

        } catch (error) { console.error(error) }
    }

    async function handleMarkAsRead(messageId) {
        try {
            await markMessageAsRead(messageId)
            ViewAllExistingMessages()
        } catch (err) { console.error(err) }
    }

    async function handleDeleteMessage(messageId) {
        try {
            await deleteMessage(messageId)
            ViewAllExistingMessages()
        } catch (err) { console.error(err) }
    }

    async function handleUpdateMessageCount(userId) {
        try {
            const data = await updateMessageCount(userId)
            if (data?.newMessageCount > 0) {
                setNewMessage(true)
                if (notificationTimeout) {
                    clearTimeout(notificationTimeout)
                }
                notificationTimeout = setTimeout(() => {
                    setNewMessage(false)
                }, 3000)
            } return data
        } catch (err) { console.error(err) }
    }

    async function handleGetMessageById(userId, messageId) {
        try {
            const message = messages.find((msg) => msg._id === messageId);
            if (message) {
                setRecipientId(message.sender._id);
                await fetchRecipientName(message.sender._id)
                navigate('/messages', {
                    state: {
                        recipientId: message.sender._id,
                        recipientName: message.sender.name // השתמש בשם הנמען שהתקבל
                    }
                }); return message
            }
            const data = await getMessageById(userId, messageId)
            setRecipientId(data.message.sender._id);
            await fetchRecipientName(data.message.sender._id)
            return data.message
        } catch (err) { console.error(err) }
    }

    async function fetchRecipientName(id) {
        try {
            const res = await getUserById(id);
            const fullName = [res.name?.first, res.name?.middle, res.name?.last].filter(Boolean).join(' ');
            setRecipientName(fullName);
        } catch (error) {
            console.error('Error fetching recipient name', error);
        }
    }
    return (
        <MessagesContext.Provider
            value={{
                messages,
                newMessage,
                setNewMessage,
                recipientId,
                setRecipientId,
                successMessage,
                handleSendMessage,
                handleMarkAsRead,
                handleDeleteMessage,
                handleUpdateMessageCount,
                handleGetMessageById,
                fetchRecipientName,
                recipientName,
                setMessages,
                setRecipientName,
                fetchMessagesUsers,
                searchForAnExistingUser,
                openChatUsers,
                setOpenChatUsers
            }}  >
            {children}
        </MessagesContext.Provider>
    )
}
export const useMessages = () => { return useContext(MessagesContext) }
