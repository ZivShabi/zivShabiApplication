
import PostAudioTable from '../PostAudioTable'
import PostButtons from '../PostButtons'
import PostResponse from '../../pages/PostResponse'
import ForbiddenWordsModal from '../../common/ForbiddenWordsModal'
import { usePostResponse } from '../../../contexts/PostResponseContext'
import { usePosts } from '../../../contexts/PostsContext'

function PostsView({ posts, imageFile, handleImageSubmit, handleLike, handleDeletepost, handleRecordAudio, isRecording, handleMarkAsListened, }) {
    const { showForbiddenModal, forbiddenWords, closeForbiddenModal } = usePostResponse()
    const { showForbidden, forbiddenWord, closeForbidden, imageFileWhileCreatingPost, } = usePosts()

    return (
        <div className="container-posts">
            <div className="posts">
                <ForbiddenWordsModal
                    show={showForbidden}
                    onClose={() => closeForbidden()}
                    forbiddenWords={forbiddenWord}
                />
                <ForbiddenWordsModal
                    show={showForbiddenModal}
                    onClose={closeForbiddenModal}
                    forbiddenWords={forbiddenWords}
                />
                <PostAudioTable />
                {posts.length === 0 ? '' : (
                    posts.map(post => (
                        <div key={post._id}>
                            {/* {console.log('Post Data:', post)} */}
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
                {imageFileWhileCreatingPost && (
                    <div className="image-preview">
                        <img
                            src={URL.createObjectURL(imageFileWhileCreatingPost)}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                        />
                    </div>
                )}

            </div>
        </div>
    );
}

export default PostsView