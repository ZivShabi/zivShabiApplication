import { createContext, useContext, useState } from 'react'
import { fetchResponses, createResponse, deleteResponse, likeResponse, unlikeResponse } from '../services/responseRoutes/postResponseServices'
import { FORBIDDEN_WORDS } from '../data/dataForbiddenWords'
const PostResponseContext = createContext()

export const PostResponseProvider = ({ children }) => {
    const [responsesByPostId, setResponsesByPostId] = useState({})
    const [loading, setLoading] = useState(false)
    const [newResponseByPostId, setNewResponseByPostId] = useState({})
    const [showForbiddenModal, setShowForbiddenModal] = useState(false)
    const [forbiddenWords, setForbiddenWords] = useState([])

    async function fetchResponsesData(postId) {
        setLoading(true)
        try {
            const data = await fetchResponses(postId)
            setResponsesByPostId((prev) => ({ ...prev, [postId]: data }))
        } catch (err) {
            console.error('Error fetching responses', err)
        } finally {
            setLoading(false)
        }
    }


    async function checkForForbiddenWords(postId) {
        const newContent = newResponseByPostId[postId]
        if (!newContent) return false

        const forbiddenFound = FORBIDDEN_WORDS.filter((word) =>
            newContent?.toLowerCase().includes(word)
        )
        if (forbiddenFound.length > 0) {
            setForbiddenWords(forbiddenFound)
            setShowForbiddenModal(true)
            return true
        }
        return false
    }
    async function handleResponseSubmit(postId) {
        const isForbidden = await checkForForbiddenWords(postId)
        if (isForbidden) return
        try {
            const newContent = newResponseByPostId[postId]
            const response = await createResponse(postId, newContent)
            const updatedResponse = {
                ...response,
                content: newContent,
                createdAt: response.createdAt || new Date().toISOString(),
            }
            setResponsesByPostId((prev) => ({
                ...prev,
                [postId]: [updatedResponse, ...(prev[postId] || [])],
            }))
            setNewResponseByPostId((prev) => ({ ...prev, [postId]: '' }))
        } catch (err) {
            console.error('Error creating response', err.message)
        }
    }


    function closeForbiddenModal() {
        setShowForbiddenModal(false)
        setForbiddenWords([])
    }


    async function handleDeleteResponse(postId, responseId) {
        try {
            await deleteResponse(responseId)
            setResponsesByPostId((prev) => ({
                ...prev,
                [postId]: (prev[postId] || []).filter((response) => response._id !== responseId)
            }))
        } catch (err) {
            console.error('Error deleting response', err)
        }
    }

    const setNewResponse = (postId, value) => {
        setNewResponseByPostId((prev) => ({ ...prev, [postId]: value }))
    }


    async function handleToggleLike(postId, responseId, isLiked) {
        try {
            if (isLiked) {
                await unlikeResponse(responseId)
            } else {
                await likeResponse(responseId)
            }

            setResponsesByPostId((prev) => ({
                ...prev,
                [postId]: prev[postId].map((response) =>
                    response._id === responseId
                        ? {
                            ...response,
                            liked: !isLiked,
                            likesCount: response.likesCount + (isLiked ? -1 : 1)
                        }
                        : response
                ),
            }));
        } catch (error) {
            console.error('Error toggling like', error);
        }
    }




    return (
        <PostResponseContext.Provider
            value={{
                responsesByPostId,
                loading,
                newResponseByPostId,
                setNewResponse,
                fetchResponsesData,
                handleResponseSubmit,
                handleDeleteResponse,
                handleToggleLike,
                setShowForbiddenModal,
                forbiddenWords,
                showForbiddenModal,
                closeForbiddenModal

            }}  >
            {children}

        </PostResponseContext.Provider>
    )
}

export const usePostResponse = () => useContext(PostResponseContext)
