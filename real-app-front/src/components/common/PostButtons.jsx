import { useNavigate } from 'react-router-dom'
import { useRef } from "react";
import '../../css/homePage.css'
import { API_BASE_URL } from '../../services/httpService'

function PostButtons({
    post,
    handleLike,
    handleDeletepost,
    handleRecordAudio,
    isRecording,
    handleMarkAsListened,
    handleImageSubmit,
    imageFileWhileCreatingPost,
    updateSelectedImage,
}) {
    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    function handleImageUpload() {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }
    return (<div className="container_buttons">
        <div className="card-body ">
            <div className="image-preview">  {post.imageUrl ? (
                <img
                    src={`${API_BASE_URL}${post.imageUrl.replace('/uploads', '')}`}
                    alt="Post" />
            ) : (<p>לא נבחרה תמונה</p>)}
            </div>
            <div className="">
                <h5 className="card-text">{post.content}</h5>
                <h5 className="card-text">
                    {post.createdBy?.name?.first} {post.createdBy?.name?.last}
                </h5>
                <h5 className="card-text">{new Date(post.createdAt).toLocaleString()}</h5>
            </div>
            <div className="buttons mb-3">
                <button className="btn btn-outline-info"
                    onClick={handleImageUpload}>
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
                    className={`btn ${isRecording ? 'btn-danger' : 'btn-outline-primary'}`}
                    onClick={() => handleRecordAudio(post._id)}  >
                    <i className={`bi ${isRecording ? 'bi-mic-fill' : 'bi-mic'}`}></i>
                </button>
                <button
                    className="btn btn-outline-primary like-button"
                    onClick={() => handleLike(post._id)} >
                    <i className="bi bi-hand-thumbs-up"></i> ({post.likes ? post.likes.length : 0})
                    {/* ({post.likes.length}) */}
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
                <button type="button"
                    className="btn btn-outline-primary like-button"
                    onClick={() => handleImageSubmit(post._id, imageFileWhileCreatingPost)}>
                    <i className="bi bi-camera"></i>
                </button>
            </div>
        </div>
    </div >
    )
}
export default PostButtons