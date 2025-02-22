
import PostAudioTable from '../PostAudioTable'
import PostButtons from '../PostButtons'
import PostResponse from '../../pages/PostResponse'
import ForbiddenWordsModal from '../../common/ForbiddenWordsModal'
import { usePostResponse } from '../../../contexts/PostResponseContext'

function PostsView({ posts, handleImageSubmit, handleLike, handleDeletepost, handleRecordAudio, isRecording, handleMarkAsListened, updateSelectedImage, showForbidden, forbiddenWord, closeForbidden, imageFileWhileCreatingPost }) {
    const { showForbiddenModal, forbiddenWords, closeForbiddenModal } = usePostResponse()

    return (
        <div className="container-posts">
            <div className="posts">
                <ForbiddenWordsModal
                    show={showForbidden}
                    onClose={closeForbidden}
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
                        <div key={post._id} post={post}>

                            <PostButtons
                                imageFileWhileCreatingPost={imageFileWhileCreatingPost}
                                post={post}
                                handleLike={handleLike}
                                handleDeletepost={handleDeletepost}
                                handleRecordAudio={handleRecordAudio}
                                isRecording={isRecording}
                                handleMarkAsListened={handleMarkAsListened}
                                handleImageSubmit={handleImageSubmit}
                                updateSelectedImage={updateSelectedImage}
                            />
                            <PostResponse postId={post._id} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default PostsView