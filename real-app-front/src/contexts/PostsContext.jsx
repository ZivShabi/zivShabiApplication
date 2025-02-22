import { createContext, useContext, useState, useEffect } from 'react'
import { getAllPosts, likePosts, createPosts, deletePosts, addImageToPost } from '../services/Posts/postsServices'
import { FORBIDDEN_WORDS } from '../data/dataForbiddenWords'

const PostsContext = createContext()
export function PostsProvider({ children }) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [newPost, setNewPost] = useState('')
    const [showForbidden, setShowForbiddenModal] = useState(false)
    const [forbiddenWord, setForbiddenWords] = useState([])
    const [imageFileWhileCreatingPost, setImageFileWhileCreatingPost] = useState(null)
    const [imagePostExists, setImagePostExists] = useState(null)

    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        setLoading(true)
        try {
            const { data } = await getAllPosts()
            setPosts(data)
        } catch (err) {
            console.error("Error ", err)
        } finally {
            setLoading(false)
        }
    }

    async function handleLike(postId) {
        try {
            const { data } = await likePosts(postId)
            setPosts((prevPosts) => prevPosts.map((post) =>
                post._id === postId ? {
                    ...post, likes: data.post.likes
                } : post
            ))
        } catch (err) {
            console.error("Error ", err)
        }
    }

    async function checkForForbiddenWords(content) {
        const forbiddenFound = FORBIDDEN_WORDS.filter((word) => content?.toLowerCase().includes(word))
        return forbiddenFound
    }

    async function handlePostSubmit() {
        if (!newPost && !imageFileWhileCreatingPost) return;
        try {
            const forbiddenFound = await checkForForbiddenWords(newPost)
            if (forbiddenFound.length > 0) {
                setForbiddenWords(forbiddenFound)
                setShowForbiddenModal(true)
                return
            }
            const res = await createPosts(newPost, imageFileWhileCreatingPost)
            setPosts([res.data, ...posts])
            setNewPost('')
            setImageFileWhileCreatingPost(null)
        } catch (err) { console.error(err) }
    }

    function closeForbidden() {
        setShowForbiddenModal(false)
        setForbiddenWords([])
    }

    async function handleImageSubmit(postId, imageFile) {
        if (!imageFile) return console.error("❌ No image file selected")
        try {
            const res = await addImageToPost(postId, imageFile)
            setImagePostExists(postId, imageFile)
            const responseData = res.data || res
            if (!responseData || !responseData.imageUrl) throw new Error("No imageUrl returned from server")
            const fixedImageUrl = responseData.imageUrl.replace('/uploads', '')
            setPosts((prevPosts) => prevPosts.map((post) =>
                post._id === postId ? { ...post, imageUrl: fixedImageUrl } : post
            ))
            setImagePostExists(null)
        } catch (err) { console.error("❌ Failed to add image", err) }
    }

    function updateSelectedImage(event) {
        const file = event.target.files[0]
        if (file) {
            console.log("✅ Selected file:", file)
            setImageFileWhileCreatingPost(file)
            setImagePostExists(file)
        } else { console.error("❌ No file selected") }
    }

    async function handleDeletepost(postId) {
        try {
            await deletePosts(postId)
            setPosts((prevCards) => prevCards.filter((Post) => Post._id !== postId))
        } catch (err) { console.error(err) }
    }

    return (
        <PostsContext.Provider
            value={{
                posts,
                loading,
                newPost,
                setNewPost,
                fetchPosts,
                handleLike,
                handlePostSubmit,
                handleDeletepost,
                handleImageSubmit,
                setPosts,
                showForbidden,
                closeForbidden,
                forbiddenWord,
                imageFileWhileCreatingPost,
                setImageFileWhileCreatingPost,
                imagePostExists,
                setImagePostExists,
                updateSelectedImage,

            }}  >
            {children}
        </PostsContext.Provider>
    )
}

export const usePosts = () => useContext(PostsContext)
