var router        = require('express').Router();

// get homepage to redirect for download
router.get('/', (req, res) => {
    res.render('index');
});

router.use('/users', require('../src/users/userRoutes'));
router.use('/profile', require('../src/profile/profileRoutes'));
// router.use('/campus', require('../src/campus/campusRoutes'));
// router.use('/files', require('../src/files/fileRoutes'));

module.exports = router;