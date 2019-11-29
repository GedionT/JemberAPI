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
 
   await userDal.findOne({'username': body.username})
        .then( checkUser => {
                 if(checkUser != null) throw 'username is already taken';
                 else 
                    return userDal.findOne({id});
        })
        .then(user => {
            if(user == null) throw 'User not found';
            else
                return profileDal.update(user, body);
        })
        .then(profile => res.status(200).json({message: 'Profile updated', profile}))
        .catch(err => next(err));
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

async function getAll (req, res, next) {
    await profileDal.findAll()
        .then( profiles => res.status(200).json(profiles))
        .catch(err => next(err));
}