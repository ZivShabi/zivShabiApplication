import { createContext, useContext, useState, useEffect } from 'react'
import { getAllPosts, likePosts, createPosts, deletePosts, addImageToPost } from '../services/Posts/postsServices'

const PostsContext = createContext()

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [newPost, setNewPost] = useState('')


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

    async function handlePostSubmit() {
        if (!newPost) return;
        try {
            const { data } = await createPosts(newPost, null);
            setPosts([data.post, ...posts]);
            setNewPost('');

        } catch (err) {
            console.error(err);
        }
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
                setPosts
            }}  >
            {children}
        </PostsContext.Provider>
    )
}

export const usePosts = () => useContext(PostsContext)
