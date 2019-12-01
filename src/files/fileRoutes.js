const router             =   require('express').Router();
const fileController  =   require('./fileController');
const auth               =   require('../../services/authMiddleware');


router.get('/download', auth, fileController.download);
router.post('/upload', auth, fileController.upload);
router.put('/spellChecked', auth, fileController.spellChecked);
router.post('/inquire', auth, fileController.inquire);


module.exports = router;