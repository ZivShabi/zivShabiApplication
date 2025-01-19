
const fs = require('fs');
const path = require('path');
const MAX_SIZE = 50 * 1024 * 1024;  // הגבלת גודל ל-50MB
const ALLOWED_TYPES = ['.mp4', '.avi', '.mov'];  // סוגי קבצים מותרים

function saveVideoToStorage(file, userId) {
    return new Promise((resolve, reject) => {

        const userFolder = path.join(__dirname, '..', 'uploads', userId.toString())
        const timestamp = Date.now()
        const fileExtension = path.extname(file.originalname);
        const newFileName = `${timestamp}${fileExtension}`;

        if (!ALLOWED_TYPES.includes(fileExtension)) {
            return Promise.reject('Invalid video file type');
        }


        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }

        if (file.size > MAX_SIZE) {
            return Promise.reject('File size exceeds the limit');
        }
        const videoPath = path.join(userFolder, newFileName);


        fs.writeFile(videoPath, file.buffer, (err) => {
            if (err) return reject(new Error('Error saving video'));
            resolve(`/uploads/${userId}/${newFileName}`);
        })
    })
}

module.exports = saveVideoToStorage;
