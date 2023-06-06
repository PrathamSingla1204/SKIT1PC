const express = require('express');
const router = express.Router();

console.log("router working");


const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);

router.use('/users', require('./users'));
router.use('/student', require('./student'));
router.use('/interview', require('./interview'));
// router.use('/dashboard', require('./interview'));


module.exports = router;