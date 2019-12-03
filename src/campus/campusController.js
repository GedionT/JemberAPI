const campusDal   = require('./campusDal');
const profileDal  = require('../profile/profileDal');
const validator   = require('../../services/validator');
const uploader    = require('../../services/uploader');

module.exports = {
   enrolledCourses,
   addCampus, 
   getCampus,
   getAllCampuses
}

async function enrolledCourses (req, res, next) {
    let id = req.params.id;
    let campus, department;

        profileDal.findOne({ id })
        .then(profile => {
            if (!profile)
                throw 'profile not found';
            else {
                campus = profile.campus;
                department = profile.department;
                return campusDal.findOne({ Name: campus });
            }
        })
        .then(campus => {
            if (!campus)
                throw 'campus not found';
            else {
                campus.departments.forEach( departments => {
                    if(departments == department) { 
                        var courses = department.courses;
                        res.status(200).json({courses});
                    }
                    else 
                        throw 'department not found'
                })
            }
        })
        .catch(err => next(err));

}

async function addCampus (req, res, next) {

}

async function getCampus (req, res, next) {

}

async function getAllCampuses (req, res, next) {
    
}