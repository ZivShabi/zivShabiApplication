import React, { createContext, useContext, useState, useEffect } from "react"
import { getAverageRating, addRating } from "../services/ratings/ratingsServics"

const RatingsContext = createContext()

export function RatingsProvider({ children }) {
    const [averageRating, setAverageRating] = useState(null)

    async function fetchAverageRating() {
        try {
            const avg = await getAverageRating()
            setAverageRating(avg)
        } catch (error) {
            console.error("Error fetching average rating", error)
        }
    }

    async function submitRating(rating) {
        try {
            if (rating) {
                await addRating({ rating })
                fetchAverageRating()
            }
        } catch (error) {
            console.error("Error submitting rating:", error)
        }
    }

    useEffect(() => {
        fetchAverageRating()
    }, [])

    return (
        <RatingsContext.Provider value={{ averageRating, submitRating, fetchAverageRating }}>
            {children}
        </RatingsContext.Provider>
    )
}

export const useRatings = () => useContext(RatingsContext)
