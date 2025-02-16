import { createContext, useContext, useState, useRef } from 'react'
import { addAudioToPost, updateAudioStatus } from '../services/Posts/postsServices'
const AudioContext = createContext()
import { usePosts } from '../contexts/PostsContext'
import config from "../config.json"
import { API_BASE_URL } from '../services/httpService'
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
                const blob = new Blob(audioChunks.current, { type: 'audio/mp3' || 'audio/wav' })
                audioChunks.current = []
                const formData = new FormData()


                formData.append('audio', blob, 'recording.mp3' || 'recording.wav')
                formData.append('postId', selectedPostId.current)

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


    async function handleMarkAsListened(postId) {
        try {
            const res = await updateAudioStatus(postId)
            if (res.audioUrls && Array.isArray(res.audioUrls)) {
                // setSelectedAudioUrls(res.audioUrls.map(url => `${config.URI}${url}`))
                setSelectedAudioUrls(res.audioUrls.map(url => `${API_BASE_URL}${url.replace('/uploads', '')}`))

                setShowAudioTable(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    function handleAudioSelection(audioFile) {
        try {
            console.log('Selected audio file:', audioFile);
            const audio = new Audio(audioFile)
            console.log('Audio URL:', audio);
            audio.addEventListener('canplaythrough', () => {
                console.log('Audio can play through');
                audio.play().then(() => {
                    console.log('Playback started');
                    console.log('Selected audio file:', audioFile);
                }).catch((err) => console.error('Playback error:', err));
            })
        } catch (err) { console.log(err) }
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
            setShowAudioTable,
            handleAudioSelection,
        }}>
            {children}
        </AudioContext.Provider>
    )
}
export const useAudio = () => useContext(AudioContext)
