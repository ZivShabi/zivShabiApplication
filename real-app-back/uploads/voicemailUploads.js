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
            const files = fs.readdirSync(postFolder).filter((f) => f.endsWith('.ogg'))
            nextFileNumber = files.length + 1
        } catch {
            // אם קריאה ל-readdirSync נכשלת, התחל עם 1
        }

        const fileExtension = path.extname(file.originalname) || '.ogg'
        const newFileName = `recording${nextFileNumber}${fileExtension}`
        const audioFilePath = path.join(postFolder, newFileName)

        await fs.promises.writeFile(audioFilePath, file.buffer);
        return `/uploads/${postId}/${newFileName}`;
    } catch (err) {
        return Promise.reject(`Error saving audio: ${err.message}`);
    }
}

module.exports = saveAudioToStorage;










































// const fs = require('fs');
// const path = require('path');
// async function saveAudioToStorage(file) {
//     const uploadsDir = path.join(__dirname, '../uploads');

//     // אם תיקיית uploads לא קיימת, יצירת אותה
//     if (!fs.existsSync(uploadsDir)) {
//         fs.mkdirSync(uploadsDir, { recursive: true });
//     }

//     // תיקיית משנה לפי שנה, חודש ויום
//     const dateFolder = path.join(uploadsDir, `${new Date().getFullYear()}`, `${new Date().getMonth() + 1}`, `${new Date().getDate()}`);
//     if (!fs.existsSync(dateFolder)) {
//         fs.mkdirSync(dateFolder, { recursive: true });
//     }


//     // הגבלת גודל קובץ - נניח 10MB
//     const MAX_SIZE = 10 * 1024 * 1024;  // 10MB
//     if (file.size > MAX_SIZE) {
//         return Promise.reject('File size exceeds the limit of 10MB');
//     }

//     // יצירת שם קובץ עם טיימסטמפ למניעת התנגשות בשמות
//     const fileExtension = path.extname(file.originalname);
//     const timestamp = Date.now();  // חותמת זמן ליצירת שם ייחודי
//     const newFileName = `${timestamp}-${file.originalname}`;
//     const audioFilePath = path.join(dateFolder, newFileName);

//     // שמירת הקובץ במערכת הקבצים
//     return new Promise((resolve, reject) => {
//         fs.writeFile(audioFilePath, file.buffer, (err) => {
//             if (err) {
//                 reject('Error saving audio');
//             } else {
//                 resolve(`/uploads/${newFileName}`);  // החזרת הנתיב המלא של הקובץ
//             }
//         });
//     });
// }
// module.exports = saveAudioToStorage;
