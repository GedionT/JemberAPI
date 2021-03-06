const profileDal  = require('./profileDal');
const validator   = require('../../services/validator');
const uploader    = require('../../services/uploader');

module.exports = {
    update,
    changeImg,
    getById,
    getCurrent,
    addVoucher,
    getAll
}

async function update (req, res, next) {
    let id = req.params.id;
    let body = req.body;
 
   await profileDal.findOne({id})
        .then(profile => {
                 if(profile == null) throw 'profile not found';
                 else 
                    return profileDal.update(profile, body);
        })
        .then(profile => {
            profile['user'].hash = "####";
            res.status(200).json({message: 'Profile updated', profile});
        })
        .catch(err => next(err));
}

async function changeImg(req, res, next) {
    var id = req.params.id;
    const image = {};
    image.url = req.file.url;
    image.id  = req.file.public_id;
    await profileDal.findOne({_id: id})
        .then(profile => {
               if(err) throw 'profile not found';
               else
                  return profileDal.update(profile, image);
        })
        .then(profile => res.status(200).json({message: 'successful upload', image: profile.image}))
        .catch(err => next(err));
}

async function addVoucher(req, res, next) {
    var id      = req.params.id;
    var voucher = req.body.voucher;
    var voucherID, issuer, amount;
    // validate voucher and give access to materials for a limited time
    await profileDal.findOne({_id:id})
        .then(profile => {
            if(!profile) throw 'profile not found, try again';
            else {
                voucherID = voucher.split('')[0];
                issuer    = voucher.split('')[1];
                amount    = voucher.split('')[2];    
            }
        })
        .then(profile => {
             
        })
        .catch(err => next(err));    
}

async function getById (req, res, next) {
    var id = req.params.id;
    await profileDal.findOne({_id: id})
        .then(profile => {
            if(profile) {
                profile['user'].hash = "####";
                res.status(201).json(profile);
            } else throw 'profile not found';
        })
        .catch( err => next(err));
}

async function getCurrent (req, res, next) {
    var id = req.user.sub;
    await profileDal.findOne({_id: id})
        .then(profile => {
            if(profile) {
                profile['user'].hash = "####";
                res.stauts(201).json(profile);
            } else throw 'profile not found';
        })
        .catch( err => next(err));
}

async function getAll (req, res, next) {
    await profileDal.findAll()
        .then( profiles => res.status(200).json(profiles))
        .catch(err => next(err));
}