const express = require('express');
const router = express.Router();
const passport = require('passport');


const studentController = require("../controllers/student_controller");

router.get('/addStudent',studentController.addStudent);
router.get('/studentProfile/:id',studentController.studentProfile);
router.get('/deleteStudent/:id',studentController.deleteStudent);
router.post('/create',studentController.create);


router.post('/updateStudent/:id',studentController.updateStudent);


module.exports = router;