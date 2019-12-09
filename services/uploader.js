var cloudinary   = require('cloudinary').v2;
var cloudinaryStorage = require('multer-storage-cloudinary');
const multer     = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'jember',
    api_key: process.env.CLOUD_API_KEY || '244988797972126',
    api_secret: process.env.CLOUD_API_SECRET || 'MxgjYxIm74MpjwVCeLByE8k6vFk'
});


const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "Profile Images",
    allowedFormats: ["jpg", "png"],
    transformation: [{width: 500, height: 500, crop: "limit"}]
});

const parser = multer({storage});