
//real-app-back/uploads/saveImageToStorage.js

async function saveImageToStorage(file) {
    try {
        if (!file) {
            throw new Error('File not provided');
        }
        const imageUrl = `${process.env.BASE_URL}/uploads/${file.filename}`;
        console.log('Image saved at:', imageUrl);
        return imageUrl;
    } catch (error) {
        console.error('Error saving image:', error.message);
        throw error;
    }
}

module.exports = saveImageToStorage;
