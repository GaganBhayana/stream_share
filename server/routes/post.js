//LOADING MODELS
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const Group = require('../models/group');
const Page = require('../models/page');


//LOADING DEPENDENCIES
const express = require('express');
const router = express.Router();


//LOADING MIDDLEWARES
const authenticate = require('../helpers/authenticate');
const isOwner = require('../helpers/isOwner').isPostOwner;


//MOUNTING COMMENT ROUTE
const comment = require('./comment');
router.use('/comment', comment);



/**********************************************************
                      ROUTES
**********************************************************/

//FETCHING ALL POSTS FOR A USER, PAGE, OR GROUP
router.get('/', authenticate, (req, res) => {
  let friends = req.user.friends;
  friends.push(req.user._id);

  let query = {};

  if (req.query.parent) {
    query = {
      parent: req.query.parent
    }
  } else if(req.query.id) {
    query = {
      $and: [
        {owner: req.query.id},
        {role: 'normal'}
      ]
    }
  } else {
    query = {
      $or: [
        {
          $and:[
            {owner: {$in: friends}},
            {role: 'normal'}
          ]
        },
        {parent: {$in: req.user.pages}},
        {parent: {$in: req.user.groups}}
      ]
    }
  }

  Post.find(query)
    .sort({
      date: -1
    })
    .limit(Number(req.query.count))
    .then(posts => {
      res.status(200)
        .json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//FETCHING POSTS POSTED BY USER
router.get('/my-posts', authenticate, (req, res) => {
  Post.find({
    owner: req.user._id
  })
    .sort({
      date: -1
    })
    .limit(Number(req.query.count))
    .then(posts => {
      res.status(200)
        .json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//FETCHING A PARTICULAR POST
router.get('/:id', authenticate, (req, res) => {
  let post = {};

  Post.findById(req.params.id)
    .then(fetchedPost => {

      if (!fetchedPost) {
        return res.status(400)
          .send();
      }

      post = {...fetchedPost._doc};
      post.liked = !(post.likes.indexOf(req.user._id) === -1);
      return Comment.find({
        _id: {
          $in: fetchedPost.comments
        }
      })
        .sort({date: -1})
        .limit(Number(req.query.count));
    })
    .then(comments => {
      post.comments = comments;
      return User.findById(post.owner);
    })
    .then(owner => {
      post.owner = {
        name: owner.name,
        _id: owner._id,
        img: owner.img,
      };
      res.status(200)
        .json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//LIKING A POST
router.put('/like/:id', authenticate, (req, res) => {
  let query = {};

  Post.findById(req.params.id)
    .then(post => {

      if (post.likes.indexOf(req.user._id) !== -1) {
        query = {
          $pull: {
            likes: req.user._id
          }
        };
      } else {
        query = {
          $push: {
            likes: req.user._id
          }
        };
      }

      return post.update(query);
    })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//POSTING A POST
router.post('/', authenticate, (req, res) => {
  let post = {};
  post.title = req.body.title;
  post.content = req.body.content;
  post.img = req.body.img;
  post.owner = req.user._id;
  post.role = req.query.role || 'normal';
  post.parent = req.query.parent;
  post.ownerName = req.user.name;
  post.ownerImg = req.user.img;

  let savedPost = null;

  new Post(post)
    .save()
    .then(post => {
      savedPost = post;
      return req.user.update({
        $push: {
          posts: post._id
        }
      });
    })
    .then(() => {
      let query = {
        $push: {
          posts: savedPost._id
        }
      };

      if (savedPost.role === 'group') {
        return Group.findByIdAndUpdate(req.query.parent, query);
      } else if(savedPost.role === 'page'){
        return Page.findByIdAndUpdate(req.query.parent, query);
      } else {
        return;
      }
    })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//DELETING A POST
router.delete('/:id', authenticate, isOwner, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      return post.remove();
    })
    .then(post => {
      return req.user.update({
        $pull:{
          posts: post._id
        }
      });
    })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//UPDATING A POST
router.put('/:id', authenticate, isOwner, (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});

module.exports = router;
