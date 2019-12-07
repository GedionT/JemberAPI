var cloud   = require('cloudinary').v2;

module.exports = {
    imgUpload,
    fileUpload,
    videoUpload,
}

cloud.config({
    cloud_name: process.env.CLOUD_NAME || 'jember',
    api_key: process.env.CLOUD_API_KEY || '244988797972126',
    api_secret: process.env.CLOUD_API_SECRET || 'MxgjYxIm74MpjwVCeLByE8k6vFk'
});


const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') 
        cb(null, true)
    else 
        cb(new Error('Invalid file type, only JPEG and PNG is allowed'), false);
}

const imgUpload = multer({
    fileFilter, 
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'bucket-name',
        metadata: function(req, file, cb){
            cb(null, {fieldName: 'testing metadata'});
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});


function fileUpload() {

}

function videoUpload() {
    
}
