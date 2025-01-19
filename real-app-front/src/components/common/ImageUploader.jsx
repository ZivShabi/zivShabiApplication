import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import '../../css/userProfilePicture.css'
import { useImageContext } from '../../contexts/ImageContext'


function ImageUploader({ onImageUpload, maxFileSizeMB = 2, allowedFileTypes = ['image/jpeg', 'image/png'] }) {
    const [errorMessage, setErrorMessage] = useState('')
    const { image, setImage } = useImageContext()
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]

        if (!file) {
            setErrorMessage('No file selected. Please try again.'); return
        }
        if (!allowedFileTypes.includes(file.type)) {
            setErrorMessage('Invalid file type. Only JPEG and PNG are allowed.'); return
        }
        if (file.size > maxFileSizeMB * 1024 * 1024) {
            setErrorMessage(`
            File size exceeds ${maxFileSizeMB}MB. Please upload a smaller file
            `); return
        }

        const reader = new FileReader();
        reader.onload = () => {
            const base64Image = reader.result;
            onImageUpload(base64Image)
            setImage(base64Image)
        };
        reader.readAsDataURL(file);
    }, [onImageUpload, setImage]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: allowedFileTypes.join(', '),
        maxFiles: 1
    })
    return (
        <div className="image-uploader">
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag and drop an image, or click to select one (JPEG/PNG only).</p>
            </div>
            {image && <p className="uploading-message">Uploading...</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    )
}
export default ImageUploader
