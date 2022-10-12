const Student = require('../models/base');
const jwt = require('jsonwebtoken');

module.exports.renderRegister = async (req,res) =>{
    res.render("register");
}


module.exports.submitRegister = async (req,res) =>{
    const student = new Student(req.body.student);
    student.roll_no = req.body.student.roll_no.toLowerCase();
    await student.save();
     const id = student._id;
     const token = jwt.sign(
        { _id: id },
        "thisisasecretkeyhelloonetwothreefour"
      );
      res.cookie("token", token);
    res.redirect(`/student/home/${id}`);
}

module.exports.renderLoginForm = async (req,res) =>{
  res.render('login');
   
}

module.exports.submitLoginForm = async (req,res) =>{
    const {roll_no,password}= req.body;
    //console.log(req.body);
  
   const student = await Student.findOne({roll_no:roll_no.toLowerCase()});
   //console.log(student);
   if(!student){
    req.flash('success','studentNOtFound');
    return res.redirect('/student/login');
   }
   
   if(password==student.password){
    //console.log("password matched");
    const token = jwt.sign(
      { _id: student._id },
      "thisisasecretkeyhelloonetwothreefour"
    );
    res.cookie("token", token);
  
    return res.redirect(`/student/home/${student._id}`);
   }
    else{
    return res.redirect(`/student/login`);
    }
}

module.exports.studentHomePage = async (req,res) =>{
    const {id} = req.params;
    const student = await Student.findById(id);
  
    res.render('studentHome',{student});
     
  }

  module.exports.renderEditForm = async (req,res) =>{
    const {id}=req.params;
    const student = await Student.findById(id);
  
    res.render('edit',{student});
     
  }

  module.exports.submitEditForm = async (req,res) =>{
    const { id } = req.params;
    // console.log(req.body);
     const student = await Student.findByIdAndUpdate(id, { ...req.body.student });
     student.roll_no = req.body.student.roll_no.toLowerCase();
     await student.save();
   
     res.redirect(`/student/home/${id}`);
     
  }

  module.exports.mkbhd = async (req,res) =>{
    const {id}=req.params;
    res.send(id);
     
  }