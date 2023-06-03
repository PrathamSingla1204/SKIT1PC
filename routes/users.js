const express = require('express');
const router = express.Router();
const passport = require('passport');



const userController = require('../controllers/users_controller');
router.get('/signin',userController.signin);
router.get('/signup',userController.signup);


router.post('/create',userController.create);

router.post('/login',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),userController.login);


module.exports = router;