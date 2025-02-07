
import PostAudioTable from '../PostAudioTable'
import PostButtons from '../PostButtons'
import PostResponse from '../../pages/PostResponse'
import ForbiddenWordsModal from '../../common/ForbiddenWordsModal'
import { usePostResponse } from '../../../contexts/PostResponseContext'
function PostsView({ posts, imageFile, handleImageSubmit, handleLike, handleDeletepost, handleRecordAudio, isRecording, handleMarkAsListened }) {
    const { showForbiddenModal, forbiddenWords, closeForbiddenModal } = usePostResponse()
    return (
        <div className="container-posts">
            <div className="posts">
                <PostAudioTable />
                {posts.length === 0 ? '' : (
                    posts.map(post => (
                        <div key={post._id}>
                            {imageFile && (
                                <button type="button" className="btn btn-outline-primary like-button" onClick={() => handleImageSubmit(posts[0]._id, imageFile)}>
                                    <i className="bi bi-camera"></i>
                                </button>
                            )}
                            {post.imageUrl && (
                                <img src={post.imageUrl} alt="Post" className="img-fluid mt-3" style={{ maxHeight: '300px', objectFit: 'cover' }} />
                            )}
                            <PostButtons
                                post={post}
                                handleLike={handleLike}
                                handleDeletepost={handleDeletepost}
                                handleRecordAudio={handleRecordAudio}
                                isRecording={isRecording}
                                handleMarkAsListened={handleMarkAsListened}
                                handleImageSubmit={handleImageSubmit}
                                imageFile={imageFile}
                            />
                            <PostResponse postId={post._id} />
                        </div>
                    ))
                )}
                <ForbiddenWordsModal show={showForbiddenModal} onClose={() => closeForbiddenModal(false)} forbiddenWords={forbiddenWords} />
            </div>
        </div>
    );
}

export default PostsView