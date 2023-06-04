const Interview = require('../models/interview');

module.exports.addInterview = (req, res) => {
         return res.render('addInterview', {
            title: "SKIT PC | Add Interview"
        })
    }
  

module.exports.create = async(req,res)=>{
    if(req.isAuthenticated()){
        try{
                await Interview.create(req.body);
                return res.redirect('/users/dashboard');
            
        } catch(err){
                   console.log("Error in creating Interview",err);
        }
    }
    else{
        console.log("Invalid User");
        return res.redirect("/users/signup");
    }
}