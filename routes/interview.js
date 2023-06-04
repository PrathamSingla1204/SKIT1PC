const express = require('express');
const router = express.Router();
const passport = require('passport');

const interviewController = require('../controllers/interview_controller');


router.get('/addinterview',interviewController.addInterview);

router.post('/create',interviewController.create);


module.exports = router;