import { createContext, useContext, useState } from 'react'
import { fetchResponses, createResponse, deleteResponse, likeResponse, unlikeResponse } from '../services/responseRoutes/postResponseServices'
import { FORBIDDEN_WORDS } from '../data/dataForbiddenWords'
import { useAuth } from '../contexts/User.Identification'
const PostResponseContext = createContext()

export function PostResponseProvider({ children }) {
    const [responsesByPostId, setResponsesByPostId] = useState({})
    const [loading, setLoading] = useState(false)
    const [newResponseByPostId, setNewResponseByPostId] = useState({})
    const [showForbiddenModal, setShowForbiddenModal] = useState(false)
    const [forbiddenWords, setForbiddenWords] = useState([])

    const { user } = useAuth()



    async function fetchResponsesData(postId) {
        setLoading(true)
        try {
            const data = await fetchResponses(postId)
            setResponsesByPostId((prev) => ({ ...prev, [postId]: data }))
        } catch (err) {
            console.error(err)
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
            setResponsesByPostId((prev) => {
                const currentResponses = prev[postId] || []
                return {
                    ...prev,
                    [postId]: currentResponses.filter((response) => response._id !== responseId),
                };
            });
            fetchResponsesData(postId);
            await deleteResponse(responseId);
        } catch (err) {
            console.error('Error deleting response', err);
        }
    }



    const setNewResponse = (postId, value) => {
        setNewResponseByPostId((prev) => ({ ...prev, [postId]: value }))
    }



    async function handleToggleLike(postId, responseId) {
        const responseList = responsesByPostId[postId];
        if (!Array.isArray(responseList)) {
            console.error('Post ID not found or invalid structure')
            return;
        }

        const responseIndex = responseList.findIndex((res) => res._id === responseId)
        if (responseIndex === -1) {
            return;
        }

        const isLiked = responseList[responseIndex].likes?.length > 0

        try {
            if (isLiked) {
                await unlikeResponse(responseId);
            } else {
                await likeResponse(responseId);
            }

            setResponsesByPostId((prev) => ({
                ...prev,
                [postId]: prev[postId].map((res, index) => {
                    if (index !== responseIndex) { return res; }
                    if (isLiked) {
                        res.likes = res.likes.filter(x => x !== user._id);
                    } else if (!res.likes.includes(user._id)) {
                        res.likes.push(user._id);
                    }
                    return res;
                })
            }));
        } catch (error) {
            console.error('Error  like', error)
        }
    }





    return (
        <PostResponseContext.Provider
            value={{
                responsesByPostId,
                loading,
                newResponseByPostId,
                fetchResponsesData,
                setNewResponse,
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
