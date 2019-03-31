const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');
const User = require('./user');

var postSchema = new Schema({
	title: {
		type: String,
	},
	content: {
		type: String
	},
	img: {
		type: String
	},
	role: { // this specifies if it is a part of a group or page
		type: String
	},
	parent: {
		type: mongoose.Schema.ObjectId
	},
	likes: [{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}],
	comments: [{
		type: mongoose.Schema.ObjectId,
		ref: 'comment'
	}],
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: true
	},
	ownerName: {
		type: String
	},
	ownerImg: {
		type: String
	},
	date: {
		type: Date,
		default: new Date()
	}
});

postSchema.pre('remove', function(next) {
	Comment.find({
		_id: {
			$in: this.comments
		}
	}).then((comments) => {
			comments.forEach(comment => {
				comment.remove();
			});
			next();
	}).catch(err => {
			console.log(err);
		});
});


const Post = mongoose.model('post', postSchema);

module.exports = Post;
