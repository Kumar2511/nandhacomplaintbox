var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { MongoClient } = require("mongodb");
const flash = require("connect-flash");
const mongoose = require('mongoose');
const compression = require('compression');
const expressSession = require('express-session');
const passport = require('passport');

const studentComplaint = require('./modules/student'); 



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const admin = require('./modules/admin');

var app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
const mongoURI = "mongodb://127.0.0.1:27017/ComplaintBox"; 
const dbName = "ComplaintBox";
let client;
mongoose.connect(mongoURI, { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDb...'))
    .catch((e) => console.log('Connection Failure...', e));
    
// view engine setup
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressSession( { secret: 'mysecret', resave: false, saveUninitialized: true ,cookie: { maxAge: 8*60*60*1000 }} ));
require('./services/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));




app.use(function (req, res, next){
  res.locals.toasts = req.session.toasts || [];
  req.session.toasts = []; 
    next();
});

app.get("/api/complaints", async (req, res) => {
  try {
    const studentdata = await studentComplaint.find();

    

    res.json(studentdata);
  } catch (err) {
    console.error('Error fetching complaints:', err);
    res.status(500).send('Error fetching complaints');
  }
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
  

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
