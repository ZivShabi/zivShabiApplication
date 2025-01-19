import '../../css/posts.css'
import { useState } from 'react'
import VideoModal from '../common/VideoModal'
import { addVideoToPost, addImageToPost } from '../../services/Posts/postsServices'
import PostResponse from './PostResponse'
import PageHeader from '../common/PageHeader'
import { usePosts } from '../../contexts/PostsContext'
import { useAuth } from '../../contexts/User.Identification'
import { useAudio } from '../../contexts/AudioContext'
import PostAudioTable from '../common/PostAudioTable'
import PostButtons from '../common/PostButtons'
import ForbiddenWordsModal from '../common/ForbiddenWordsModal'
import { usePostResponse } from '../../contexts/PostResponseContext'

function Posts() {
    const { showForbiddenModal, forbiddenWords, closeForbiddenModal
    } = usePostResponse()

    const { posts, loading, newPost, setNewPost, handleImageSubmit,
        handlePostSubmit, handleLike, handleDeletepost } = usePosts()

    const { user } = useAuth()

    const { isRecording, handleRecordAudio, handleMarkAsListened } = useAudio()

    const [isVideoModalOpen, setIsVideoModalOpen] = useState(null)
    const [imageFile, setImageFile] = useState(null)

    async function handleVideoSubmit(postId, videoFile) {
        try {
            await addVideoToPost(postId, videoFile);
            alert('Video added successfully!');
            fetchPosts();
        } catch (error) {
            alert('Failed to add video. Please try again.');
        } finally {
            setIsVideoModalOpen(null);
        }
    }
    function handleAddVideoClick(postId) {
        setIsVideoModalOpen(postId)
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImageFile(file)
    }

    if (loading) {
        return <div className="spinner-border text-primary" role="status"></div>
    }
    return (
        <div className="container-posts">
            <PostAudioTable />
            <PageHeader title="Posts" description="Share your thoughts and updates" />
            <form className="new-post-form" onSubmit={handlePostSubmit}>
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
                        {/* <button onClick={handlePostSubmit}>Post</button> */}
                        {imageFile && (
                            <button type="button"
                                className="btn btn-outline-primary like-button"
                                onClick={() => handleImageSubmit(posts[0]._id, imageFile)}>
                                <i className="bi bi-camera"></i>
                            </button>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control-file"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
            </form>
            <div className="posts">
                {posts.length === 0 ? '' : (
                    posts.map((post) => (
                        <div key={post._id} className="card mb-3">
                            <PostButtons
                                key={post._id}
                                post={post}
                                handleLike={handleLike}
                                handleDeletepost={handleDeletepost}
                                handleRecordAudio={handleRecordAudio}
                                isRecording={isRecording}
                                handleMarkAsListened={handleMarkAsListened}
                                handleAddVideoClick={handleAddVideoClick}
                                handleImageSubmit={handleImageSubmit}
                                handleImageChange={handleImageChange}
                                imageFile={imageFile}
                            />
                            <PostResponse postId={post._id} />
                        </div>
                    ))
                )}
                <ForbiddenWordsModal
                    show={showForbiddenModal}
                    onClose={() => closeForbiddenModal(false)}
                    forbiddenWords={forbiddenWords}
                />
                <VideoModal
                    isOpen={isVideoModalOpen !== null}
                    onClose={() => setIsVideoModalOpen(null)}
                    onSubmit={(videoFile) => handleVideoSubmit(isVideoModalOpen, videoFile)} />

            </div>
        </div>
    )
}

export default Posts


