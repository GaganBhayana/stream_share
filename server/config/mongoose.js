const mongoose = require('mongoose');

//SETTING PROMISE
mongoose.promise = global.promise;

//FETCHING MONGODB URI
const uri = process.env.MONGODB_URI;

//CONNECTING TO DATABASE
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to Database');
  }).catch(err => {
    console.log(err);
  });

//EXPORTING MONGOOSE
module.exports = mongoose;
