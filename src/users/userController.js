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

async function login(req, res) {
    let username, password, user;

    username = req.body.username;
    password = req.body.password;

    user = await userDal.findOne({username});
    // authentication code
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        res.status(201).json({
            ...userWithoutHash,
            token
        });
    }
}

async function signup(req, res) {
    let username, phone, password;
    var hash;
    
    username = req.body.username;
    phone    = req.body.phone;
    password = req.body.password;

    if(await userDal.findOne( { username } ) ) throw 'Username is already taken';
    if(await userDal.findOne( { phone } ) ) throw 'Phone is registered to another account';

    if(password) hash = bcrypt.hashSync(password, 10);

    var user    = await userDal.create({username, phone, hash});
    // var profile = await profileDal.create({ user: user._id });

    // await userDal.update(user, {profile});

    res.status(201).json({message: 'registration successful', user});
}

async function getById(req, res) {
    var id = req.params.id;
    let user = await userDal.findOne({_id: id});
    user.hash = "";
    res.status(201).json(user);
    
}

async function getAll(req, res) {
    var users = await userDal.findAll();
    res.status(200).json(users);
}

