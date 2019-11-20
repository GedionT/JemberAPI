const config    = require('./config.json');
const mongoose  = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// Get current connected Database
var db = mongoose.connection;

// Notify on error or success
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log("Connected to the Database!"));

module.exports = {
    User    : require('../src/users/userModel'), 
    Profile : require('../src/profile/profileModel'),
    Campus  : require('../src/campus/campusModel'),
    // File    : require('../src/files/fileModel')
};