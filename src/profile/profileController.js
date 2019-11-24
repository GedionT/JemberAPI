const config      = require('../../config/config.json');
const profileDal  = require('./profileDal');
const userDal     = require('../users/userDal');
const validator   = require('../../services/validator');
const upload      = require('../../services/fileUpload');

module.exports = {
    update,
    changeImg,
    getById,
    inquire,
    download,
    getAll
}

async function update (req, res, next) {
    let id = req.params.id;
    let body = req.body;

    await userDal.findOne({id})
        .then(user => {
            if(!user) throw 'User not found';
            if(user.username !== body.username && await userDal.findOne({ 'username': body.username })){
                throw 'User name is already taken';
            }
            
            var updated = await profileDal.update(user, body);
            res.status(200).json({ message: 'Profile updated', updated});
        })
        .catch(err => next(err));
}

async function download (req, res) {
    
}

async function changeImg(req, res) {

}

async function getById (req, res) {

}

async function inquire (req, res) {

}

async function getAll (req, res) {
    
}