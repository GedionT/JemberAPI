const router             =   require('express').Router();
const profileController  =   require('./profileController');
const auth               =   require('../../services/authMiddleware');


router.put('/update', auth, profileController.update);
router.post('/changeImg', auth, profileController.changeImg);
router.get('/:id', auth, profileController.getById);
router.put('/addVoucher', auth, profileController.addVoucher);
router.get('/', auth, profileController.getAll);

module.exports = router;