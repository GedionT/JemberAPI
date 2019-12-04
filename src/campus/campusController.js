const campusDal   = require('./campusDal');
const profileDal  = require('../profile/profileDal');
const validator   = require('../../services/validator');
const uploader    = require('../../services/uploader');

module.exports = {
   enrolledCourses,
   addCampus, 
   getCampusByName,
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
       var campus      = req.body.campus;
       var location    = req.body.location;
       var departments = req.body.departments;
       var courses     = req.body.courses;

       await campusDal.findOne({Name: campus})
                      .then(found => {
                          if(found) throw 'campus by that name exists in the records';
                          else 
                            return campusDal.create({campus, location, departments, courses});
                      })
                      .then(saved => res.status(200).json({message:'Information saved', saved}))
                      .catch(err=>next(err));
}

async function getCampusByName (req, res, next) {
      var campusName = req.body.campusName;
        
      await campusDal.findOne({Name: campusName})
                     .then(found => {
                         if(found)
                            res.status(200).json(found);
                        else 
                            throw "campus not found";
                     })
                     .catch(err => next(err));
}

async function getAllCampuses (req, res, next) {
    await campusDal.findAll()
                   .then( campuses => res.status(200).json(campuses))
                   .catch(err=> next(err));
}