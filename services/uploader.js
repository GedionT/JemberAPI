var cloudinary   = require('cloudinary').v2;

module.exports = {
    imgUpload,
    fileUpload,
    videoUpload,
}

cloudinary.config({
    //must be set using process.env or dotenv module to setup with environment
    cloud_name: 'jember',
    api_key: '244988797972126',
    api_secret: 'MxgjYxIm74MpjwVCeLByE8k6vFk'
});

function imgUpload() {

}

function fileUpload() {

}

function videoUpload() {
    
}
