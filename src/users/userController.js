const config     =   require('../../config/config.json');
const jwt        =   require('jsonwebtoken');
const bcrypt     =   require('bcrypt');
const userDal    =   require('./userDal');
const profileDal =   require('../profile/profileDal');
const validator  =   require('../../services/validator');

module.exports = {
    login,
    signup,
    getById,
    getAll
}

// login an existing user by providing username and password
async function login(req, res, next) {
    let username, password;

    username = req.body.username;
    password = req.body.password;

    await userDal.findOne({username})
        .then(user => {
            if (user && bcrypt.compareSync(password, user.hash)) {
                 const { hash, ...userWithoutHash } = user.toObject();
                 const token = jwt.sign({ sub: user.id }, process.env.JWTSECRET || config.secret);
                    res.status(201).json({
                     ...userWithoutHash,
                     token
                    });
             } else 
                throw 'username or password incorrect';
    }).catch(err => next(err));
}

// create a new user and empty profile on the fly using phone number, username, and password
async function signup(req, res, next) {
    let username, phone, password;
    
    username = req.body.username;
    phone    = req.body.phone;
    password = req.body.password;

    await userDal.findOne({username})
        .then(found => {
            if(found) throw 'username is already taken';
            else return userDal.findOne({phone});
        })
        .then(found => {
            if (found) throw 'phone number is registered to a different account';
            else return hash = bcrypt.hashSync(password, 10);
        })
        .then(hash => userDal.create({ username, phone, hash}) )
        .then(saved => {
            user = saved;
            return profileDal.create({user: user._id});
        })
        .then(profile => userDal.update(user, {profile}))
        .then(user => {
            user.hash = "####";
            res.status(201).json({ message: 'registration successful', user});
        })
        .catch(err => next(err));
}

// gets a registered user by userId
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

// gets all registered users information
async function getAll(req, res, next) {
    await userDal.findAll()
        .then( users => {
            users.forEach(user => {
                user.hash = "####";                
            });
            res.status(200).json(users)})
        .catch(err => next(err));
}

