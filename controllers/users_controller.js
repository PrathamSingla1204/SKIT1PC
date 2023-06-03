const User = require('../models/users');  //import user from models

module.exports.signin = function(req, res){
    return res.render('signin', {
        title: "SKIT PC | Sign In"
    })
}

module.exports.signup = function(req, res){
    return res.render('signup', {
        title: "SKIT PC | Sign Up"
    })
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
//todo later

}