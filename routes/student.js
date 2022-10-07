const express = require("express");
const router = express.Router();
const Student = require("../models/base");
const catchAsync = require("../utils/catchAsync");
const { auth } = require("../middleware/auth");
const students = require("../controllers/student");

router
  .route("/register")
  .get(catchAsync(students.renderRegister))
  .post(catchAsync(students.submitRegister));

router
  .route("/login")
  .get(catchAsync(students.renderLoginForm))
  .post(catchAsync(students.submitLoginForm));


router.route('/home/:id').get(auth ,catchAsync(students.studentHomePage));

router
  .route('/edit/:id')
  .get(auth , catchAsync(students.renderEditForm))
  .post(auth,catchAsync(students.submitEditForm));

module.exports = router;
