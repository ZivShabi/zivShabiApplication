import '../../css/posts.css'
import { useRef } from 'react'
import PageHeader from '../common/PageHeader'
import { usePosts } from '../../contexts/PostsContext'
import PostAudioTable from '../common/PostAudioTable'
import { useNavigate } from 'react-router-dom'

function Posts() {
    const { newPost, setNewPost, handlePostSubmit,
        updateSelectedImage, imageFileWhileCreatingPost } = usePosts()

    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    function handleButtonClick() {
        if (fileInputRef && fileInputRef.current) {
            fileInputRef.current.click()
        }
    }
    async function handleFormSubmit(e) {
        e.preventDefault()
        if (!imageFileWhileCreatingPost && !newPost) return
        handlePostSubmit()
        navigate('/')
    }
    return (
        <div className="container-posts">
            <PostAudioTable />
            <PageHeader title="Posts" description="Share your thoughts and updates" />
            <form className="new-post-form" onSubmit={handleFormSubmit}>
                <div className="">
                    {imageFileWhileCreatingPost && (
                        <div className="image-preview">
                            <img
                                src={URL.createObjectURL(imageFileWhileCreatingPost)}
                                alt="Preview" />
                        </div>
                    )}
                    <textarea
                        className="form-control"
                        placeholder="Write something"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    ></textarea>
                    <div className="buttons">
                        <button
                            className="btn btn-outline-info"
                            onClick={handleButtonClick} >
                            <i className="bi bi-box-arrow-in-up"></i>
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={updateSelectedImage}
                            style={{ display: "none" }}
                        />
                        <button
                            type="submit"
                            className="btn btn-outline-primary like-button">
                            <i className="bi bi-send-plus"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Posts

