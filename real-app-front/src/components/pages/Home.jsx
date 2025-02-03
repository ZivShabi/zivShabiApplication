
import { useState, useEffect, useRef, useCallback } from 'react'
import PageHeader from "../common/PageHeader"
import Logo from "../displays-main-page/Logo"
import '../../css/homePage.css'
import CardStructureHome from '../common/CardStructureHome'
import { useCards } from '../../contexts/CardsContext'
import { useAuth } from '../../contexts/User.Identification'
import { useImageContext } from '../../contexts/ImageContext'
import {
    getMe, friendRequest, getFriendRequests, acceptfriendRequest, deletefriendRequest
} from '../../services/users/users'
import UserRowMinTable from '../common/UserRowMinTable'
import { usePosts } from '../../contexts/PostsContext'
import { useAudio } from '../../contexts/AudioContext'
import { usePostResponse } from '../../contexts/PostResponseContext'
import PostResponse from './PostResponse'
import PostAudioTable from '../common/PostAudioTable'
import ForbiddenWordsModal from '../common/ForbiddenWordsModal'
import PostButtons from '../common/PostButtons'
import { useMessages } from '../../contexts/MessagesContext'
import MessageItem from '../common/MessageItem'
import { useNavigate } from 'react-router-dom'

function Home() {
    const { cards, handleToggleLike, handleDeleteCard } = useCards()
    const { image } = useImageContext()
    const userImage = image || (user && user.image ? user.image.url : "default-image-url")
    const [users, setUsers] = useState([])
    const [view, setView] = useState('')
    const { user, requests = [], setRequests } = useAuth()
    const userId = user?._id
    const { posts, loading, handleImageSubmit, handleLike, handleDeletepost, imageFile } = usePosts()
    const { showForbiddenModal, forbiddenWords, closeForbiddenModal } = usePostResponse()
    const { isRecording, handleRecordAudio, handleMarkAsListened } = useAudio()
    const { messages, setNewMessage, handleMarkAsRead, handleDeleteMessage, handleGetMessageById } = useMessages()
    const navigate = useNavigate()
    const hasFetched = useRef(false)

    // const fetchUserData = useCallback(async () => {
    //     try {
    //         const data = await getMe();
    //         const friendRequests = await getFriendRequests(userId);
    //         const validFriendRequests = Array.isArray(friendRequests) ? friendRequests : [];
    //         setRequests(validFriendRequests);
    //         setUsers(data.filter(user =>
    //             Array.isArray(validFriendRequests) &&
    //             !validFriendRequests.some(request => request._id === user._id)
    //         ))

    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }, [setRequests, userId])

    // useEffect(() => {
    //     if (userId && !hasFetched.current) {
    //         fetchUserData();
    //         hasFetched.current = true;
    //     }
    // }, [userId, fetchUserData]);
    useEffect(() => {
        if (!userId || hasFetched.current) return;

        (async () => {
            try {
                const data = await getMe(); // מחזיר את כל המשתמשים
                const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
                const friendRequests = await getFriendRequests(userId); // מחזיר את בקשות החברות

                // console.log("Users from getMe:", data);
                // console.log("Stored Requests from localStorage:", storedRequests);
                // console.log("Friend Requests from getFriendRequests:", friendRequests);

                const validRequests = Array.isArray(friendRequests) ? friendRequests : [];

                // אם יש בקשות שלא נטענו כראוי מהשרת, טוענים אותן מה-localStorage
                setRequests(validRequests.length > 0 ? validRequests : storedRequests); // מעדכן את בקשות החברות
                setUsers(data.filter(user => {
                    // מסנן את המשתמשים שלא נמצאים בבקשות חברים ושהם לא בקשה ממתינה מאותו משתמש
                    return !validRequests.some(request => request._id === user._id) &&
                        !requests.some(request => request._id === user._id);
                }));
                hasFetched.current = true;
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [userId])


    const handleFriendRequest = useCallback(async (action, id) => {
        try {
            let response;
            switch (action) {
                case "send":
                    response = await friendRequest(id);
                    const updatedUser = users.find(user => user._id === id);
                    const updatedRequests = [...requests, updatedUser];
                    localStorage.setItem('requests', JSON.stringify(updatedRequests));
                    setRequests(updatedRequests);
                    setUsers(prev => prev.filter(user => user._id !== id));
                    break;
                case "accept":
                    response = await acceptfriendRequest(id);
                    const updatedRequestsAfterAccept = requests.filter(request => request._id !== id);
                    localStorage.setItem('requests', JSON.stringify(updatedRequestsAfterAccept));
                    setRequests(updatedRequestsAfterAccept);
                    // setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                    break;
                case "delete":
                    response = await deletefriendRequest(id);
                    const updatedRequestsAfterDelete = requests.filter(request => request._id !== id);
                    localStorage.setItem('requests', JSON.stringify(updatedRequestsAfterDelete));
                    setRequests(updatedRequestsAfterDelete);

                    break;
                default:
                    console.warn("Unknown action:", action);
            }
            return response;
        } catch (error) {
            console.error(error.message);
        }
    }, [users, requests]);

    // async function handleSendFriendRequest(id) {
    //     try {
    //         await friendRequest(id);
    //         const requestedUser = users.find(user => user._id === id);
    //         if (requestedUser) {
    //             setRequests(prevRequests => [...prevRequests, requestedUser]);
    //             setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
    //         }
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }
    // async function handleAcceptRequest(id) {
    //     try {
    //         await acceptfriendRequest(id);
    //         setRequests(prevRequests => prevRequests.filter(request => request._id !== id));
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }
    // async function handleDeleteRequest(id) {
    //     try {
    //         await deletefriendRequest(id);
    //         setRequests(prevRequests => prevRequests.filter(request => request._id !== id));
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }

    if (loading) return <div>Loading</div>
    return (
        <div className="container-Home-Page">
            <PageHeader title={<>Home <Logo /></>}
                description="The home page of the project where I will present content of project"
            />
            <ul className="nav nav-tabs">
                {['cards', 'users', 'requests', 'messages', 'posts'].map(tab => (
                    <li className="nav-item" key={tab}>
                        <button
                            className={`nav-link ${view === tab ? 'active' : ''}`}
                            onClick={() => setView(tab)}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    </li>
                ))}
            </ul>
            {view === 'cards' && (
                <div className="cards-grid">
                    {cards.map(card => (
                        <CardStructureHome
                            key={card._id}
                            cardData={{
                                title: card.title,
                                description: card.description,
                                email: card.email,
                                web: card.web,
                                imageSrc: card.image?.url,
                                alt: card.title,
                                openingText: card.openingText,
                                phone: card.phone,
                                addressLine1: card.address.street,
                                addressLine2: card.address.houseNumber,
                                city: card.address.city,
                                state: card.address.state,
                                zip: card.address.zip,
                                liked: card.likes.includes(user._id),
                                likesCount: card.likes.length,
                                creatorId: card.userId,
                            }}
                            onDelete={() => handleDeleteCard(card._id, card.liked)}
                            onLike={() => handleToggleLike(card._id, card.liked)}
                        />
                    ))}
                </div>
            )}
            {view === 'users' && (
                <div className="table-container">
                    <div className="table-responsive user-table">
                        <table className="table table-bordered table-striped  table-hover user-table__content">
                            <thead className="table-dark">
                                <tr>
                                    <th>First Name</th>
                                    <th>Middle Name</th>
                                    <th>Last Name</th>
                                    <th>Role</th>
                                    <th>Type</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th> Add Friend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(users) && users.map(user => (
                                    // <UserRowMinTable
                                    //     key={user._id}
                                    //     user={user}
                                    //     onSendRequest={handleSendFriendRequest}
                                    // />
                                    <UserRowMinTable
                                        key={user._id}
                                        user={user}
                                        onSendRequest={() => handleFriendRequest("send", user._id)}
                                    />

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {view === 'requests' && (
                <div className="table-container">
                    <div className="table-responsive user-table">
                        <table className="table table-bordered table-striped table-hover user-table__content">
                            <thead className="table-dark">
                                <tr>
                                    <th>First Name</th>
                                    <th>Middle Name</th>
                                    <th>Last Name</th>
                                    <th>Role</th>
                                    <th>Type</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(requests) && requests.map(request => (
                                    // <UserRowMinTable
                                    //     key={request._id}
                                    //     user={request}
                                    //     onAcceptRequest={userId !== request.senderId ?
                                    //         handleAcceptRequest : null}
                                    //     onDeclineRequest={userId !== request.senderId ?
                                    //         handleDeleteRequest : null}
                                    //     requestPending={userId === request.senderId}
                                    // />
                                    <UserRowMinTable
                                        key={request._id}
                                        user={request}
                                        onAcceptRequest={() => handleFriendRequest("accept", request._id)}
                                        onDeclineRequest={() => handleFriendRequest("delete", request._id)}
                                    />

                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {view === 'posts' && (
                <div className="container-posts">
                    <div className="posts">
                        <PostAudioTable />
                        {posts.length === 0 ? '' : (
                            posts.map(post => (
                                <div key={post._id}>
                                    {imageFile && (
                                        <button type="button"
                                            className="btn btn-outline-primary like-button"
                                            onClick={() => handleImageSubmit(posts[0]._id, imageFile)}>
                                            <i className="bi bi-camera"></i>
                                        </button>
                                    )}
                                    {post.imageUrl && (
                                        <img
                                            src={post.imageUrl}
                                            alt="Post"
                                            className="img-fluid mt-3"
                                            style={{ maxHeight: '300px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <PostButtons
                                        key={post._id}
                                        post={post}
                                        handleLike={handleLike}
                                        handleDeletepost={handleDeletepost}
                                        handleRecordAudio={handleRecordAudio}
                                        isRecording={isRecording}
                                        handleMarkAsListened={handleMarkAsListened}
                                        handleImageSubmit={handleImageSubmit}
                                        imageFile={imageFile}
                                    />
                                    <PostResponse postId={post._id} />
                                </div>
                            ))
                        )}
                        <ForbiddenWordsModal
                            show={showForbiddenModal}
                            onClose={() => closeForbiddenModal(false)}
                            forbiddenWords={forbiddenWords}
                        />
                    </div>
                </div>
            )}
            {view === 'messages' && (
                <div className="messages-list">

                    <ul className="user-suggestions">
                        {loading ? '' : (
                            <ul>
                                {messages.map(message => (
                                    <MessageItem
                                        key={message._id}
                                        message={message}
                                        onMarkAsRead={handleMarkAsRead}
                                        onDelete={handleDeleteMessage}
                                        onReply={(msg) => {
                                            setNewMessage(`Replying to: ${msg.content}`)
                                            navigate('/messages', { state: { messageId: msg._id } })
                                        }}
                                        loading={loading}
                                        onMessageById={(senderId, messageId) => handleGetMessageById(senderId, messageId)}
                                    />
                                ))}
                            </ul>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
export default Home
