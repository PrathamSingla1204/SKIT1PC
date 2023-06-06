const Interview = require('../models/interview');
const Student = require('../models/student');

module.exports.addInterview = (req, res) => {
         return res.render('addInterview', {
            title: "SKIT PC | Add Interview"
        })
    }
  

module.exports.create = async(req,res)=>{
    if(req.isAuthenticated()){
        try{
                await Interview.create(req.body);
                return res.redirect('/users/menu');
            
        } catch(err){
                   console.log("Error in creating Interview",err);
        }
    }
    else{
        console.log("Invalid User");
        return res.redirect("/users/signup");
    }
}

module.exports.allocateInterview = async (req, res) => {
    try {
      let interview = await Interview.findById(req.params.id);
      const { email, result } = req.body;
  
      if (interview) {
        let student = await Student.findOne({ email: email });
        if (student) {
          // check if already enrolled
          let alreadyEnrolled = await Interview.findOne({
            "students.student": student.id,
          });
  
          // preventing student from enrolling in same company more than once
          if (alreadyEnrolled) {
            if (alreadyEnrolled.company === interview.company) {
              console.log("already added");
              return res.redirect("back");
            }
          }
  
          let studentObj = {
            student: student.id,
            result: result,
          };
  
          // updating students field of interview by putting reference of newly enrolled student
          await interview.updateOne({
            $push: { students: studentObj },
          });
  
          // updating interview of student
          let assignedInterview = {
            company: interview.company,
            date: interview.date,
            result: result,
          };
          await student.updateOne({
            $push: { interviews: assignedInterview },
          });
  
          console.log(
            `${student.name} enrolled in ${interview.company} interview!`
          );
          return res.redirect("back");
        }
        return res.redirect("back");
      }
      return res.redirect("back");
    } catch (err) {
      console.log("Error in alloting interview!",err);
    }
  };
  
  // deallocating students from an interview
  module.exports.deallocateInterview = async (req, res) => {
    try {
      const { studentId, interviewId } = req.params;
  
      // find the interview
      const interview = await Interview.findById(interviewId);
  
      if (interview) {
        // remove reference of student from interview schema
        await Interview.findOneAndUpdate(
          { _id: interviewId },
          { $pull: { students: { student: studentId } } }
        );
  
        // remove interview from student's schema using interview's company
        await Student.findOneAndUpdate(
          { _id: studentId },
          { $pull: { interviews: { company: interview.company } } }
        );
        return res.redirect("back");
      }
      return res.redirect("back");
    } catch (err) {
      console.log("Couldn't deallocate from interview",err);
    }
  };