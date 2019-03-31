//LOADING DEPENDENCIES
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const exhbs = require('express-handlebars');
const passport = require('passport');
require('./server/seed/main.js');

//LOADING CONFIG
require('./server/config/config');


//INITIALIZING APP
const app = express();


//SETTING MIDDLEWARES
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'client/build')));


//MIDDLEWARE FOR CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
  next();
});

//CONNECTING TO THE DATABASE
require('./server/config/mongoose');


//CHECKING nodemailer
require('./server/config/nodemailer');


//LOADING HELPERS
const emailVerification = require('./server/helpers/emailVerification');


//LOADING MODELS
const User = require('./server/models/user');


//LOADING SEED FILES
require('./server/seed/main');

/***********************************
                Routes
***********************************/
const user = require('./server/routes/user');
const page = require('./server/routes/page');
const group = require('./server/routes/group');
const admin = require('./server/routes/admin');
const post = require('./server/routes/post');
const search = require('./server/routes/search');
app.use('/api/admin', admin);
app.use('/api/user', user);
app.use('/api/page', page);
app.use('/api/group', group);
app.use('/api/post', post);
app.use('/api/search', search);


//SIGNUP ROUTE
app.post('/api/sign-up', (req, res) => {
  let newUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        newUser.password = hash;
        emailVerification.sendVerificationMail(req, res, newUser);
      }
    });
  });
});


//CONFIRM EMAIL ROUTE
app.get('/api/confirm-email/:url', (req, res) => {
  let verificationUrl = req.params.url;
  emailVerification.confirmEmail(req, res, verificationUrl);
});


//LOGIN ROUTE
app.post('/api/login', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then((user) => {
    if (!user) {
      res.status(200)
        .json({
          success: false,
          message: 'User not found'
        });
    } else if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          res.status(200)
            .json({
              success: false,
              message: "Email and Password doesn't match"
            });
        } else {
          // we check for the authenticity after the password matched
          const payload = {
            id: user._id,
          };
          var token = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200)
            .json({
              success: true,
              message: 'Successfully logged in',
              token,
            });
        }
      });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send();
  });
});


//SENDING POST BUILD
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


//STARTING SERVER
const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
