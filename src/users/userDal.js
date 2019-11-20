const User  =   require('../../config/db').User;

module.exports = {
    create,
    update, 
    findOne,
    findAll
}

async function create(data) {
    return await User(data).save();
}

async function update(user, data) {
    Object.assign(user, data);
    return await user.save();
}

async function findOne(query) {
    return await User.findOne(query).populate('profile').exec();
}

async function findAll(query) {
    return await User.find(query).exec();
}