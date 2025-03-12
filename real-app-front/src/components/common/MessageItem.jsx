
function MessageItem({ message, onMarkAsRead, onDelete, onReply, onMessageById, loading, onAudioUrls, onRecordAudio, isRecording }) {
    return (
        <li key={message._id}>

            <h5>{message.content}</h5>
            <div className="dataMessage">
                <h5> {message.sender?.name?.first && message.sender?.name?.last ?
                    `${message.sender.name.first} ${message.sender.name.last}`
                    : ''}
                </h5>
                <p> {message.recipient?.name?.first && message.recipient?.name?.last
                    ? `${message.recipient.name.first} ${message.recipient.name.last}`
                    : ''}
                    {message.read ?
                        <span> <i className="bi bi-check-all text-primary"></i> </span> :
                        <span> <i className="bi bi-check-all "></i></span>
                    } {' '}
                    <span> {new Date(message.date).toLocaleString()} </span>
                </p>
            </div>
            <div className="buttons">
                {!message.read && (
                    <div className="MarkAsRead">
                        <button className='btn btn-outline-primary like-button'
                            onClick={() => onMarkAsRead(message._id)}>
                            <i className="bi bi-eye"></i>
                        </button>
                    </div>
                )}
                <div className="messageAudioUrls">
                    <button
                        className={`btn ${isRecording ? 'btn-danger' : 'btn-outline-primary'}`}
                        onClick={() => onRecordAudio(message._id)}  >
                        <i className={`bi ${isRecording ? 'bi-mic-fill' : 'bi-mic'}`}></i>
                    </button>
                </div>
                <div className="messageAudioUrls">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => onAudioUrls(message._id, message.audioUrls)}
                        disabled={!message.audioUrls} >
                        <i className="bi bi-headphones"></i>
                    </button>
                </div>
                <div className="DeleteMessage">
                    <button className='btn btn-outline-danger like-button-danger'
                        onClick={() => onDelete(message._id)}>
                        <i className="bi bi-trash3"></i>
                    </button>
                </div>
                <div className="buttons">
                    <button className="btn btn-outline-info"
                        onClick={() => onReply(message)}>
                        <i className="bi bi-reply"></i>
                    </button>
                </div>
                <div className="buttons">
                    <button
                        className="btn btn-outline-success message-button"
                        onClick={() => onMessageById(message.sender?._id, message._id)}
                        disabled={loading || !message.sender}>
                        {loading ? <div className="spinner-border text-info" role="status"></div>
                            : <i className="bi bi-chat-dots"></i>}
                    </button>


                </div>
            </div>
        </li>
    );
}
export default MessageItem