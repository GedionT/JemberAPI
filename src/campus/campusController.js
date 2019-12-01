const config      = require('../../config/config.json');
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
    let campus, department, check = false;

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
                    if(departments == department) check = true;
                    else{ 
                        check = false 
                        throw 'department not found'
                        }
                })
            }
            // needs work on sending enrolled courses on next line below
            res.status(200).json({courses});
        })
        .catch(err => next(err));

}