const User = require('../models/users');  //import user from models

module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/dashboard');
    }
}

module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/dashboard');
    }
}

module.exports.create = async (req,res)=>{
    if(req.body.password != req.body.confirm_Password)
    {
        return res.redirect('back');
    }
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user){
            await User.create(req.body);
            return res.redirect('/users/signin');
        }
        else
            return res.redirect('back');
    }
    catch(err){
        console.log('Error:',err);
    }
}

module.exports.login = async (req,res)=>{
    return res.redirect('/users/dashboard');

}