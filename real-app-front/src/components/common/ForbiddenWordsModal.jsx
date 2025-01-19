
function ForbiddenWordsModal({ show, onClose, forbiddenWords }) {
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className="bi bi-exclamation-circle text-warning"></i>
                            Language Policy
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>
                            Please avoid using inappropriate words. The following words are not allowed
                            <strong>{forbiddenWords.join(', ')}</strong>.
                        </p>
                        <p>We value respectful communication. Let’s keep the discussion positive!</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={onClose}>
                            Got it
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForbiddenWordsModal