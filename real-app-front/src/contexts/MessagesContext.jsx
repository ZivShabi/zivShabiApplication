import { createContext, useContext, useState, useEffect } from 'react'
import { getAllMessages, sendMessage, markMessageAsRead, deleteMessage, updateMessageCount, getMessageById } from '../services/messages/messagesService'
import { getUserById } from '../services/users/users'
import { useNavigate } from 'react-router-dom';

const MessagesContext = createContext()

export const MessagesProvider = ({ children }) => {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [recipientId, setRecipientId] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [recipientName, setRecipientName] = useState('');
    const navigate = useNavigate();

    async function fetchMessages() {
        setLoading(true);
        try {
            const { data } = await getAllMessages()
            setMessages(data.messages)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    async function handleSendMessage() {
        if (!newMessage || !recipientId) return
        setLoading(true)
        try {
            await sendMessage(recipientId, newMessage)
            setSuccessMessage('Message sent successfully')
            setNewMessage('')
            setRecipientId('')
            fetchMessages()
            navigate('/')

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }


    async function handleMarkAsRead(messageId) {
        try {
            await markMessageAsRead(messageId)
            fetchMessages()
        } catch (err) {
            console.error(err)
        }
    }

    async function handleDeleteMessage(messageId) {
        try {
            await deleteMessage(messageId)
            fetchMessages()
        } catch (err) {
            console.error(err)
        }
    }


    let notificationTimeout;

    async function handleUpdateMessageCount(userId) {
        try {
            const data = await updateMessageCount(userId);
            if (data?.newMessageCount > 0) {
                setNewMessage(true)

                if (notificationTimeout) {
                    clearTimeout(notificationTimeout)
                }

                notificationTimeout = setTimeout(() => {
                    setNewMessage(false)
                }, 3000);
            }
            return data;
        } catch (err) {
            console.error(err);
        }
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
                });
                return message;
            }
            const data = await getMessageById(userId, messageId)
            setRecipientId(data.message.sender._id);
            await fetchRecipientName(data.message.sender._id)
            return data.message
        } catch (err) {
            console.error(err);
        }
    }
    async function fetchRecipientName(id) {
        try {
            const res = await getUserById(id);
            const fullName = [res.name?.first].filter(Boolean).join(' ');
            setRecipientName(fullName);
        } catch (error) {
            console.error('Error fetching recipient name:', error);
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    return (
        <MessagesContext.Provider
            value={{
                messages,
                newMessage,
                setNewMessage,
                recipientId,
                setRecipientId,
                loading,
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

            }}
        >
            {children}
        </MessagesContext.Provider>
    )
}

export const useMessages = () => { return useContext(MessagesContext) }
