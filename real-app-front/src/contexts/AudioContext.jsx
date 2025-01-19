import { createContext, useContext, useState, useRef } from 'react'
import { addAudioToPost, updateAudioStatus } from '../services/Posts/postsServices'
const AudioContext = createContext()
import { usePosts } from '../contexts/PostsContext'
export function AudioProvider({ children }) {

    const { setPosts } = usePosts()
    const [isRecording, setIsRecording] = useState(false)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const audioChunks = useRef([])
    const selectedPostId = useRef(null)

    const [showAudioTable, setShowAudioTable] = useState(false)
    const [selectedAudioUrls, setSelectedAudioUrls] = useState([])
    const [selectedAudioUrl, setSelectedAudioUrl] = useState(null)

    async function handleStartRecording() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Your browser does not support audio recording")
            return
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const recorder = new MediaRecorder(stream)

            recorder.ondataavailable = (event) => {
                audioChunks.current.push(event.data)
            }

            recorder.onstop = async () => {
                const blob = new Blob(audioChunks.current, { type: 'audio/ogg' })
                audioChunks.current = []
                const formData = new FormData()


                formData.append('audio', blob, 'recording.ogg');
                formData.append('postId', selectedPostId.current);

                try {
                    const res = await addAudioToPost(selectedPostId.current, formData)
                    setPosts(previous => {
                        return previous.map(post => {
                            if (post._id != res.post._id) { return post; }
                            return res.post;
                        })
                    })
                    alert(res.message)
                } catch (error) {
                    console.error('Error uploading audio', error.response ? error.response.data : error)
                    alert('Failed to upload audio')
                }
            }

            recorder.start()
            setMediaRecorder(recorder)
            setIsRecording(true)
        } catch (error) {
            console.error(error)
            alert('Unable to start recording ' + error.message)
        }
    }

    function handleStopRecording() {
        if (mediaRecorder) {
            mediaRecorder.stop()
            setIsRecording(false)
        }
    }

    function handleRecordAudio(postId) {
        selectedPostId.current = postId
        if (isRecording) {
            handleStopRecording()
        } else {
            handleStartRecording()
        }
    }

    async function handleMarkAsListened(postId, audioUrls) {
        try {
            const res = await updateAudioStatus(postId);
            alert(res.message);

            if (res.audioUrls && res.audioUrls.length > 1) {
                setSelectedAudioUrls(res.audioUrls)
                setShowAudioTable(true)
            } else if (audioUrls && audioUrls.startsWith('http')) {
                const audioUrl = res.audioUrls[0];
                const audio = new Audio(audioUrl)
                audio.play()
            } else {
                alert("Invalid or missing audio URL")
            }
        } catch (error) {
            console.error(error);
            alert('Failed to update audio status')
        }
    }

    return (
        <AudioContext.Provider value={{
            isRecording,
            handleRecordAudio,
            handleStopRecording,
            handleMarkAsListened,
            showAudioTable,
            selectedAudioUrls,
            setSelectedAudioUrl,
            selectedAudioUrl,
            setShowAudioTable
        }}>
            {children}
        </AudioContext.Provider>
    )
}
export const useAudio = () => useContext(AudioContext)
