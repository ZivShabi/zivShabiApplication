import { createContext, useContext, useState, useRef } from 'react'
import { addAudioToMessage, updateAudioStatus } from '../services/messages/messagesService'
const AudioMessagesContext = createContext()
import { useMessages } from '../contexts/MessagesContext'
import { API_BASE_URL } from '../services/httpService'
export function AudioMessagesProvider({ children }) {

    const { setMessages } = useMessages()
    const [isRecordingMessages, setIsRecording] = useState(false)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const audioChunks = useRef([])
    const selectedMessagesId = useRef(null)
    const [showAudioTableMessages, setShowAudioTable] = useState(false)
    const [selectedAudioUrlsMessages, setSelectedAudioUrls] = useState([])
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
                formData.append('messageId', selectedMessagesId.current)

                try {
                    const res = await addAudioToMessage(selectedMessagesId.current, formData)
                    setMessages(previous => {
                        return previous.map(messages => {
                            if (messages._id != res.messages._id) { return messages; }
                            return res.messages;
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

    function handleRecordAudioMessages(messageId) {
        selectedMessagesId.current = messageId
        if (isRecordingMessages) {
            handleStopRecording()
        } else {
            handleStartRecording()
        }
    }


    async function handleMarkAsListenedMessages(messageId) {
        try {
            const res = await updateAudioStatus(messageId)
            if (res.audioUrls && Array.isArray(res.audioUrls)) {
                setSelectedAudioUrls(res.audioUrls.map(url => `
                ${API_BASE_URL}${url.replace('/uploads', '')}`))
                setShowAudioTable(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    function handleAudioSelectionMessages(audioFile) {
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
        <AudioMessagesContext.Provider value={{
            isRecordingMessages,
            handleRecordAudioMessages,
            handleStopRecording,
            handleMarkAsListenedMessages,
            showAudioTableMessages,
            selectedAudioUrlsMessages,
            setSelectedAudioUrl,
            selectedAudioUrl,
            setShowAudioTable,
            handleAudioSelectionMessages,
        }}>
            {children}
        </AudioMessagesContext.Provider>
    )
}
export const useAudioMessagesContext = () => useContext(AudioMessagesContext)
