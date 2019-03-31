const jwt = require('jsonwebtoken');
const User = require('../models/user');
 
module.exports = (req, res, next) => {
  var token = req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(400)
    .json({
      success: false,
      message: 'Token not found'
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(400)
        .json({
          success: false,
          message: 'Invalid token',
        });
      } else {
        User.findById(user.id)
        .then((user) => {
          if (!user) {
            res.status(400)
            .json({
              success: false,
              message: 'User not found'
            });
          }
          req.user = user;
          next();
        });
      }
    });
  }
}
