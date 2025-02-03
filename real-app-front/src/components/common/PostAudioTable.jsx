import { useAudio } from '../../contexts/AudioContext'

function PostAudioTable() {
    const { handleAudioSelection, showAudioTable, selectedAudioUrls, } = useAudio()

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
        </>
    )
}

export default PostAudioTable