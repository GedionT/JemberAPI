const Profile  =   require('../../config/db').Profile;

module.exports = {
    create,
    update, 
    findOne,
    findAll
}

async function create(data) {
    return await Profile(data).save();
}

async function update(profile, data) {
    Object.assign(profile, data);
    return await profile.save();
}

async function findOne(query) {
    return await Profile.findOne(query).populate('user').exec();
}

async function findAll(query) {
    return await Profile.find(query).exec();
}