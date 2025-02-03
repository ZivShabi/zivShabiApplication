
import '../../css/postResponse.css'
import { useEffect } from 'react'
import { usePostResponse } from '../../contexts/PostResponseContext'
import { useNavigate } from 'react-router-dom'
function PostResponse({ postId }) {

    const { responsesByPostId, loading, newResponseByPostId, setNewResponse, fetchResponsesData, handleResponseSubmit, handleDeleteResponse, handleToggleLike } = usePostResponse()

    const navigate = useNavigate()



    const responses = responsesByPostId[postId] || [] //
    const newResponse = newResponseByPostId[postId] || ''



    useEffect(() => {
        fetchResponsesData(postId)
    }, [postId])



    if (loading) {
        return <div className="spinner-border text-primary" role="status"></div>
    }

    return (<div className="post-responses">
        <form className="new-response-form"
            onSubmit={(e) => {
                e.preventDefault(); handleResponseSubmit(postId)
            }} >
            <div className="">
                <textarea className="form-control"
                    placeholder="Write a response..."
                    value={newResponse}
                    onChange={(e) => setNewResponse(postId, e.target.value)}
                ></textarea>
                <button className="btn btn-outline-primary like-button" type="submit">
                    <i className="bi bi-send-plus"></i>
                </button>
            </div>
        </form>

        {responses.length === 0 ? null
            : responses.map((response) => (
                <div key={response._id || Math.random()} >
                    <div className="card-body">
                        <div className="responseData"> <h2 className="card-text">
                            {response.content && response.content
                                ? (typeof response.content === 'object' ? JSON.stringify(response.content)
                                    : response.content) : 'No content provided by the user'
                            }  </h2>
                            <p className="card-meta">
                                {response.createdBy?.first || ''} -{' '}
                                {response.createdAt ? new Date(response.createdAt).toLocaleString() : 'Just now'}
                            </p></div>
                        <div className="buttons">

                            <button
                                className={`btn ${response.likes?.length > 0 ? 'btn-success' : 'btn-outline-primary'} like-button`}
                                onClick={() => handleToggleLike(postId, response._id)}

                            >
                                <i className="bi bi-hand-thumbs-up"></i> ({response.likes?.length || 0})
                            </button>

                            <button className="btn btn-outline-danger like-button-danger"
                                onClick={() => handleDeleteResponse(postId, response._id)}  >
                                <i className="bi bi-trash3"></i>
                            </button>
                            <button className="btn btn-outline-success message-button"
                                onClick={() => navigate('/messages',
                                    { state: { recipientId: response.createdBy._id } })} >
                                <i className="bi bi-chat-dots"></i>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
    </div >)
}

export default PostResponse



