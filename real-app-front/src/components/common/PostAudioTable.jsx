import { useAudio } from '../../contexts/AudioContext'
import { useAudioMessagesContext } from '../../contexts/MessagesAudioContext'

function PostAudioTable() {
    const { handleAudioSelection, showAudioTable, selectedAudioUrls, } = useAudio()
    const { handleAudioSelectionMessages, showAudioTableMessages, selectedAudioUrlsMessages } = useAudioMessagesContext()
    return (
        <>
            {showAudioTable && selectedAudioUrls.length > 1 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Audio</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedAudioUrls.map((audioFile, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{audioFile.audioFile || 'audio'}</td>
                                <td>
                                    <button onClick={() => handleAudioSelection(audioFile)}
                                        className="btn btn-link">
                                        <i className="bi bi-play-circle"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}

            {showAudioTableMessages && selectedAudioUrlsMessages.length > 1 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Audio</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedAudioUrlsMessages.map((audioFile, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{audioFile.audioFile || 'audio'}</td>
                                <td>
                                    <button onClick={() => handleAudioSelectionMessages(audioFile)}
                                        className="btn btn-link">
                                        <i className="bi bi-play-circle"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
        </>
    )
}

export default PostAudioTable