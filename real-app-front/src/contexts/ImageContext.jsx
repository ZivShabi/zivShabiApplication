
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const ImageContext = createContext()

export function ImageProvider({ children }) {
    const [image, setImage] = useState(
        () => {
            return localStorage.getItem('profileImage') || null
        }
    )
    const [errorMessage, setErrorMessage] = useState('')
    const updateImage = useCallback((newImage) => {
        if (!newImage) {
            setErrorMessage('Invalid image. Please try again')
            return
        }
        //     setErrorMessage('')
        //     setImage(newImage)
        //     localStorage.setItem('profileImage', newImage)
        // }, [])

        setErrorMessage('');
        if (newImage instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setImage(base64Image);
                localStorage.setItem('profileImage', base64Image);
            };
            reader.readAsDataURL(newImage);
        } else {
            // If it's already a Base64 image
            setImage(newImage);
            localStorage.setItem('profileImage', newImage);
        }
    }, []);

    return (
        <ImageContext.Provider value={{ image, setImage: updateImage, errorMessage, setErrorMessage }}>
            {children}
        </ImageContext.Provider>
    )
}
export function useImageContext() {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImageContext must be used within an ImageProvider');
    }
    return context
}
