//LOADING MODELS
const User = require('../models/user');
const Group = require('../models/group');
const Post = require('../models/post');
const Review = require('../models/review');


//LOADING DEPENDENCIES
const express = require('express');
const router = express.Router();


//LOADING MIDDLEWARES
const authenticate = require('../helpers/authenticate');
const isOwner = require('../helpers/isOwner').isGroupOwner;


/**************************************************
                    ROUTES
**************************************************/

router.get('/search', authenticate, (req, res) => {

  shows = req.query.shows.toLowerCase().split(',');

  shows = shows.map(show => show.trim());

  num = Math.min(shows.length, Math.floor(Math.random() * 5));

  const SERVICES = [
    'Amazon Prime Video',
    'Netflix',
    'Hulu',
    'Hotstar',
    'Sony Liv',
    'HBO',
    'EROS Now',
    'Vevo',
    'Twitch'
  ]

  let services = new Set();

  // for (i = 0; i < 1+num; i++) {
  //   services.add(SERVICES[Math.floor(Math.random() * SERVICES.length)])
  // }

  if(shows.indexOf('netflix') !== -1){
    services.add('Netflix');
  }
  if(shows.indexOf('hulu') !== -1){
    services.add('Hulu');
  }
  if(shows.indexOf('Amazon') !== -1 || shows.indexOf('Amazon Prime') !== -1){
    services.add('Amazon Prime');
  }
  if(shows.indexOf('hbo') !== -1){
    services.add('HBO');
  }

  if(shows.indexOf('sacred games') !== -1 || shows.indexOf('stranger things') !== -1 || shows.indexOf('narcos') !== -1){
    services.add("Netflix");
  }

  if(shows.indexOf('mirzapur') !== -1 || shows.indexOf('homecoming') !== -1 || shows.indexOf('inside edge') !== -1){
    services.add("Amazon Prime");
  }

  if(shows.indexOf('the path') !== -1 || shows.indexOf('casual') !== -1 || shows.indexOf('castle rock') !== -1){
    services.add("Hulu");
  }

  if(shows.indexOf('game of thrones') !== -1){
    services.add("HBO");
  }

  services = Array.from(services)

  Group.find({})
    .then(groups => {
      sortedGroups = []

      if(services.length > 0){
        groups.forEach(group => {
          // check if group has anything common with preference
          let count = 0
          services.forEach(service => {
            if (group.preferences.indexOf(service) !== -1) {
              count++
            }
          })

          count = Math.floor(Math.random() * 5)

          if (count > 0) {
            sortedGroups.push({
              group,
              count
            })
          }
        })


        sortedGroups.sort((a, b) => {
          return b.count - a.count
        })

        sortedGroups.forEach((group, i) => {
          let grpRating = 0;
          group.group.members.forEach(member => {
            review.find({
                recipient: member
              })
              .then(reviews => {
                let userRating = 0;
                reviews.forEach(review => {
                  userRating += review.rating;
                })
                userRating /= reviews.length;
                grpRating += userRating;
              })
          })
          grpRating /= group.group.members.length;
          sortedGroups[i]['rating'] = Math.floor(Math.random() * 4);
        })
      }

      res.json({
        sortedGroups,
        services
      })
    })
});

//FETCHING ALL GROUPS
router.get('/', authenticate, (req, res) => {
  Group.find({})
    .limit(Number(req.query.count))
    .then((groups) => {
      res.status(200)
        .json(groups);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//FETCHING GROUPS CREATED AND JOINED BY USER
router.get('/my-groups', authenticate, (req, res) => {
  let response = {};
  Group.find({
      owner: req.user._id
    })
    .sort({
      date: -1
    })
    .then(createdGroups => {
      response.createdGroups = createdGroups;
      return Group.find({
          $and: [{
              _id: {
                $in: req.user.groups
              }
            },
            {
              owner: {
                $ne: req.user._id
              }
            }
          ]
        })
        .sort({
          date: -1
        })
        .limit(Number(req.query.count));
    })
    .then(joinedGroups => {
      response.joinedGroups = joinedGroups;
      res.status(200)
        .json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//FETCHING GROUP SUGGESTIONS FOR THE USER
router.get('/suggestions', authenticate, (req, res) => {
  let suggestedGroups = [];
  User.find({
      _id: {
        $in: req.user.friends
      }
    })
    .then(friends => {
      friends.forEach(friend => {
        suggestedGroups = suggestedGroups.concat(friend.groups);
      });
      return Group.find({
          _id: {
            $in: suggestedGroups
          }
        })
        .limit(Number(req.query.count));
    })
    .then(groups => {
      res.status(200)
        .json(groups);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//FETCHING DETAILS OF A GROUP
router.get('/:id', authenticate, (req, res) => {
  let response = {};
  Group.findById(req.params.id)
    .then(group => {
      response = group._doc;
      response.joined = !(group.members.indexOf(req.user._id) === -1);
      res.status(200)
        .json(response);
    })
    .catch(err => {
      res.status(500)
        .send();
    });
});


//FETCHING MEMBERS OF A GROUP
router.get('/members/:id', (req, res) => {
  Group.findById(req.params.id)
    .then(group => {
      return User.find({
        _id: {
          $in: group.members
        }
      });
    })
    .then(members => {
      res.status(200)
        .json(members);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//CREATING A NEW GROUP
router.post('/', authenticate, (req, res) => {
  if (!req.body.title) { //body: preferences
    res.status(400)
      .send();
  }

  new Group({
      title: req.body.title,
      description: req.body.description,
      img: req.body.img,
      owner: req.user._id,
      preferences: req.body.preferences.split(',').trim()
    })
    .save()
    .then(group => {
      return Group.findByIdAndUpdate(group._id, {
        $push: {
          members: req.user._id
        }
      });
    })
    .then(group => {
      return req.user.update({
        $push: {
          groups: group._id
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
        .json(err);
    });
});


//DELETING A GROUP BY ID
router.delete('/:id', authenticate, isOwner, (req, res) => {
  let groupToBeDelted = null;
  Group.findById(req.params.id)
    .then(group => {
      groupToBeDeleted = group;
      return User.update({
        _id: {
          $in: groupToBeDeleted.members
        }
      }, {
        $pull: {
          groups: groupToBeDeleted._id
        }
      }, {
        multi: true
      });
    })
    .then(() => {
      return groupToBeDeleted.remove();
    })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});


//UPDATING GROUP DETAILS
router.put('/:id', authenticate, isOwner, (req, res) => {
  Group.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});

//JOINING A GROUP
router.put('/join/:id', authenticate, (req, res) => {
  let groupId = null;
  Group.findById(req.params.id)
    .then(group => {
      groupId = group._id;
      return group.update({
        $push: {
          members: req.user._id
        }
      });
    })
    .then(() => {
      return req.user.update({
        $push: {
          groups: groupId
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
        .send(err);
    });
});


//LEAVING A GROUP
router.put('/leave/:id', authenticate, (req, res) => {
  let groupId = null;
  Group.findById(req.params.id)
    .then(group => {
      groupId = group._id;
      return group.update({
        $pull: {
          members: req.user._id
        }
      });
    })
    .then(() => {
      return req.user.update({
        $pull: {
          groups: groupId
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

// Searching group by preferences

module.exports = router;