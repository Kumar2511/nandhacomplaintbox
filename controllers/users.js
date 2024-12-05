const {User} = require('../modules/users');
const Student = require('../modules/student');
const { Faculty } = require('../modules/faculty');
const { Suportstaff} = require('../modules/suportstaff');

const bcrypt = require("bcrypt");
exports.listusers = async (req, res) => {
  console.log("HI");

//try {
  const { action, username, email, password, confirmPassword } = req.body;
// Handle Sign-In (Login)
//console.log(email);
      const user = await User.findOne({ email:email });
      console.log(user);
      if (!user) {
        req.session.toasts.push({ type: 'error', message: 'Invalid credentials' });
       // return res.status(401).json({ message: "Invalid credentials" });
        return res.redirect('/login');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        req.session.toasts.push({ type: 'error', message: 'Invalid credentials' });
        return res.redirect('/login');
        //return res.status(401).json({ message: "Invalid credentials" });
      }
      res.redirect('/about');
     //return res.status(200).json({ message: "Login successful", userId: user._id });

    // If the action is not recognized
   // return res.status(400).json({ message: "Invalid action type" });

  //} catch (error) {
    //console.error("Error during action:", error);
    //res.status(500).json({ message: "Something went wrong", error });
  //}

}
exports.    registerData = async (req,res) => {
  const { name, email, password,  } = req.body;

   // console.log(req.body);
  // Check if the user already exists by email
  let existingUser = await User.findOne({ email: req.body.email });
 // console.log(existingUser);
  if (existingUser) {
    req.session.toasts.push({ type: 'error', message: 'User already exists with this email' });
    return res.redirect('/login');
    //return res.status(400).json({ message: "User already exists with this email" });
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  let verify = Math.floor(Math.random() * 10000000 + 1);
  const result = await user.save();
console.log(result);
  // Hash the password before saving
  //const hashedPassword = await bcrypt.hash(password, 10);

  req.session.toasts.push({ type: 'success', message: 'User created successfully' });
  return res.redirect('/login');
  //return res.status(201).json({ message: "User created successfully", userId: result.insertedId });

}

exports.studentData = async (req,res) => {

   console.log(req.body);
  // Check if the user already exists by email
 // let existingUser = await User.findOne({ email: req.body.email });
 // console.log(existingUser);

  const result = await Student.create({
    subject: req.body.subject,
    rollNo: req.body.rollNo,
    message: req.body.message,
  });
console.log(result);
  // Hash the password before saving
  //const hashedPassword = await bcrypt.hash(password, 10);

  req.session.toasts.push({ type: 'success', message: 'Student Complaint created successfully' });
  return res.redirect('/student');
  //return res.status(201).json({ message: "User created successfully", userId: result.insertedId });
}

exports.facultyData = async (req,res) => {

  console.log(req.body);
 // Check if the user already exists by email
// let existingUser = await User.findOne({ email: req.body.email });
// console.log(existingUser);

 const result = await Faculty.create({
   subject: req.body.subject,
   yourName: req.body.yourName,
   message: req.body.message,
 });
console.log(result);
 // Hash the password before saving
 //const hashedPassword = await bcrypt.hash(password, 10);

 req.session.toasts.push({ type: 'success', message: 'Faculty Complaint created successfully' });
 return res.redirect('/faculty');
 //return res.status(201).json({ message: "User created successfully", userId: result.insertedId });
}

exports.suportstaffData = async (req,res) => {

  console.log(req.body);
 // Check if the user already exists by email
// let existingUser = await User.findOne({ email: req.body.email });
// console.log(existingUser);

 const result = await Suportstaff.create({
   subject: req.body.subject,
   rollNo: req.body.rollNo,
   message: req.body.message,
 });
console.log(result);
 // Hash the password before saving
 //const hashedPassword = await bcrypt.hash(password, 10);

 req.session.toasts.push({ type: 'success', message: 'Suportstaff Complaint created successfully' });
 return res.redirect('/suportstaff');
 //return res.status(201).json({ message: "User created successfully", userId: result.insertedId });
}



exports.   adminData = async (req,res) => {
  const { name,password,  } = req.body;

   // console.log(req.body);
 
  const user = new User({
    name: req.body.name,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  let verify = Math.floor(Math.random() * 10000000 + 1);
  const result = await user.save();
console.log(result);
  // Hash the password before saving
  //const hashedPassword = await bcrypt.hash(password, 10);

  req.session.toasts.push({ type: 'success', message: 'User created successfully' });
  return res.redirect('/admin');
  //return res.status(201).json({ message: "User created successfully", userId: result.insertedId });

}