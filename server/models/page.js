const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./post');

var pageSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	posts: [{
		type: mongoose.Schema.ObjectId,
		ref: 'post'
	}],
	owner : {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: true
	},
	img: {
		type: String,
		required: true
	},
	likes: [{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}],
	followers: [{
		type:  mongoose.Schema.ObjectId,
		ref: 'user'
	}],
	date: {
		type: Date,
		default: Date.now()
	}
});

pageSchema.pre('remove', function(next) {
	Post.find({
		_id: {
			$in: this.posts
		}
	})
		.then(posts => {
			posts.forEach(post => {
				post.remove();
			});
			next();
		})
		.catch(err => {
			console.log(err);
		});
});

var Page = mongoose.model('page', pageSchema);

module.exports = Page;
