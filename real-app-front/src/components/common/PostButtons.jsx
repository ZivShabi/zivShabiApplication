import { useNavigate } from 'react-router-dom'
import { useRef } from "react";

function PostButtons({
    post,
    handleLike,
    handleDeletepost,
    handleRecordAudio,
    isRecording,
    handleMarkAsListened,
    // handleAddVideoClick,
    handleImageSubmit,
    handleImageChange,
    imageFile
}) {
    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const handleButtonClick = () => {
        fileInputRef.current.click()
    }
    return (
        <div className=" ">
            <div className="card-body ">
                <h5 className="card-title">{post.content}</h5>
                <h5 className="card-subtitle text-muted">
                    {post.createdBy?.name?.first} {post.createdBy?.name?.last}
                </h5>
                <h5 className="card-text">{new Date(post.createdAt).toLocaleString()}</h5>
                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt="Uploaded"
                        style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                    />
                )}

                <div className="buttons mb-3">
                    <button className="btn btn-outline-info" onClick={handleButtonClick}>
                        <i className="bi bi-box-arrow-in-up"></i>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                    <button
                        className={`btn ${isRecording ? 'btn-danger' : 'btn-outline-primary'}`}
                        onClick={() => handleRecordAudio(post._id)}  >
                        <i className="bi bi-mic"></i> {isRecording}
                    </button>
                    <button
                        className="btn btn-outline-primary like-button"
                        onClick={() => handleLike(post._id)} >
                        <i className="bi bi-hand-thumbs-up"></i> ({post.likes.length})
                    </button>
                </div>

                <div className="buttons mb-3">
                    <button
                        className="btn btn-outline-danger like-button-danger"
                        onClick={() => handleDeletepost(post._id)} >
                        <i className="bi bi-trash3"></i>
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleMarkAsListened(post._id, post.audioUrls)}
                        disabled={!post.audioUrls} >
                        <i className="bi bi-headphones"></i>
                    </button>
                    <button
                        className="btn btn-outline-success message-button"
                        onClick={() =>
                            navigate('/messages', { state: { recipientId: post.createdBy._id } })
                        }  >
                        <i className="bi bi-chat-dots"></i>
                    </button>
                    {/* <button
                        className="btn btn-outline-info"
                        onClick={() => handleAddVideoClick(post._id)}
                    >
                        <i className="bi bi-camera-video"></i>
                    </button> */}
                    <button type="button"
                        className="btn btn-outline-primary like-button"
                        onClick={() => handleImageSubmit(post._id, imageFile)}>
                        <i className="bi bi-camera"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default PostButtons