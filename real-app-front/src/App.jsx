
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
import Favourites from './components/pages/Favourites'
import { MessagesProvider } from './contexts/MessagesContext'
import { PostsProvider } from './contexts/PostsContext'
import { PostResponseProvider } from './contexts/PostResponseContext'
import { CardsProvider } from './contexts/CardsContext'
import { RatingsProvider } from "./contexts/RatingsContext"
import { AudioProvider } from './contexts/AudioContext'
import AdminSettings from './components/pages/AdminSettings'
import EditingProfile from './components/pages/EditingProfile'
function App() {
  return (<UserIdentification> <ImageProvider> <MessagesProvider>
    <PostsProvider> <PostResponseProvider><CardsProvider> <RatingsProvider>
      <AudioProvider>
        <div className="app min-vh-100 d-flex flex-column gap-2">
          <Header />
          <main className='flex-fill container'>
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
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/admin-settings" element={<AdminSettings />} />
              <Route path="/editing-profile" element={<EditingProfile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AudioProvider>
    </RatingsProvider></CardsProvider> </PostResponseProvider> </PostsProvider>
  </MessagesProvider> </ImageProvider> </UserIdentification>)
}
export default App
