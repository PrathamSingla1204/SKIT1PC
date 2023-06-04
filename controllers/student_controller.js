const Student = require('../models/student');


module.exports.addStudent = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/student/addStudent');
    }
    return res.redirect('/users/signup');
}

module.exports.create = async(req,res)=>{
    //todo later
}