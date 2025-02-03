import '../../css/posts.css'
import { useState, useRef } from 'react'
// import VideoModal from '../common/VideoModal'
import PageHeader from '../common/PageHeader'
import { usePosts } from '../../contexts/PostsContext'
import { useAuth } from '../../contexts/User.Identification'
import { useAudio } from '../../contexts/AudioContext'
// import { useVideo } from '../../contexts/VideoContext'
import PostAudioTable from '../common/PostAudioTable'
import { useNavigate } from 'react-router-dom';

function Posts() {
    const { posts, loading, newPost, setNewPost, handleImageSubmit,
        handlePostSubmit, handleLike, handleDeletepost } = usePosts()
    const { user } = useAuth()
    const { isRecording, handleRecordAudio, handleMarkAsListened } = useAudio()
    const navigate = useNavigate();

    // const { handleStartVideoRecording, handleStopRecording, isVideoModalOpen, setIsVideoModalOpen } = useVideo()
    const [imageFile, setImageFile] = useState(null)
    // function handleAddVideoClick(postId) {
    //     setIsVideoModalOpen(postId)
    // }
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0])
    }
    const fileInputRef = useRef(null)
    const handleButtonClick = () => {
        fileInputRef.current.click()
    }
    if (loading) {
        return <div className="spinner-border text-primary" role="status"></div>
    }

    return (
        <div className="container-posts">
            <PostAudioTable />
            <PageHeader title="Posts" description="Share your thoughts and updates" />
            <form className="new-post-form" onSubmit={handlePostSubmit => {
                navigate('/')
            }}>
                <div className="">
                    <textarea
                        className="form-control"
                        placeholder="Write something"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    ></textarea>
                    <div className="buttons">
                        <button type="submit" className="btn btn-outline-primary like-button">
                            <i className="bi bi-send-plus"></i>
                        </button>
                        <button
                            className={`btn ${isRecording ? 'btn-danger' : 'btn-outline-primary'}`}
                            onClick={() => handleRecordAudio(posts == user)}>
                            <i className="bi bi-mic"></i> {isRecording ? '' : ''}
                        </button>
                        <button className="btn btn-outline-info"
                            onClick={handleButtonClick}>
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
                    </div>

                </div>
            </form>

        </div>
    )
}

export default Posts

