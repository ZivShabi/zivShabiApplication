import React, { useState } from 'react';
function VideoModal({ isOpen, onClose, onSubmit, onOptionSelect }) {
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [videoOption, setVideoOption] = useState("");  // הוספנו את ה-state הזה

    if (!isOpen) return null;

    const handleFileChange = (event) => {
        setVideoFile(event.target.files[0]);
    };

    const handleUploadSubmit = () => {
        if (videoFile) {
            // פנה לפונקציה כדי להעלות את הקובץ
            const videoData = new FormData();
            videoData.append('file', videoFile);
            onSubmit(videoData);  // יש לשלוח את הקובץ או ה-URL לפונקציה המתאימה
        }
    };

    const handleVideoOptionSelect = (option) => {
        setVideoOption(option);  // שמירה של הבחירה של המשתמש
        setVideoUrl("");  // מנקים את ה-URL במקרה שבחרו אופציה אחרת
        onOptionSelect(option);
    };

    return (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Video</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>Choose how you want to add a video</p>
                        <button
                            onClick={() => onSubmit('url')}
                            className="btn btn-outline-primary w-100">
                            Upload Video URL
                        </button>
                        <button
                            onClick={() => onSubmit('file')}
                            className="btn btn-outline-secondary w-100">
                            Upload Video from File
                        </button>
                        <button
                            onClick={() => onSubmit(videoUrl)}
                            className="btn btn-outline-success w-100">
                            Record Video Now
                        </button>

                        {videoOption === 'url' && (
                            <div>
                                <input
                                    type="text"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    className="form-control"
                                    placeholder="Paste video URL"
                                />
                            </div>
                        )}
                        {videoOption === 'file' && !videoFile && (
                            <div>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                    className="form-control"
                                />
                            </div>
                        )}
                        {videoFile && (
                            <div>
                                <p>Selected File: {videoFile.name}</p>
                                <button onClick={handleUploadSubmit} className="btn btn-primary w-100">
                                    Upload Video
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoModal;
