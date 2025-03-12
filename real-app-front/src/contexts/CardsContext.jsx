import React, { createContext, useContext, useState, useEffect } from 'react'
import {
    getAllCards,
    getMyCards,
    deleteCard,
    LikeCard,
    UnlikeCard
} from '../services/cards/cardsService'

const CardsContext = createContext()

export const useCards = () => useContext(CardsContext)

export function CardsProvider({ children }) {
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAllCards()
        fetchMyCards()
    }, [])

    async function fetchAllCards() {
        try {
            setLoading(true)
            const homeCards = await getAllCards()
            if (Array.isArray(homeCards)) {
                setCards(homeCards)
            } else if (homeCards && Array.isArray(homeCards.cards)) {
                setCards(homeCards.cards)
            } else {
                setCards([])
            }
        } catch (err) { } finally {
            setLoading(false)
        }
    }

    async function fetchMyCards() {
        try {
            setLoading(true)
            const myCards = await getMyCards()
            if (Array.isArray(myCards)) {
                setCards(myCards)
            } else if (myCards && Array.isArray(myCards.cards)) {
                setCards(myCards.cards)
            } else {
                setCards([])
            }
        } catch (err) { } finally {
            setLoading(false)
        }
    }

    async function handleToggleLike(id, isLiked) {
        try {
            const updatedCard = isLiked
                ? await UnlikeCard(id)
                : await LikeCard(id);

            setCards((prevCards) =>
                prevCards.map((card) =>
                    card._id === id
                        ? { ...updatedCard, liked: !isLiked }
                        : card
                )
            );
        } catch (error) {
            console.error("Error toggling like:", error.response?.data || error.message);
        }
    }


    async function handleDeleteCard(id) {
        try {
            await deleteCard(id);
            setCards((prevCards) => prevCards.filter((card) => card._id !== id))
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    }


    return (
        <CardsContext.Provider
            value={{
                cards,
                loading,
                setCards,
                setLoading,
                handleToggleLike,
                handleDeleteCard,
            }}  >
            {children}
        </CardsContext.Provider>
    )
}

