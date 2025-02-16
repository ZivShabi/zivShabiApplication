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
    const [imageFileWhileCreatingPost, setImageFileWhileCreatingPost] = useState(null)
    const [imagePostExists, setImagePostExists] = useState(null)



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
        if (!newPost && !imageFileWhileCreatingPost) return
        if (!newPost && imageFileWhileCreatingPost === null) return
        try {

            const forbiddenFound = await checkForForbiddenWords(newPost);
            if (forbiddenFound.length > 0) {
                setForbiddenWords(forbiddenFound);  // שומר את המילים האסורות
                setShowForbiddenModal(true); // מציג את המודל עם המילים האסורות
                return;
            }
            // console.log("Checking newPost and imageFile:", newPost, imageFileWhileCreatingPost);
            // const formData = new FormData();
            // formData.append("content", newPost);
            // if (imageFileWhileCreatingPost) {
            //     formData.append("image", imageFileWhileCreatingPost);
            // }
            // console.log("FormData:", formData);
            // console.log("Image size:", imageFileWhileCreatingPost.size);
            const { data } = await createPosts(newPost, imageFileWhileCreatingPost);
            setPosts([data.post, ...posts]);
            setNewPost('');
            setImageFileWhileCreatingPost(null);


        } catch (err) {
            console.error(err);
        }
    }


    function closeForbidden() {
        setShowForbiddenModal(false); // סוגר את המודל
        setForbiddenWords([]); // מאפס את המילים האסורות
    }


    async function handleImageSubmit(postId, imagePostExists) {
        try {
            if (!imagePostExists) {
                console.error('❌ No image file selected');
                return;
            }

            const formData = new FormData();
            formData.append('image', imagePostExists);

            const { data } = await addImageToPost(postId, formData);

            if (!data.imageUrl) {
                console.error('❌ No imageUrl returned from server:', data);
                return;
            }

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, imageUrl: data.imageUrl } : post
                )
            );
            setImagePostExists(null);
            console.log('✅ Updated Posts State:', data);
            alert('Image added successfully!');
        } catch (err) {
            console.error('❌ Failed to add image:', err);
            alert('Failed to add image. Please try again.');
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
                forbiddenWord,
                imagePostExists,
                setImageFileWhileCreatingPost,
                imageFileWhileCreatingPost
            }}  >
            {children}
        </PostsContext.Provider>
    )
}

export const usePosts = () => useContext(PostsContext)
