
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/displays-main-page/Footer'
import Header from './components/displays-main-page/Header'
import Home from './components/pages/Home'
import About from './components/pages/About'
import SignUp from './components/pages/SignUp'
import SignIn from './components/pages/SignIn'
import SignOut from './components/pages/SignOut'
import Messages from './components/pages/Messages'
import { UserIdentification } from './contexts/User.Identification'
import { ImageProvider } from './contexts/ImageContext'
import Posts from './components/pages/Posts'
import CreateCard from './components/pages/CreateCardBiz'
import MyCards from './components/pages/MyCards'
import Friends from './components/pages/Friends'
import { MessagesProvider } from './contexts/MessagesContext'
import { PostsProvider } from './contexts/PostsContext'
import { PostResponseProvider } from './contexts/PostResponseContext'
import { CardsProvider } from './contexts/CardsContext'
import { RatingsProvider } from "./contexts/RatingsContext"
import { AudioProvider } from './contexts/AudioContext'
import { VideoProvider } from './contexts/VideoContext'
import AdminSettings from './components/pages/AdminSettings'
import EditingProfile from './components/pages/EditingProfile'
import DigitalBackground from './components/displays-main-page/DimensionalBackground'
import { FriendRequestProvider } from './contexts/FriendRequestContext'
import { AudioMessagesProvider } from './contexts/MessagesAudioContext'
function App() {
  return (<UserIdentification> <ImageProvider> <MessagesProvider>
    <PostsProvider> <PostResponseProvider><CardsProvider> <RatingsProvider>
      <AudioProvider><VideoProvider> <FriendRequestProvider> <AudioMessagesProvider>
        <div className="app min-vh-100 d-flex flex-column gap-2">
          <Header />
          <main className='flex-fill container'>
            <DigitalBackground />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path="/sign-out" element={<SignOut />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/createCard" element={<CreateCard />} />
              <Route path="/myCards" element={<MyCards />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/adminSettings" element={<AdminSettings />} />
              <Route path="/editingProfile" element={<EditingProfile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AudioMessagesProvider> </FriendRequestProvider> </VideoProvider> </AudioProvider>
    </RatingsProvider></CardsProvider> </PostResponseProvider> </PostsProvider>
  </MessagesProvider> </ImageProvider> </UserIdentification>)
}
export default App
