
import { createContext, useState, useContext, useEffect } from 'react'
import {
    getMeuUsers,
    getFriendRequests,
    friendRequest,
    acceptFriendRequest,
    deleteFriendRequest,
    getFriends
} from "../services/membershipReq/membershipReqService"
import { useAuth } from "../contexts/User.Identification"

const FriendRequestContext = createContext()

export function FriendRequestProvider({ children }) {
    const [users, setUsers] = useState([])
    const [requests, setRequests] = useState([])
    const [friends, setFriends] = useState([])
    const [error, setError] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        if (user?._id) {
            loadFriendRequests(user._id)
            loadFriends(user._id)
        }
    }, [user])

    async function loadFriends(id) {
        try {
            const friendsData = await getFriends(id)
            setFriends(friendsData)
        } catch (error) {
            setError(error.message)
            console.error("Error fetching friends:", error.response ? error.response.data : error.message)
        }
    }

    async function loadFriendRequests(id) {
        try {
            const usersData = await getMeuUsers(id) || []
            const friendRequestsData = await getFriendRequests(id) || []
            const storedRequests = localStorage.getItem('friendRequests')
            const parsedStoredRequests = storedRequests ? JSON.parse(storedRequests) : []
            const mergedRequests = [...friendRequestsData, ...parsedStoredRequests]
                .filter((req, i, self) => i === self.findIndex(r => r._id === req._id))
            const uniqueRequests = Array.from(new Map(mergedRequests.map(r => [r._id, r])).values())

            setUsers(usersData)
            setRequests(uniqueRequests)
            localStorage.setItem('friendRequests', JSON.stringify(uniqueRequests));
        } catch (error) {
            setError(error.message)
            console.error("Error fetching data", error.message)
        }
    }



    async function handleSendFriendRequest(id) {
        try {
            await friendRequest(id)
            setRequests(prev => [...prev, { _id: id }])
            setUsers(prev => prev.filter(user => user._id !== id))
            const updatedRequests = requests.filter(request => request._id !== id)
            localStorage.setItem('friendRequests', JSON.stringify(updatedRequests))
        } catch (error) {
            setError(error.message)
            console.error("Friend request error", error)
        }
    }

    async function handleAcceptRequest(id) {
        try {
            await acceptFriendRequest(id)
            setRequests(prev => prev.filter(request => request._id !== id))
            loadFriends(user._id)
            const updatedRequests = requests.filter(request => request._id !== id)
            localStorage.setItem('friendRequests', JSON.stringify(updatedRequests))
        } catch (error) {
            setError(error.message)
            console.error("Accept Friend request error", error)
        }
    }

    async function handleDeleteRequest(id) {
        try {
            await deleteFriendRequest(id);
            setRequests(prev => prev.filter(request => request._id !== id));
            const updatedRequests = requests.filter(request => request._id !== id);
            localStorage.setItem('friendRequests', JSON.stringify(updatedRequests));
        } catch (error) {
            setError(error.message);
            console.error("Delete Friend request error", error);
        }
    }


    return (
        <FriendRequestContext.Provider value={{
            users,
            requests,
            friends,
            error,
            handleSendFriendRequest,
            handleAcceptRequest,
            handleDeleteRequest,
            loadFriends,
            setRequests
        }}>
            {children}
        </FriendRequestContext.Provider>
    )
}

export const useFriendRequest = () => useContext(FriendRequestContext)
