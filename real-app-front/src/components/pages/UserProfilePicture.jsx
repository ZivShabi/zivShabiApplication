
import { useState } from 'react'
import { updateUserImage } from '../../services/users/users'
import PageHeader from '../common/PageHeader'
import '../../css/userProfilePicture.css'
import ImageUploader from '../common/ImageUploader'
import { useImageContext } from '../../contexts/ImageContext'

export function UserProfilePicture({ id, imageUrl }) {
    const [errorMessage, setErrorMessage] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    // const DEFAULT_IMAGE_URL = 'default-image-url.jpg'
    const { setImage } = useImageContext(imageUrl)

    async function updateProfileImage(imageBase64) {
        if (!id) {
            setErrorMessage('User ID is missing. Cannot update image.'); return
        }
        if (!imageBase64) {
            setErrorMessage('Invalid image. Please try again.'); return
        }
        setErrorMessage('')
        setIsUploading(true)
        try {
            const updatedUser = await updateUserImage(id, imageBase64)
            const newImage = updatedUser.image || imageBase64;
            setImage(newImage)
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Failed to update image.')
        } finally { setIsUploading(false) }
    }

    return (
        <div className="user-profile-picture">
            <PageHeader title="Update Profile Picture" />
            <div className="container "><h1 className=" like-button ">
                <i className='bi-upload '></i> </h1>
                <button className='btn btn-outline-primary like-button'
                    onClick={() => alert('Implement additional save logic if needed')}
                    disabled={isUploading}>
                    {isUploading ? 'Uploading...' : ''}
                    <i className="bi bi-send-plus"></i>
                </button></div>
            <ImageUploader
                onImageUpload={updateProfileImage}
                setErrorMessage={setErrorMessage}
                isUploading={isUploading}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    )
}
export default UserProfilePicture
