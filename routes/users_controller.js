'use strict';

let express   = require('express');
let mongoose  = require('mongoose');
let User      = require('../models/users.js');
let router    = express.Router();


// index routes
router.get('/', (req, res, next) =>{
  User.find({}, (err, users) => {
    res.json(users);
  });
});

//user signup page
router.get('/signup', (req, res, next) => {
  res.render('users/signup.jade');
});

//create a user
router.post('/', (req, res) => {

  let newUser = new User({
    username: req.body.username,
    email:    req.body.email,
    password: req.body.password
  });

  newUser.save((err) => {
    if(err) throw err;

    console.log('User was successfully created.');
    res.status(200).json({
      success: true,
      message: 'User was successfully created.'
    });
  });
});

let userAuth = (req, res) => {
  let userInfo = req.body.user;
  // validation for undefined email or password
  if (userInfo.email == undefined || userInfo.password == undefined) {
    return res.status(401).send({ message: 'Credentials are incorrect'});

    User.findOne({ email: userInfo.email }, (err, user) => {
      console.log(user);
      user.authenticate(userInfo.password, (err, isMatch) => {
        if (err) throw err;
      }); // check if password match generated a token
    });
  }
};

// user login - note; add session + bcrypt[tokens]
router.post('/login', userAuth, (req, res, next) => {
  // res.render('users/login.jade');

  let userInfo = {
    email: req.body.email,
    password: req.body.password
  };
  User.findOne({ email: userInfo.email }, (err, user) => {
    user.authenticate(userInfo.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return res.status(200).send({ message: 'authorized'});
      } else {
        return res.status(401).send({ message: 'unauthorized'});
      }
    });
  });
  // res.json(userInfo);
});

// user show
router.get('/:id', (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
      if(err) throw err;

      res.json(user);
    });

});

// user edit
router.put('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if(err) throw err;

    if(req.body.username) user.username = req.body.username;
    if(req.body.email) user.email = req.body.email;
    if(req.body.password) user.password = req.body.password;

    user.save((err) => {
      if(err) throw err;

      console.log('User was successfully updated.');
      res.json({
        success: true,
        message: 'User was successfully updated.'
      });
    });
  });
});

// delete an user
router.delete('/:id', (req, res) => {
  User.remove({ _id: req.params.id }, (err, user) => {
    if(err) throw err;

    res.json({
      success: true,
      message: 'User was successfully deleted.'
    })
  })
})





module.exports = router;
