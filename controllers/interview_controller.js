const Student = require('../models/student');

module.exports.addInterview = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/interview/addInterview');
    }
    return res.redirect('/users/signup');
}

module.exports.create = async(req,res)=>{
    //todo later
}