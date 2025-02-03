import React, { useRef, useState } from 'react';

const VIDEO_OPTIONS = {
    URL: 'url',
    FILE: 'file',
    RECORD: 'record',
};

function VideoModal({ isOpen, onClose, onSubmit }) {
    const [videoOption, setVideoOption] = useState(VIDEO_OPTIONS.URL);
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const videoRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e) => setVideoFile(e.target.files[0]);

    const handleStartVideoRecording = async () => {
        if (!navigator.mediaDevices?.getUserMedia) {
            alert('Your browser does not support video recording.');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const chunks = [];

            mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                const formData = new FormData();
                formData.append('video', blob, 'recording.webm');
                onSubmit(formData);

                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (error) {
            console.error(error);
            alert('Unable to start recording.');
        }
    };

    const handleStopRecording = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsRecording(false);
        }
    };

    const handleUpload = () => {
        if (videoOption === VIDEO_OPTIONS.URL && videoUrl) {
            onSubmit(videoUrl);
        } else if (videoOption === VIDEO_OPTIONS.FILE && videoFile) {
            const formData = new FormData();
            formData.append('file', videoFile);
            onSubmit(formData);
        } else if (videoOption === VIDEO_OPTIONS.RECORD && !isRecording) {
            handleStartVideoRecording();
        }
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
                        <p>Select a video input method:</p>
                        <div className="btn-group w-100">
                            {Object.entries(VIDEO_OPTIONS).map(([key, value]) => (
                                <button
                                    key={key}
                                    className={`btn btn-outline-primary ${videoOption === value ? 'active' : ''}`}
                                    onClick={() => setVideoOption(value)}
                                >
                                    {value === VIDEO_OPTIONS.URL && 'URL'}
                                    {value === VIDEO_OPTIONS.FILE && 'File'}
                                    {value === VIDEO_OPTIONS.RECORD && 'Record'}
                                </button>
                            ))}
                        </div>
                        <div className="mt-3">
                            {videoOption === VIDEO_OPTIONS.URL && (
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter video URL"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                />
                            )}
                            {videoOption === VIDEO_OPTIONS.FILE && (
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                />
                            )}
                            {videoOption === VIDEO_OPTIONS.RECORD && (
                                <div>
                                    <video
                                        ref={videoRef}
                                        style={{ width: '100%', maxHeight: '200px', backgroundColor: 'black' }}
                                        controls
                                    />
                                    {!isRecording ? (
                                        <button className="btn btn-success mt-3" onClick={handleStartVideoRecording}>
                                            Start Recording
                                        </button>
                                    ) : (
                                        <button className="btn btn-danger mt-3" onClick={handleStopRecording}>
                                            Stop Recording
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={handleUpload} disabled={!videoOption}>
                            Upload
                        </button>
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoModal;
