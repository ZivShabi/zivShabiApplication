import '../../css/posts.css'
import { useRef } from 'react'
import PageHeader from '../common/PageHeader'
import { usePosts } from '../../contexts/PostsContext'
import PostAudioTable from '../common/PostAudioTable'
import { useNavigate } from 'react-router-dom';

function Posts() {
    const { loading, newPost, setNewPost,
        handlePostSubmit, setImageFileWhileCreatingPost } = usePosts()

    const navigate = useNavigate();


    const fileInputRef = useRef(null)
    const handleButtonClick = () => {
        fileInputRef.current.click()
    }

    const handleImageChange = (e) => {
        setImageFileWhileCreatingPost(e.target.files[0])
    }

    if (loading) {
        return <div className="spinner-border text-primary" role="status"></div>
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await handlePostSubmit();
        navigate('/');
    };

    return (
        <div className="container-posts">
            <PostAudioTable />
            <PageHeader title="Posts" description="Share your thoughts and updates" />
            <form className="new-post-form" onSubmit={handleFormSubmit}>


                <div className="">
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
                            className="form-control-file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
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

