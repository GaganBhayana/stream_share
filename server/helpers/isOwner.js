//LOADING MODELS
const Post = require('../models/post');
const Comment = require('../models/comment');
const Group = require('../models/group');
const Page = require('../models/page');


/*******************************************************
                    MIDDLEWARE
*******************************************************/

module.exports.isPostOwner = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post && post.owner.equals(req.user._id)) {
        next();
      } else {
        res.status(400)
          .send();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
};
 
module.exports.isCommentOwner = (req, res, next) => {
  Comment.findById(req.params.id)
    .then(comment => {
      if (comment && comment.owner.equals(req.user._id)) {
        next();
      } else {
        res.status(400)
          .send();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
};

module.exports.isGroupOwner = (req, res, next) => {
  Group.findById(req.params.id)
    .then(group => {
      if (group && group.owner.equals(req.user._id)) {
        next();
      } else {
        res.status(400)
          .send();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
};

module.exports.isPageOwner = (req, res, next) => {
  Page.findById(req.params.id)
    .then(page => {
      if (page && page.owner.equals(req.user._id)) {
        next();
      } else {
        res.status(400)
          .send();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
};