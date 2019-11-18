const router             =   require('express').router();
const profileController     =   require('./profileController');
const auth               =   require('../../services/authMiddleware');


router.post('/update',  profileController.update);
router.post('/changeImg', profileController.changeImg);
router.get('/:id', auth, profileController.getById);
router.post('/inquire', auth, profileController.inquire);
router.get('/', auth, profileController.getAll);

module.exports = router;