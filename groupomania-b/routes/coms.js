//Import framework express 
const express = require('express');
//Create router
const router = express.Router();
//Authentification import
const auth = require('../middleware/auth');
//Multer : Middleware to accept file upload (import)
const multer = require('../middleware/multer-config');
//import sauce controller
const comsCtrl = require('../controllers/coms');
// Import model of comments
const Com = require('../schemas/Com');

//Routes Comments
router.post('/', auth, multer, comsCtrl.createCom);
router.get('/', auth, comsCtrl.getAllCom);
router.get('/:id', auth, comsCtrl.getOneCom);
router.put('/:id', auth, multer, comsCtrl.modifyCom);
router.delete('/:id', auth, comsCtrl.deleteCom);

//Routes Likes and Dislikes
router.post('/:id/like', auth, comsCtrl.likeCom);
//Router export
module.exports = router;