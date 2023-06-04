const User = require('../models/users');  //import user from models

module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/dashboard');
    }
    return res.render('signin', {
        title: "SKIT PC | Sign In"
    })
}

module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/dashboard');
        }
    return res.render('signup', {
        title: "SKIT PC | Sign Up"
    })
}
module.exports.userProfile = async function(req, res) {
    try {
      const user = await User.findById(req.params.id);
      return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user
      });
    } catch (err) {
       console.log(err);    }
  }

  module.exports.updateProfile = async function(req, res) {
    if(req.params.id = req.user.id){
    try{
        const user = await User.findById(req.params.id);
        user.name = req.body.name;
        user.password = req.body.password;
        user.phoneNo = req.body.phoneNo;
        user.save();
        return res.redirect('/users/dashboard');

    }  catch(err){
              console.log("Error in Updating",err )
    }
}

}
  


module.exports.dashboard = function(req, res){
    return res.render('dashboard', {
        title: "SKIT PC | dashboard"
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
    return res.redirect('/users/dashboard');

}

module.exports.logOut =  function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}
