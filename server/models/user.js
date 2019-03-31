const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./post');
const reviewSchema = require('./review.js');

var userSchema = new Schema({
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
	tagLine: {
		type: String,
		default: "Available"
	},
	img: {
		type: String
	},
	role: {
		type: String,
		default: "user"
	},
	friends: [{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}],
	friendRequests: [{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}],
	posts: [{
		type: mongoose.Schema.ObjectId,
		ref: 'post'
	}],
	pages: [{
		type: mongoose.Schema.ObjectId,
		ref: 'page'
	}],
	notifications: [{
		type: mongoose.Schema.ObjectId,
		ref: 'notification'
	}],
	groups: [{
		type: mongoose.Schema.ObjectId,
		ref: 'group'
	}],
	location: {
		type: String,
	},
	phone: {
		type: String
	},
	gender: {
		type: String,
	},
	dob: {
		type: Date,
	},
	school: {
		type: String
	},
});

var User = mongoose.model('user', userSchema);

userSchema.pre('remove', function (next) {
	Post.find({
			_id: {
				$in: this.posts
			}
		})
		.then((posts) => {
			posts.forEach(post => {
				post.remove();
			});
			next();
		})
		.catch(err => {
			console.log(err);
		});
});

userSchema.post('remove', function () {
	User.find({
			_id: {
				$in: this.friends
			}
		})
		.then(users => {
			users.forEach(user => {
				user.update({
						$pull: {
							friends: this._id
						}
					})
					.then('updated');
			});
			console.log('Done');
		})
		.catch(err => {
			console.log(err);
		});
})

module.exports = User;