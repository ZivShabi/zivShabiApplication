const fs = require('fs')
const path = require('path')

async function saveAudioToStorage(file, postId) {
    try {
        const uploadsDir = path.join(__dirname, '../uploads')

        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true })
        }

        if (!postId) {
            throw new Error('postId is required')
        }

        const postFolder = path.join(uploadsDir, postId)

        if (!fs.existsSync(postFolder)) {
            fs.mkdirSync(postFolder, { recursive: true })
        }

        const MAX_SIZE = 10 * 1024 * 1024
        if (file.size > MAX_SIZE) {
            throw new Error('File size exceeds the limit of 10MB')
        }

        let nextFileNumber = 1;
        try {
            const files = fs.readdirSync(postFolder).filter((f) => f.endsWith('.wav'))
            nextFileNumber = files.length + 1
        } catch {
            // אם קריאה ל-readdirSync נכשלת, התחל עם 1
        }

        const fileExtension = path.extname(file.originalname) || '.wav'
        const newFileName = `recording${nextFileNumber}${fileExtension}`
        const audioFilePath = path.join(postFolder, newFileName)

        await fs.promises.writeFile(audioFilePath, file.buffer);
        return `/uploads/${postId}/${newFileName}`;
    } catch (err) {
        return Promise.reject(`Error saving audio: ${err.message}`);
    }
}

module.exports = saveAudioToStorage;








































