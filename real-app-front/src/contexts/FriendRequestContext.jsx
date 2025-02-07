import { createContext, useState, useContext, useEffect } from 'react';
import {
    getMeuUsers,
    getFriendRequests,
    friendRequest,
    acceptFriendRequest,
    deleteFriendRequest
} from "../services/membershipReq/membershipReqService";
import { useAuth } from "../contexts/User.Identification";

const FriendRequestContext = createContext();


export const FriendRequestProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            fetchData(user._id);
        }
    }, [user])

    const fetchData = async (userId) => {
        if (!userId) return;

        try {
            // console.log("Fetching users with ID:", userId);

            // const usersData = await getMeuUsers(userId);
            // console.log("Fetched users:", usersData);

            // const friendRequestsData = await getFriendRequests(userId);
            // console.log("Fetched friend requests:", friendRequestsData);

            // setUsers(usersData);
            // setRequests(friendRequestsData);

        } catch (error) {
            setError(error.message);
            console.error("Error fetching data:", error.message);
        }
    };

    const handleSendFriendRequest = async (id) => {
        try {
            await friendRequest(id);
            setRequests(prevRequests => prevRequests.filter(request => request._id !== id));
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id));

        } catch (error) {
            setError(error.message);
            console.error("Friend request error:", error);
        }
    };

    const handleAcceptRequest = async (id) => {
        try {
            await acceptFriendRequest(id);
            setRequests((prev) => prev.filter((request) => request._id !== id));
        } catch (error) {
            setError(error.message);
            console.error("Accept Friend request error:", error);
        }
    };
    const handleDeleteRequest = async (id) => {
        try {
            await deleteFriendRequest(id);
            setRequests((prev) => prev.filter((request) => request._id !== id));
        } catch (error) {
            setError(error.message);
            console.error("Delete Friend request error:", error);
        }
    };


    return (
        <FriendRequestContext.Provider
            value={{
                users,
                requests,
                error,
                handleSendFriendRequest,
                handleAcceptRequest,
                handleDeleteRequest,
            }}>
            {children}
        </FriendRequestContext.Provider>
    );
};

export const useFriendRequest = () => {
    return useContext(FriendRequestContext);
};
