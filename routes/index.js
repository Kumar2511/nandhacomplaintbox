var express = require('express');
var router = express.Router();
var Users =require('../controllers/users');
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});
router.post('/authentication', function(req, res) {
  var data= Users.listusers(req,res);
});
router.post('/registerData', function(req, res) {
  var data= Users.registerData(req,res);
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});


router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.post('/homeData', function(req, res) {
  var data= Users.homeData(req,res);
});

router.get('/student', function(req, res, next) {
  res.render('student', { title: 'Express' });
});

router.post('/studentData', function(req, res) {
  var data= Users.studentData(req,res);
});


router.get('/faculty', function(req, res, next) {
  res.render('faculty', { title: 'Express' });
});
router.post('/facultyData', function(req, res) {
  var data= Users.facultyData(req,res);
});
router.get('/suportstaff', function(req, res, next) {
  res.render('suportstaff', { title: 'Express' });
});
router.post('/suportstaffData', function(req, res) {
  var data= Users.suportstaffData(req,res);
});
router.get('/feedback', function(req, res, next) {
  res.render('feedback', { title: 'Express' });
});
router.post('/feedbackData', function(req, res) {
  var data= Users.feedbackData(req,res);
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.post('/aboutData', function(req, res) {
  var data= Users.aboutData(req,res);
});
router.get('/details', function(req, res, next) {
  res.render('details', { title: 'Express' });
});
router.post('/detailsData', function(req, res) {
  var data= Users.detailsData(req,res);
});
module.exports = router;
