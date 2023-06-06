const express = require('express');
const router = express.Router();
const passport = require('passport');

const interviewController = require('../controllers/interview_controller');


router.get('/addinterview',interviewController.addInterview);
router.get('/deallocateInterview/:studentId/:interviewId',interviewController.deallocateInterview);


router.post('/allocateInterview/:id',interviewController.allocateInterview);
router.post('/create',interviewController.create);


module.exports = router;