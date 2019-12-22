const router           = require('express').Router();
const campusController = require('./campusController');
const auth             = require('../../services/authMiddleware');


router.get('/enrolledIn/:id', auth, campusController.enrolledCourses);
router.post('/addCampus', auth, campusController.addCampus);
router.get('/getCampusByName', auth, campusController.getCampusByName);
router.get('/getAll', auth, campusController.getAllCampuses);

module.exports = router;