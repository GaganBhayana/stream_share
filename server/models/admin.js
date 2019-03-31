const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var adminSchema = new Schema({
	email: {
		type:String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: "admin"
	},
});

var Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
