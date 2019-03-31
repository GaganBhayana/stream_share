const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notificationSchema = new Schema({
	content:{
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: true
	}

});

var Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
