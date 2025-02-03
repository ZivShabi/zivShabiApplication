import React, { createContext, useState, useEffect, useContext } from "react"
import { getUser, userslogout } from "../services/users/users"

export const UserContext = createContext()

// export const UserIdentification = ({ children }) => {
//     let userData = null
//     try {
//         userData = getUser()
//     } catch (error) {
//         console.error("Error initializing user", error)
//     }
//     const [user, setUser] = useState(userData)
//     const [requests, setRequests] = useState(userData?.requests || []);

//     function logout() {
//         userslogout(null)
//         setUser(null)
//         setRequests([]);

//     }

//     return (
//         <UserContext.Provider value={{ user, setUser, logout, requests, setRequests }}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export const useAuth = () => useContext(UserContext)

export const UserIdentification = ({ children }) => {
    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        let userData = null;
        try {
            userData = getUser();
        } catch (error) {
            console.error("Error initializing user", error);
        }

        if (userData) {
            setUser(userData);
            setRequests(userData.requests || []);
        }
    }, []);

    function logout() {
        userslogout(null);
        setUser(null);
        setRequests([]);
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout, requests, setRequests }}>
            {children}
        </UserContext.Provider>
    );
};
export const useAuth = () => useContext(UserContext)
