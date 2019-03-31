const User = require('../models/user');
const TempUser = require('../models/tempUser');

const transporter = require('../config/nodemailer');
const randomString = require('randomstring');

module.exports = {

  sendVerificationMail: (req, res, user) => {

    user.verificationUrl = randomString.generate(40);

    User.findOne({
      email: user.email
    }).then((persistentUser) => {
      if (persistentUser) {
        res.status(200).json({
          message: 'User already exist',
          success: false
        });
      } else {
        TempUser.findOne({
          email: user.email
        }).then((tempUser) => {
          if (tempUser) {
            res.status(200).json({
              message: 'Verification email already sent. Please verify',
              success: false
            });
          } else {
            new TempUser(user)
              .save()
              .then(() => {
                transporter.sendMail({
                  from: `Team Socio <${process.env.EMAIL}>`,
                  to: user.email,
                  subject: 'Verify Email',
                  template: 'confirmEmail',
                  context: {
                    host: process.env.HOST,
                    user
                  }
                }, (err, response) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.status(200).json({
                      message: 'Verification E-mail sent',
                      success: true
                    });
                  }
                });
              }).catch(err => {
                console.log(err);
                res.status(400).send();
              });
          }
        }).catch(err => {
          console.log(err);
          res.status(400).send();
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(400).send();
    });
  },

  confirmEmail: (req, res, verificationUrl) => {
    let temp = null;
    TempUser.findOne({
      verificationUrl
    }).then((user) => {
      temp = user;
      let newUser = {
        name: user.name,
        email: user.email,
        password: user.password,
      };
      return new User(newUser).save()
    }).then(() => {
      return TempUser.findByIdAndRemove(temp._id);
    }).then((user) => {
      transporter.sendMail({
        from: `Team Socio <${process.env.EMAIL}>`,
        to: user.email,
        subject: 'Successfully Registered',
        template: 'successfulRegistration',
        context: {
          host: process.env.HOST,
          user
        }
      }, (err, response) => {
        if (err) {
          console.log(err);
          res.status(400).send();
        } else {
          res.status(200).json({
            message: 'Email verified'
          });
        }
        res.redirect(redirect);
      });
    }).catch((err) => {
      console.log(err);
      res.status(400).send();
    });
  },

}
