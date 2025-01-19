import React, { createContext, useContext, useState } from 'react'
import {
    getAllCards,
    getMyCards,
    deleteCard,
    LikeCard,
    UnlikeCard
} from '../services/cards/cardsService'

const CardsContext = createContext()

export const useCards = () => useContext(CardsContext)

export const CardsProvider = ({ children }) => {
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchAllCards() {
        try {
            setLoading(true)
            const fetchedCards = await getAllCards()
            setCards(fetchedCards)
        } catch (err) { } finally {
            setLoading(false)
        }
    }

    async function fetchMyCards() {
        try {
            setLoading(true)
            const myCards = await getMyCards()
            setCards(myCards)
        } catch (err) { } finally {
            setLoading(false)
        }
    }

    async function handleToggleLike(id, isLiked) {
        try {
            const updatedCard = isLiked ? await UnlikeCard(id) : await LikeCard(id)
            setCards((prevCards) => prevCards.map((card) =>
                card._id === id ? {
                    ...card,
                    liked: !isLiked,
                    likesCount: updatedCard.likes.length,
                } : card
            ))
        } catch (error) {
            console.error(error.response?.data || error.message)
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
                fetchAllCards,
                fetchMyCards,
                handleToggleLike,
                handleDeleteCard,
            }}  >
            {children}
        </CardsContext.Provider>
    )
}
