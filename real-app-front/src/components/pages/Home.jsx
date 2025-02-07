import { useState } from 'react'
import PageHeader from "../common/PageHeader"
import Logo from "../displays-main-page/Logo"
import '../../css/homePage.css'
import { useCards } from '../../contexts/CardsContext'
import { useAuth } from '../../contexts/User.Identification'
import { useImageContext } from '../../contexts/ImageContext'
import { usePosts } from '../../contexts/PostsContext'
import { useAudio } from '../../contexts/AudioContext'
import { useMessages } from '../../contexts/MessagesContext'
import { useNavigate } from 'react-router-dom'
import CardsView from '../common/homeView/CardsView'
import UsersView from '../common/homeView/UsersView'
import RequestsView from '../common/homeView/RequestsView'
import MessagesView from '../common/homeView/MessagesView'
import PostsView from '../common/homeView/PostsView'
import { useFriendRequest } from '../../contexts/FriendRequestContext';
import { tabs } from '../../data/dataHome'

function Home() {
    const navigate = useNavigate()
    const { image } = useImageContext()
    const [view, setView] = useState('')
    const { user } = useAuth()
    const { cards, handleToggleLike, handleDeleteCard } = useCards()
    const { posts, loading, handleImageSubmit, handleLike, handleDeletepost, imageFile } = usePosts()
    const { isRecording, handleRecordAudio, handleMarkAsListened } = useAudio()
    const { messages, setNewMessage, handleMarkAsRead,
        handleDeleteMessage, handleGetMessageById } = useMessages()
    const { users, requests, handleSendFriendRequest,
        handleAcceptRequest, handleDeleteRequest } = useFriendRequest()

    return (
        <div className="container-Home-Page">
            <PageHeader title={<>Home <Logo /></>}
                description="The home page of the project where I will present content of project"
            />
            <ul className="nav nav-tabs">
                {tabs.map(({ id, label }) => (
                    <li className="nav-item"
                        key={id}>
                        <button
                            className={`nav-link ${view === id ? 'active' : ''}`}
                            onClick={() => setView(id)}>
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
            {view === 'cards' &&
                <CardsView
                    cards={cards}
                    user={user}
                    handleDeleteCard={handleDeleteCard}
                    handleToggleLike={handleToggleLike}
                />
            }
            {view === 'users' &&
                <UsersView
                    users={users}
                    handleSendFriendRequest={handleSendFriendRequest}
                />
            }
            {view === 'requests' &&
                <RequestsView
                    requests={requests}
                    handleAcceptRequest={handleAcceptRequest}
                    handleDeleteRequest={handleDeleteRequest}
                />
            }
            {view === 'posts' &&
                <PostsView
                    posts={posts}
                    imageFile={imageFile}
                    handleImageSubmit={handleImageSubmit}
                    handleLike={handleLike}
                    handleDeletepost={handleDeletepost}
                    handleRecordAudio={handleRecordAudio}
                    isRecording={isRecording}
                    handleMarkAsListened={handleMarkAsListened}
                />
            }
            {view === 'messages' &&
                <MessagesView
                    messages={messages}
                    handleMarkAsRead={handleMarkAsRead}
                    handleDeleteMessage={handleDeleteMessage}
                    handleGetMessageById={handleGetMessageById}
                    loading={loading}
                    setNewMessage={setNewMessage}
                    navigate={navigate}
                />
            }
        </div>
    )
}
export default Home

