const config      = require('../../config/config.json');
const profileDal  = require('./profileDal');
const userDal     = require('../users/userDal');
const validator   = require('../../services/validator');
const upload      = require('../../services/uploader');

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
    let bool = false;
    var updated;
// this part needs check * and work**
    let usernameCheck = await userDal.findOne({'username': body.username})
        .then( checkUser => {
                 if(!checkUser) bool = true;
        })
         await userDal.findOne({id})
        .then(user => {
            if(!user) throw 'User not found';
            if(user.username !== body.username && bool){
                throw 'User name is already taken';
            }
            
           updated = profileDal.update(user, body);
        }).catch(err => next(err));

        // var updated = await profileDal.update(user, body);
        res.status(200).json({ message: 'Profile updated', updated});
}

async function download (req, res) {
    
}

async function changeImg(req, res) {

}

async function getById (req, res, next) {
    var id = req.params.id;
    await profileDal.findOne({_id: id})
        .then(profile => {
            if(profile) {
                profile['user'].hash = "####";
                res.status(201).json(profile);
            } else throw 'profile not found';
        }).catch( err => next(err));
}

async function inquire (req, res) {

}

async function getAll (req, res) {
    
}