import { useState } from 'react'
import PageHeader from "../common/PageHeader"
import Logo from "../displays-main-page/Logo"
import '../../css/homePage.css'
import { useCards } from '../../contexts/CardsContext'
import { useAuth } from '../../contexts/User.Identification'
import { usePosts } from '../../contexts/PostsContext'
import { useAudio } from '../../contexts/AudioContext'
import { useAudioMessagesContext } from '../../contexts/MessagesAudioContext'
import { useMessages } from '../../contexts/MessagesContext'
import { useNavigate } from 'react-router-dom'
import CardsView from '../common/homeView/CardsView'
import UsersView from '../common/homeView/UsersView'
import RequestsView from '../common/homeView/RequestsView'
import MessagesView from '../common/homeView/MessagesView'
import PostsView from '../common/homeView/PostsView'
import { useFriendRequest } from '../../contexts/FriendRequestContext'
import { tabs } from '../../data/dataHome'
import DescriptionOfReferencesInProject from '../common/homeView/DescriptionOfReferencesInProject'

function Home() {
    const navigate = useNavigate()
    const [view, setView] = useState('')
    const { user } = useAuth()
    const { cards, handleToggleLike, handleDeleteCard } = useCards()
    const {
        posts, handleImageSubmit, handleLike, handleDeletepost, updateSelectedImage,
        showForbidden, forbiddenWord, closeForbidden, imageFileWhileCreatingPost
    } = usePosts()
    const { isRecording, handleRecordAudio, handleMarkAsListened } = useAudio()
    const {
        isRecordingMessages, handleRecordAudioMessages, handleMarkAsListenedMessages
    } = useAudioMessagesContext()
    const {
        messages, setNewMessage, handleMarkAsRead, handleDeleteMessage, handleGetMessageById, fetchMessagesUsers, fetchSummaryMessagesUsers, openChatUsers, searchForAnExistingUser, setOpenChatUsers,
    } = useMessages()
    const {
        users, requests, handleSendFriendRequest, handleAcceptRequest, handleDeleteRequest
    } = useFriendRequest()

    return (<div className="container-Home-Page">
        <PageHeader title={<>Home <Logo /></>}
            description="The home page of the project where I will present content of project"
        />
        <ul className="nav nav-tabs">
            {tabs.map(({ id, label }) => (<li className="nav-item" key={id}>
                <button className={`nav-link ${view === id ? 'active' : ''}`}
                    onClick={() => setView(id)}>
                    {label}
                </button>
            </li>))}
        </ul>
        {!view && DescriptionOfReferencesInProject()}
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
                handleImageSubmit={handleImageSubmit}
                handleLike={handleLike}
                handleDeletepost={handleDeletepost}
                handleRecordAudio={handleRecordAudio}
                isRecording={isRecording}
                handleMarkAsListened={handleMarkAsListened}
                updateSelectedImage={updateSelectedImage}
                showForbidden={showForbidden}
                forbiddenWord={forbiddenWord}
                closeForbidden={closeForbidden}
                imageFileWhileCreatingPost={imageFileWhileCreatingPost}
            />
        }
        {view === 'messages' &&
            <MessagesView
                messages={messages}
                fetchMessagesUsers={fetchMessagesUsers}
                fetchSummaryMessagesUsers={fetchSummaryMessagesUsers}
                searchForAnExistingUser={searchForAnExistingUser}
                setOpenChatUsers={setOpenChatUsers}
                openChatUsers={openChatUsers}
                handleMarkAsRead={handleMarkAsRead}
                handleDeleteMessage={handleDeleteMessage}
                handleGetMessageById={handleGetMessageById}
                handleRecordAudioMessages={handleRecordAudioMessages}
                isRecordingMessages={isRecordingMessages}
                handleMarkAsListenedMessages={handleMarkAsListenedMessages}
                setNewMessage={setNewMessage}
                currentUserId={user}
                navigate={navigate}
            />
        }
    </div>)
}
export default Home

