const Campus  =   require('../../config/db').Campus;

module.exports = {
    create,
    update, 
    findOne,
    findAll
}

async function create(data) {
    return await Campus(data).save();
}

async function update(file, data) {
    Object.assign(file, data);
    return await file.save();
}

async function findOne(query) {
    return await Campus.findOne(query).exec();
}

async function findAll(query) {
    return await Campus.find(query).exec();
}