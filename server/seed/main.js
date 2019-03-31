const User = require('../models/user');
const Post = require('../models/post');
const Group = require('../models/group');

const Comment = require('../models/comment');

const users = require('./user.json').users;
const posts = require('./post.json').posts;
const groups = require('./group.json').groups;
// const comments = require('./comment.json').comments;

// users.forEach(user => {
//     new User(user).save();
// });
// User.remove({});
// users.forEach(user => {
//   new User(user)
//     .save()
//     .then(() => {
//       console.log('Saved');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
//
// Post.remove({})
//   .then(() => {
//     console.log('Success');
//   });


// posts.forEach(post => {
//   new Post(post)
//     .save()
//     .then(() => {
//       console.log('Saved');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
// // 
// groups.forEach(group => {
//   // console.log(group);
//   let x = new Group(group)
//   prom = x.save()
//     .then(() => {
//       console.log('Saved');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// comments.forEach(comment => {
//   new Comment(comment)
//     .save()
//     .then(() => {
//       console.log('Saved');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });