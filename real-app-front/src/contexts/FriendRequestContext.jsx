
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
            console.log("Fetching data for user:", user._id)
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
                .filter((request, index, self) => index === self.findIndex(r => r._id === request._id))
            setUsers(usersData)
            setRequests(mergedRequests)
            console.log(usersData)
            console.log(mergedRequests)
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
        } catch (error) {
            setError(error.message)
            console.error("Accept Friend request error", error)
        }
    }

    async function handleDeleteRequest(id) {
        try {
            await deleteFriendRequest(id)
            setRequests(prev => prev.filter(request => request._id !== id))
        } catch (error) {
            setError(error.message)
            console.error("Delete Friend request error", error)
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
            loadFriends
        }}>
            {children}
        </FriendRequestContext.Provider>
    )
}

export const useFriendRequest = () => useContext(FriendRequestContext)
