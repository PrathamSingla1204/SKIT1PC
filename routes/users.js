const express = require('express');
const router = express.Router();
const passport = require('passport');



const userController = require('../controllers/users_controller');
const downloadController = require('../controllers/download_controller');
router.get('/signin',userController.signin);
router.get('/signup',userController.signup);
router.get('/menu',userController.menu);
router.get('/dashboard',passport.checkAuthentication,userController.dashboard);
router.get('/logOut',userController.logOut);
router.get('/userProfile/:id',passport.checkAuthentication, userController.userProfile);
router.get('/download-csv',downloadController.downloadCSV);

router.post('/updateProfile/:id',userController.updateProfile);





router.post('/create',userController.create);

router.post('/login',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),userController.login);


module.exports = router;