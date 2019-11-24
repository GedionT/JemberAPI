const config     =   require('../../config/config.json');
const jwt        =   require('jsonwebtoken');
const bcrypt     =   require('bcrypt');
const userDal    =   require('./userDal');
// const profileDal =   require('../profile/profileDal');
const validator  =   require('../../services/validator');

module.exports = {
    login,
    signup,
    getById,
    getAll
}

async function login(req, res, next) {
    let username, password;

    username = req.body.username;
    password = req.body.password;

    await userDal.findOne({username})
        .then(user => {
            if (user && bcrypt.compareSync(password, user.hash)) {
                 const { hash, ...userWithoutHash } = user.toObject();
                 const token = jwt.sign({ sub: user.id }, config.secret);
                    res.status(201).json({
                     ...userWithoutHash,
                     token
                    });
             } else 
                throw 'username or password incorrect';
    }).catch(err => next(err));
}

async function signup(req, res, next) {
    let username, phone, password;
    var hash;
    
    username = req.body.username;
    phone    = req.body.phone;
    password = req.body.password;
    
    if(await userDal.findOne( { username } ) ) throw 'Username is already taken';
    if(await userDal.findOne( { phone } ) ) throw 'Phone is registered to another account';

    if(password) hash = bcrypt.hashSync(password, 10);

    var user    = await userDal.create({username, phone, hash});
    // .then( user => { 
        // var profile = await profileDal.create({ user: user._id });
        // await userDal.update(user, {profile});
        // res.status(201).json({ message: 'registration successful', user});
// }.catch(err => next(err));

    res.status(201).json({message: 'registration successful', user});
}

async function getById(req, res, next) {
    var id = req.params.id;
    await userDal.findOne({_id: id})
        .then(user => {
            if(user){
            user.hash = "####";
            res.status(200).json(user);
            } else 
                throw "user not found";
        })
        .catch(err => next(err)); 
}

async function getAll(req, res, next) {
    await userDal.findAll()
        .then( users => {
            users.forEach(user => {
                user.hash = "####";                
            });
            res.status(200).json(users)})
        .catch(err => next(err));
}

