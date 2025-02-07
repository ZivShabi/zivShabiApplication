
//real-app-back/middllewares/fileUploadMulter.js

const multer = require('multer')
const fs = require('fs')
const path = require('path')
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.mp3', '.wav', '.mp4']
const isExtensionAllowed = (file) => allowedExtensions.includes(path.extname(file.originalname).toLowerCase())
const MAX_FILE_SIZES = {
    image: 5 * 1024 * 1024,
    audio: 10 * 1024 * 1024,
    video: 20 * 1024 * 1024,
    voiceMessage: 10 * 1024 * 1024
}

const multerOptions = (folder, fileFilter, fileSize) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const folderPath = path.join(__dirname, `../uploads/${folder}`)
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true })
            }
            cb(null, folderPath)
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
            cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
        }
    })
    const limits = { fileSize }
    return multer({ storage, limits, fileFilter })
}

const secureFileFilter = (type) => (req, file, cb) => {
    const isMimeTypeValid = file.mimetype.startsWith(type)
    const isExtensionValid = isExtensionAllowed(file)
    if (!isMimeTypeValid || !isExtensionValid) {
        return cb(new Error(`Invalid file type or extension for ${type}`), false)
    } cb(null, true)
}
const uploadImage = multerOptions('images', secureFileFilter('image/'), MAX_FILE_SIZES.image).single('image')
const uploadAudio = multerOptions('audios', secureFileFilter('audio/'), MAX_FILE_SIZES.audio).single('audio')
const uploadVideo = multerOptions('videos', secureFileFilter('videos/'), MAX_FILE_SIZES.video).single('video')
// const uploadVoiceMessage = multerOptions('voice-messages', secureFileFilter('voiceMessage/'), MAX_FILE_SIZES.voiceMessage).single('voiceMessage')
const uploadVoiceMessage = multerOptions('voice-messages', secureFileFilter('audio/'), MAX_FILE_SIZES.voiceMessage).single('voiceMessage');


const uploadFile = (file, type) => {
    if (!file) {
        throw new Error(`${type} file is required`)
    }
    const folder = path.join(__dirname, `../uploads/${type}s/`)
    // console.log('Uploaded File Path:', path.join(__dirname, `../uploads/audios/${file.filename}`));
    console.log('Uploaded File Path:', path.join(__dirname, `../uploads/${type}s/${file.filename}`));

    const url = `/uploads/${type}s/${file.filename}`
    console.log('Saved at:', folder, 'File URL', url)
    return url
}
module.exports = { uploadImage, uploadAudio, uploadVideo, uploadVoiceMessage, uploadFile }

