

import { useState, useRef } from 'react'
import { updateUserImage } from '../../services/users/users'
import PageHeader from '../common/PageHeader'
import '../../css/userProfilePicture.css'
import { useImageContext } from '../../contexts/ImageContext'


function ImageUploader({ onImageUpload, setErrorMessage, isUploading }) {
    const fileInputRef = useRef(null)

    function handleFileChange(event) {
        const file = event.target.files[0]
        if (!file) {
            setErrorMessage('No file selected.')
            return
        }
        onImageUpload(file)
    }

    function handleButtonClick() {
        fileInputRef.current.click()
    }
    return (
        <div className=''>
            <button className="btn btn-outline-info"
                onClick={handleButtonClick}
                disabled={isUploading}>
                <i className="bi bi-box-arrow-in-up"></i>
            </button>
            <input
                type="file"
                accept="image/*"
                className="form-control-file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                disabled={isUploading}
            />
        </div>
    )
}




function UserProfilePicture({ id, imageUrl }) {
    const [errorMessage, setErrorMessage] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const { setImage } = useImageContext() // שימוש בקונטקסט ללא פרמטרים


    async function updateProfileImage(file) {
        if (!id) {
            setErrorMessage('User ID is missing. Cannot update image.')
            return
        }

        if (!file) {
            setErrorMessage('Invalid image. Please try again.')
            return
        }

        setErrorMessage('')
        setIsUploading(true)

        try {

            const updatedUser = await updateUserImage(id, file)
            const newImage = updatedUser.image || URL.createObjectURL(file)
            setImage(newImage)  // עדכון התמונה בקונטקסט
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Failed to update image.')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="containerProfile">
            <PageHeader title="Update Profile Picture" />
            <div className="user-profile-picture">

                <h1 className="like-button">
                    <i className="bi bi-person-bounding-box"></i>
                </h1>
                <ImageUploader
                    onImageUpload={updateProfileImage}
                    setErrorMessage={setErrorMessage}
                    isUploading={isUploading}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    )
}

export default UserProfilePicture
