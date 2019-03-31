const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
	content:{
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	likes:[{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}],
	comments:[{
		type: mongoose.Schema.ObjectId,
		ref: 'comment'
	}],
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	parent: {
		type: mongoose.Schema.ObjectId,
		required: true
	}
});

var Comment = mongoose.model('comment', commentSchema);



commentSchema.pre('remove', function(next) {
	Comment.findByIdAndUpdate(this.parent, {
		$pull: {
			comments: this._id
		}
	}).then(() => {
			return Comment.remove({
				_id: {
					$in: this.comments
				}
			});
		})
		.then(() => {
			next();
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = Comment;
