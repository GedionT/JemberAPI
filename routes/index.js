var router        = require('express').Router();

var userRouter    = require('../src/users/userRoutes');
var profileRouter = require('../src/profile/profileRoutes');
var campusRouter  = require('../src/campus/campusRoutes');
var fileRouter    = require('../src/files/fileRoutes');

router.use('/users', userRouter);
router.use('/profile', profileRouter);
router.use('/campus', campusRouter);
router.use('/files', fileRouter);

module.exports = router;