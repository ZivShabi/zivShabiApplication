import { createContext, useContext, useState, useEffect } from 'react'
import { getAllPosts, likePosts, createPosts, deletePosts, addImageToPost } from '../services/Posts/postsServices'
import { FORBIDDEN_WORDS } from '../data/dataForbiddenWords'

const PostsContext = createContext()

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [newPost, setNewPost] = useState('')
    const [showForbidden, setShowForbiddenModal] = useState(false);
    const [forbiddenWord, setForbiddenWords] = useState([]);


    useEffect(() => {
        fetchPosts()
    }, []);

    async function fetchPosts() {
        setLoading(true);
        try {
            const { data } = await getAllPosts()
            setPosts(data);
        } catch (err) { } finally {
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
        } catch (err) { }
    }

    async function checkForForbiddenWords(content) {
        const forbiddenFound = FORBIDDEN_WORDS.filter((word) =>
            content?.toLowerCase().includes(word)
        );
        return forbiddenFound;
    }


    async function handlePostSubmit() {
        if (!newPost) return;
        try {

            const forbiddenFound = await checkForForbiddenWords(newPost);
            if (forbiddenFound.length > 0) {
                setForbiddenWords(forbiddenFound);  // שומר את המילים האסורות
                setShowForbiddenModal(true); // מציג את המודל עם המילים האסורות
                return;
            }

            const { data } = await createPosts(newPost, null);
            setPosts([data.post, ...posts]);
            setNewPost('');
        } catch (err) {
            console.error(err);
        }
    }

    function closeForbidden() {
        setShowForbiddenModal(false); // סוגר את המודל
        setForbiddenWords([]); // מאפס את המילים האסורות
    }

    async function handleImageSubmit(postId, imageFile) {
        if (!imageFile) return alert('Please select an image first.');

        try {
            await addImageToPost(postId, imageFile);
            alert('Image added successfully!');
        } catch (err) {
            alert('Failed to add image. Please try again.');
            console.error(err);
        }
    }

    async function handleDeletepost(postId) {
        try {
            await deletePosts(postId)
            setPosts((prevCards) => prevCards.filter((Post) => Post._id !== postId))
        } catch (err) {
            console.error(err)
        }
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
                forbiddenWord
            }}  >
            {children}
        </PostsContext.Provider>
    )
}

export const usePosts = () => useContext(PostsContext)
