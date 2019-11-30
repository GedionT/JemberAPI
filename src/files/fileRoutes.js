const router             =   require('express').Router();
const fileController  =   require('./fileController');
const auth               =   require('../../services/authMiddleware');


router.get('/download', auth, fileController.download);
router.post('/upload', auth, fileController.upload);


module.exports = router;