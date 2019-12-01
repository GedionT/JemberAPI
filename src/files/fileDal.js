const File  =   require('../../config/db').File;

module.exports = {
    create,
    update, 
    findOne,
    findAll
}

async function create(data) {
    return await File(data).save();
}

async function update(file, data) {
    Object.assign(file, data);
    return await file.save();
}

async function findOne(query) {
    return await File.findOne(query).populate('file').exec();
}

async function findAll(query) {
    return await File.find(query).exec();
}