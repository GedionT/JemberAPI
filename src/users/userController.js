const config     =   require('../../config/config.json');
const jwt        =   require('jsonwebtoken');
const bcrypt     =   require('bcrypt');
const userDal    =   require('./userDal');
const validator  =   require('../../services/validator');

module.exports = {
    login,
    signup,
    logout,
    getById,
    update,
    _delete,
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
        return {
            ...userWithoutHash,
            token
        };
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

    var user = await userDal.create({username, phone, hash});
    profileDal.create({ user: user._id });

    res.json({message: 'registration successful'});
}