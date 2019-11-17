const router             =   require('express').router();
const userController     =   require('./userController');
const auth               =   require('../../services/authMiddleware');


router.post('/login',  userController.login);
router.post('/signup', userController.signup);
router.post('/logout', auth, userController.logout);
router.get('/:id', auth, userController.getById);
router.put('/:id', auth, userController.update);
router.delete('/:id', auth, userController._delete);
router.get('/', auth, userController.getAll);

module.exports = router;