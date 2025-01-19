import { useAudio } from '../../contexts/AudioContext'
function PostAudioTable() {
    const {
        showAudioTable,
        selectedAudioUrls,
        setSelectedAudioUrl
    } = useAudio()

    const handleAudioSelection = (audioUrl) => {
        setSelectedAudioUrl(audioUrl)
        const audio = new Audio(audioUrl)
        audio.play()
    }

    // http://localhost:5005/uploads/7384hgibrtbuo.ogg
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
                        {selectedAudioUrls.map((audioUrl, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{audioUrl}</td>
                                <td>
                                    <button onClick={() => handleAudioSelection(audioUrl)}
                                        className="btn btn-link" >
                                        <i className="bi bi-play-circle"></i>
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default PostAudioTable