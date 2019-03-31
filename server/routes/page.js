//LOADING MODELS
const User = require('../models/user');
const Page = require('../models/page');


//LOADING DEPENDENCIES
const express = require('express');
const router = express.Router();


//LOADING MIDDLEWARES
const authenticate = require('../helpers/authenticate');
const isOwner = require('../helpers/isOwner').isPageOwner;


/*************************************************
                  ROUTES
*************************************************/


//FETCHING ALL PAGES
router.get('/', (req, res) => {
    Page.find({})
      .limit(Number(req.query.count))
      .then(pages => {
        res.status(200)
          .json(pages);
      })
      .catch(err => {
        console.log(err);
        res.status(500)
          .send();
      });
});


//FETCHING PAGES CREATED AND FOLLOWED BY USER
router.get('/my-pages', authenticate, (req, res) => {
  let response = {};
  Page.find({
    owner: req.user._id
  })
    .sort({date:-1})
    .then(createdPages => {
      console.log(createdPages);
      response.createdPages = createdPages;
      return Page.find({
        $and: [
          {_id: {$in: req.user.pages}},
          {owner: {$ne: req.user._id}}
        ]
      })
      .limit(Number(req.query.count))
      .sort({date:-1});
    })
    .then(followedPages => {
      response.followedPages = followedPages;
      res.status(200)
        .json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//FETCHING PAGE SUGGESTIONS FOR THE USER
router.get('/suggestions', authenticate, (req, res) => {
  let suggestedPages = [];
  User.find({
    _id: {
      $in: req.user.friends
    }
  })
    .then(friends => {
      friends.forEach(friend => {
        suggestedPages = suggestedPages.concat(friend.pages);
      });
      return Page.find({
        _id: {
          $in: suggestedPages
        }
      })
        .limit(Number(req.query.count));
    })
    .then(pages => {
      res.status(200)
        .json(pages);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//FETCHING PAGE INFO
router.get('/:id', authenticate, (req, res) => {
  let response = {};
  Page.findById(req.params.id)
    .then(page => {
      response = page._doc;
      response.following = !(page.followers.indexOf(req.user._id) === -1);
      response.liked = !(page.likes.indexOf(req.user._id) === -1);
      res.status(200)
        .json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//FETCHING PAGE FOLLOWERS
router.get('/followers/:id', authenticate, (req, res) => {
  Page.findById(req.params.id)
    .then(page => {

      if (!page) {
        return res.status(400)
          .send();
      }

      return User.find({
        _id: {
          $in: page.followers
        }
      })
        .limit(Number(req.query.count));
    })
    .then(followers => {
      res.status(200)
        .json(followers);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//LIKING A PAGE
router.put('/like/:id', authenticate, (req, res) => {
  let query = {};
  Page.findById(req.params.id)
    .then(page => {
      if (page.likes.indexOf(req.user._id) !== -1) {
        query = {
          $pull: {
            likes: req.user._id
          }
        }
      } else {
        query = {
          $push: {
            likes: req.user._id
          }
        }
      }
      return page.update(query);
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


//CREATING NEW PAGE
router.post('/', authenticate, (req, res) => {
    let savedPage = null;
    if (!req.body.title || !req.body.description) {
    res.status(400)
      .send();
    }

    new Page({
      ...req.body,
      owner: req.user._id
    })
    .save()
    .then(page => {
      savedPage = page;
      return page.update({
        $push: {
          followers: req.user._id
        }
      });
    })
    .then(() => {
      return req.user.update({
        $push: {
          pages: savedPage._id
        }
      });
    })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json(err);
    });
});


//DELETING A PAGE WITH PAGE ID
router.delete('/:id', authenticate, isOwner, (req, res) => {
  let pageToBeDeleted = null;
  Page.findById(req.params.id)
    .then(page => {
      pageToBeDeleted = page;
      return User.update({
        _id: {
          $in: page.followers
        }
      }, {
        $pull: {
          pages: page._id
        }
      }, {
        multi: true
      });
    })
    .then(() => {
      return pageToBeDeleted.remove();
    })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});


//UPDATING PAGE DETAILS
router.put('/:id', authenticate, isOwner, (req, res) => {
    Page.findByIdAndUpdate(req.params.id, req.body)
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


//FOLLOWING A PAGE
router.put('/follow/:id', authenticate, (req, res) => {
    let query = null;
    let following = false;
    let currentPage = null;

    Page.findById(req.params.id)
      .then(page => {
        currentPage = page;
        following = !(req.user.pages.indexOf(page._id) === -1);

        if (following) {
          query = {
            $pull: {
              followers: req.user._id
            }
          }
        } else {
          query = {
            $push: {
              followers: req.user._id
            }
          }
        }

        return page.update(query);
      })
      .then((page) => {
        if (following) {
          query = {
            $pull: {
              pages: currentPage._id
            }
          }
        } else {
          query = {
            $push: {
              pages: currentPage._id
            }
          }
        }

        return req.user.update(query);
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

module.exports = router;
