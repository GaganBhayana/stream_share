//LOADING DEPENDENCIES
const express = require('express');
const router = express.Router();
const authenticate = require('../helpers/authenticate');

//LOADING MODELS
const User = require('../models/user');
const Post = require('../models/user');
const Group = require('../models/user');
const Page = require('../models/user');


/************************************************
                    ROUTES
************************************************/

router.get('/:query', authenticate, (req, res) => {
  let response = {};
  let query = new RegExp(req.params.query, 'i');
  let count = Number(req.query.count);

  User.find({
    name: query
  })
    .limit(count)
    .then(users => {
      console.log(users);
      response.users = users;
      return Post.find({
        title: query
      })
        .limit(count);
    })
    .then(posts => {
      response.posts = posts;
      return Page.find({
        title: query
      })
        .limit(count);
    })
    .then(pages => {
      response.pages = pages;
      return Group.find({
        title: query
      })
        .limit(count);
    })
    .then(groups => {
      response.groups = groups;
      res.status(200)
        .json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


module.exports = router;
