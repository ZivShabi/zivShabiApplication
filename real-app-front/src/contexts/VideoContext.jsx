import React, { createContext, useContext, useRef, useState } from 'react';
import { addVideoToPost } from '../services/Posts/postsServices';

const VideoContext = createContext();

export function VideoProvider({ children }) {
    const [isRecording, setIsRecording] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const videoRef = useRef(null);
    const selectedPostId = useRef(null);

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
                formData.append('postId', selectedPostId.current);

                try {
                    const res = await addVideoToPost(selectedPostId.current, formData);
                    alert(res.message);
                } catch (error) {
                    console.error('Error uploading video', error);
                    alert('Failed to upload video');
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (error) {
            console.error(error);
            alert(`Unable to start recording: ${error.message}`);
        }
    };

    const handleStopRecording = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject;
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
            setIsRecording(false);
        }
    };

    return (
        <VideoContext.Provider
            value={{
                isRecording,
                handleStartVideoRecording,
                handleStopRecording,
                setIsVideoModalOpen,
                isVideoModalOpen,
            }}
        >
            {children}
            <video ref={videoRef} style={{ display: isRecording ? 'block' : 'none' }} />
        </VideoContext.Provider>
    );
}

export const useVideo = () => useContext(VideoContext);
