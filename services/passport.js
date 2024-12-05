const passport = require('passport');
const {User} = require('../modules/users');
const { Admin } = require('../modules/admin');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


  // add other strategies for more authentication flexibility
  passport.use('user', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    User.findOne({
      email: email
    },async function(err, user) {
        if (!user) {
            return done(null, false, {
                message: 'This email is not registered.'
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) 
        {
            return done(null, false, {
                message: 'This password is not correct.'
            });
        }
        if(user.is_admin == 1){
            return done(null, false, {
              message: 'Please use user credential to login as a user.'
            });
        }
        user.isType ="USER";
        return done(null, user);
    });
  }
  ));

// add other strategies for more authentication flexibility
passport.use('admin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
},
 function(email, password, done) {
    Admin.findOne({
      email: email
    },async function(err, admin) {
      
        if (!admin) {
            return done(null, false, {
                message: 'This email is not registered.'
            });
        }
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) 
        {
            return done(null, false, {
                message: 'This password is not correct.'
            });
        }
        admin.isType ="ADMIN";
        return done(null, admin);
    });
}
));


// used to serialize the user for the session
passport.serializeUser(function(user, done) {            
    // serialize user
    done(null,{ id: user._id, isType: user.isType });
});

// used to deserialize the user
passport.deserializeUser(function(login, done) {
  if(login.isType== "USER") {
    User.findById(login.id, function(err, user) {
      done(err, user);
    });
  } else if (login.isType== "ADMIN") {
    Admin.findById(login.id, function(err, user) {
      done(err, user);
    });
  }
    
});
