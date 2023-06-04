const Student = require('../models/student');


module.exports.addStudent = (req,res)=>{
   
   if(req.isAuthenticated()){
    return res.render('addStudent', {
        title: "SKIT PC | Add Student"
    })}
    return res.redirect("/");
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

module.exports.studentProfile = async(req,res)=>{
    const student = await Student.findById(req.params.id);
    try{
        return res.render('studentProfile',{
            title:'Student Profile',
            stud:student
        });
    }catch(err){
        console.log("Error in student profile",err);
    }
}



module.exports.updateStudent = async(req,res)=>{
    try {
        const student = await Student.findById(req.params.id);
          student.name = req.body.name;
          student.college = req.body.college;
          student.batch = req.body.batch;
          student.placementStatus = req.body.placementStatus;
          student.dsa_score = req.body.dsa_score;
          student.webdev_score = req.body.webdev_score;
          student.react_score = req.body.react_score;
          student.save();
          return res.redirect("/users/dashboard");
   
    } catch (err) {
        console.log("ERROR IN UPDATING STUDENT",err);
    }


}

module.exports.deleteStudent = async function(req,res){
    try{
        let student = await Student.findById(req.params.id);
        await Student.deleteOne({ _id: req.params.id })
        console.log("Student deleted");
          return res.redirect('/users/dashboard');
        }
        catch(err){
        console.log("Errorin deleting student :",err);
    }

}