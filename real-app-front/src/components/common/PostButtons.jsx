import { useNavigate } from 'react-router-dom'
function PostButtons({
    post,
    handleLike,
    handleDeletepost,
    handleRecordAudio,
    isRecording,
    handleMarkAsListened,
    handleAddVideoClick,
    handleImageSubmit,
    handleImageChange,
    imageFile
}) {
    const navigate = useNavigate()
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{post.content}</h5>
                <h5 className="card-subtitle text-muted">
                    {post.createdBy?.name?.first} {post.createdBy?.name?.last}
                </h5>
                <h5 className="card-text">{new Date(post.createdAt).toLocaleString()}</h5>
                <div className="buttons">
                    <button
                        className="btn btn-outline-primary like-button"
                        onClick={() => handleLike(post._id)}
                    >
                        <i className="bi bi-hand-thumbs-up"></i> ({post.likes.length})
                    </button>
                    <button
                        className="btn btn-outline-danger like-button-danger"
                        onClick={() => handleDeletepost(post._id)}
                    >
                        <i className="bi bi-trash3"></i>
                    </button>
                    <button
                        className={`btn ${isRecording ? 'btn-danger' : 'btn-outline-primary'}`}
                        onClick={() => handleRecordAudio(post._id)}
                    >
                        <i className="bi bi-mic"></i> {isRecording ? 'Stop' : 'Record'}
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleMarkAsListened(post._id, post.audioUrls)}
                        disabled={!post.audioUrls}
                    >
                        <i className="bi bi-headphones"></i>
                    </button>
                    <button
                        className="btn btn-outline-success message-button"
                        onClick={() =>
                            navigate('/messages', { state: { recipientId: post.createdBy._id } })
                        }
                    >
                        <i className="bi bi-chat-dots"></i>
                    </button>
                    <button
                        className="btn btn-outline-info"
                        onClick={() => handleAddVideoClick(post._id)}
                    >
                        <i className="bi bi-camera-video"></i>
                    </button>
                    <button type="button"
                        className="btn btn-outline-primary like-button"
                        onClick={() => handleImageSubmit(post._id, imageFile)}>
                        <i className="bi bi-camera"></i>
                    </button>
                </div>
                <input type="file" onChange={handleImageChange} />

            </div>
        </div>
    )
}
export default PostButtons