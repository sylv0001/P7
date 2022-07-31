//Import framework express 
const express = require('express');
//Create router
const router = express.Router();
//import user controller
const userCtrl = require('../controllers/user');
//Post request to create account
router.post('/signup', userCtrl.signup);
//Post request to user login
router.post('/login', userCtrl.login);
//Put request to update password
router.put('/updatepass', userCtrl.updatepass);
//Router export
module.exports = router;