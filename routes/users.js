'use strict';

let express = require('express');
let path    = require('path');
let router  = express.Router();

// routes
router.get('/signup', (req, res, next) => {
  res.render('users/signup.jade');
});

router.get('/login', (req, res, next) => {
  res.render('users/login.jade');
});

// user show - change to json in future
router.get('/1', (req, res, next) => {
  // let user_id = req.params.id;
  // find user
  res.render('users/show.jade');
});

// user edit - change to json in future 
router.put('/1', (req, res, next) => {
  // let user_id = req.params.id;
  // find user
  res.send('Hello');
});


module.exports = router;
