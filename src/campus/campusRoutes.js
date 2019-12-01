const router           = require('express').Router();
const campusController = require('./campusController');
const auth             = require('../../services/authMiddleware');


router.get('/enrolledCourses/:id', auth, campusController.enrolledCourses);
router.post('/addCampus', auth, campusController.addCampus);
router.get('/getCampus', auth, campusController.getCampus);
router.get('/getAll', auth, campusController.getAllCampuses);

module.exports = router;