const Student = require('../models/student');


module.exports.addStudent = (req,res)=>{
    return res.render('addStudent', {
        title: "SKIT PC | Add Student"
    })
}

module.exports.create = async(req,res)=>{
    if(req.isAuthenticated()){
        try{
            let student = await Student.findOne({email:req.body.email});
            if(!student)
            {
                await Student.create(req.body);
                return res.redirect('/users/dashboard');
            }
            else{
                return console.log("Student already Exist");
            }
        }catch(err){
                   console.log("Error in creating Student",err);
        }
    }
    else{
        console.log("Invalid User");
        return res.redirect("/users/signup");
    }
}