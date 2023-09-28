const multer = require('multer')
const cloudinary = require('cloudinary').v2
const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage

cloudinary.config({
    cloud_name: 'dpokug3s4', 
    api_key: '378916197999477', 
    api_secret: 'Igewf-PwBRnHmRpSETKox3GOy-g'
});

const upload = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'file-upload'
        }
    })
})


module.exports = upload