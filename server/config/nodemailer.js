const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

//TRANSPORTER CONFIGURATION
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN
  }
});

//SETTING NODEMAILER HANDLEBARS
transporter.use('compile', hbs({
  viewEngine: {
    extname: '.handlebars',
    layoutsDir: 'server/views/email/',
    defaultLayout: 'template',
    partialsDir: 'server/views/email/partials/'
  },
  viewPath: 'server/views/email/body',
  extName: '.handlebars'
}));

//VERYFYING TRANSPORTER
transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Tranporter Connected');
  }
});

module.exports = transporter;
