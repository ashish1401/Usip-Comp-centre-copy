const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/base.js");
const { auth } = require("./middleware/auth");

//const Teacher = require("./models/teacher");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
mongoose.connect("mongodb://localhost:27017/compCentre", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const { type } = require("os");
//const sharp = require("sharp");
//const imgDown = require("image-downloader");

const app = express();
app.use(cookieParser());
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
const sessionOptions = {
  secret: "thisisAsecret",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use(flash());
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//*********************************************************************************************** */
//*********************************************************************************************** */


app.get("/home/:id", auth, async (req, res) => {
  const {id} = req.params;
  const student = await Student.findById(id);

  res.render('studentHome',{student});
});

app.get("/home", async (req, res) => {
  res.send("Hello");
});



app.get("/login/student", async (req, res) => {
  res.render('login');
});

app.get("/register/student", async (req, res) => {
  res.render("register");
});


app.get('/edit/:id',auth,async(req,res)=>{
  const {id}=req.params;
  const student = await Student.findById(id);

  res.render('edit',{student});

})


app.get('/', async (req,res)=>{
  res.render('index');
})

//*********************************************************************************************** */
//*********************************************************************************************** */

app.post("/edit/:id",auth,async (req, res) => {
  const { id } = req.params;
 // console.log(req.body);
  const student = await Student.findByIdAndUpdate(id, { ...req.body.student });
  await student.save();

  res.redirect(`/home`);
});

app.post('/login/student',async(req,res)=>{
const {roll_no,password}= req.body;
  //console.log(req.body);

 const student = await Student.findOne({roll_no:roll_no.toLowerCase()});
 //console.log(student);
 
 if(password==student.password){
  //console.log("password matched");
  const token = jwt.sign(
    { _id: student._id },
    "thisisasecretkeyhelloonetwothreefour"
  );
  res.cookie("token", token);

  return res.redirect(`/home/${student._id}`);
 }
  else{
  return res.redirect(`/login/student`);
  }
})


app.post("/register/student", async (req, res) => {
  //console.log(req.body);
  const student = new Student(req.body.student);
  student.roll_no = req.body.student.roll_no.toLowerCase();
  await student.save();
   const id = student._id;
  res.redirect(`/home`);
});

//*********************************************************************************************** */
//*********************************************************************************************** */

app.listen(3000, () => {
  console.log("Live on port 3000");
});
