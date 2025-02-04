
// import { useState } from 'react'
// import { updateUserImage } from '../../services/users/users'
// import PageHeader from '../common/PageHeader'
// import '../../css/userProfilePicture.css'
// import { useImageContext } from '../../contexts/ImageContext'


// function ImageUploader({ onImageUpload, setErrorMessage, isUploading }) {
//     function handleFileChange(event) {
//         const file = event.target.files[0];
//         if (!file) {
//             setErrorMessage('No file selected.');
//             return;
//         }
//         onImageUpload(file);
//     }

//     return (
//         <div>
//             <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 disabled={isUploading}
//             />
//         </div>
//     );
// }


// export function UserProfilePicture({ id, imageUrl }) {
//     const [errorMessage, setErrorMessage] = useState('')
//     const [isUploading, setIsUploading] = useState(false)
//     const { setImage } = useImageContext(imageUrl)

//     async function updateProfileImage(file) {
//         if (!id) {
//             setErrorMessage('User ID is missing. Cannot update image.'); return
//         }

//         if (!file) {
//             setErrorMessage('Invalid image. Please try again.');
//             return;
//         }

//         setErrorMessage('')
//         setIsUploading(true)
//         try {
//             const updatedUser = await updateUserImage(id, file)
//             const newImage = updatedUser.image || URL.createObjectURL(file)
//             setImage(newImage)
//         } catch (err) {
//             setErrorMessage(err.response?.data?.message || 'Failed to update image.')
//         } finally { setIsUploading(false) }
//     }

//     return (
//         <div className="user-profile-picture">
//             <PageHeader title="Update Profile Picture" />
//             <div className="container "><h1 className=" like-button ">
//                 <i className='bi-upload '></i> </h1>
//                 <button className='btn btn-outline-primary like-button'
//                     onClick={() => alert('Implement additional save logic if needed')}
//                     disabled={isUploading}>
//                     {isUploading ? 'Uploading...' : ''}
//                     <i className="bi bi-send-plus"></i>
//                 </button></div>
//             <ImageUploader
//                 onImageUpload={updateProfileImage}
//                 setErrorMessage={setErrorMessage}
//                 isUploading={isUploading}
//             />
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//         </div>
//     )
// }
// export default UserProfilePicture


import { useState } from 'react'
import { updateUserImage } from '../../services/users/users'
import PageHeader from '../common/PageHeader'
import '../../css/userProfilePicture.css'
import { useImageContext } from '../../contexts/ImageContext'


function ImageUploader({ onImageUpload, setErrorMessage, isUploading }) {
    function handleFileChange(event) {
        const file = event.target.files[0]
        if (!file) {
            setErrorMessage('No file selected.')
            return
        }
        onImageUpload(file)
    }

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
            />
        </div>
    )
}

export function UserProfilePicture({ id, imageUrl }) {
    const [errorMessage, setErrorMessage] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const { setImage } = useImageContext() // שימוש בקונטקסט ללא פרמטרים
    console.log('User ID in UserProfilePicture:', id)

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
        <div className="user-profile-picture">
            <PageHeader title="Update Profile Picture" />
            <div className="container">
                <h1 className="like-button">
                    <i className='bi-upload'></i>
                </h1>
                <button className='btn btn-outline-primary like-button'
                    onClick={() => alert('Implement additional save logic if needed')}
                    disabled={isUploading}>
                    {isUploading ? 'Uploading...' : ''}
                    <i className="bi bi-send-plus"></i>
                </button>
            </div>
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
