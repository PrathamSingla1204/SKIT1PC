const fs = require("fs");
const Student = require("../models/student");

module.exports.downloadCSV = async function (req, res) {
  try {
    const allStudents = await Student.find({});
    let report =
      "student Id, Student name, Student college, Student email, Student status, DSA Final Score, WebD Final Score, React Final Score, Interview date, Interview company, Interview result";

    for (let student of allStudents) {
      let studentData =
        student.id +
        "," +
        student.name +
        "," +
        student.college +
        "," +
        student.email +
        "," +
        student.placement_status +
        "," +
        student.dsa_score +
        "," +
        student.webdev_score +
        "," +
        student.react_score;

      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          let studentData2 =
            "," +
            interview.date.toString() +
            "," +
            interview.company +
            "," +
            interview.result;
          report += "\n" + studentData + studentData2;
        }
      }
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=studentsReport.csv");

    res.send(report);
  } catch (err) {
    console.log(err);
  }
};
