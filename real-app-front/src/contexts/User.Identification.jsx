import React, { createContext, useState, useEffect, useContext } from "react"
import { getUser, userslogout } from "../services/users/users"

export const UserContext = createContext()


export const UserIdentification = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let userData = null;
        try {
            userData = getUser();
        } catch (error) {
            console.error("Error initializing user", error);
        }

        if (userData) {
            setUser(userData);
        }
    }, []);

    function logout() {
        userslogout(null);
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};
export const useAuth = () => useContext(UserContext)
