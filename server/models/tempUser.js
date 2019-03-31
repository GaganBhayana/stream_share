const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tempUserSchema = new Schema({
  email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
  verificationUrl: {
    type: String,
    required: true
  }
});

var TempUser = mongoose.model('tempUser', tempUserSchema);

module.exports = TempUser;
