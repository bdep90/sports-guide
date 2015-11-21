'use strict';

// ==========================
// dependencies
// ==========================

let express     = require('express');
let path        = require('path');
let bodyParser  = require('body-parser');
let logger      = require('morgan');
let app         = express();


// model exports
let User        = require('./models/users');
let Sport       = require('./models/sports');


// ==========================
// db config
// ==========================

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sportsDB');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  console.log('mongoose connected');
});


// ==========================
// root routes
// ==========================

app.use(express.static(path.join(__dirname, 'public'))); // require index.html in public folder

app.get('/', (req, res) => {
  res.send('Got it!');
})
// app.use('/', router);

app.get('/about', (req, res) => {
  res.redirect('/about.html');
});

app.get('/contact', (req, res) => {
  res.redirect('/contact.html');
});

app.get('/users/signup', (req, res) => {
  res.redirect('/users/signup.html');
});

app.get('/users/login', (req, res) => {
  res.redirect('/users/login.html');
});

// // user show
// app.get('/users/:id', (req, res) => {
//   // let user_id = req.params.id;
//   // find user
//   res.redirect('/users/show.html');
// });

// // user edit
// app.post('/users/:id/edit', (req, res) => {
//   // let user_id = req.params.id;
//   // find user
//   res.redirect('/users/edit.html');
// });


// ==========================
// users routes
// ==========================
let router = express.Router();

// user route
// user index
router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  })
});

// create a user
router.post('/users', (req, res) => {
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

// show a user
router.get('/users/:id', (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if(err) throw err;

    res.json(user);
  });
});

// update the info for an user
router.put('/users/:id', (req, res) => {
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
router.delete('/users/:id', (req, res) => {
  User.remove({ _id: req.params.id }, (err, user) => {
    if(err) throw err;

    res.json({
      success: true,
      message: 'User was successfully deleted.'
    })
  })
})

// ==========================
// users routes
// ==========================

// sports index route
router.get('/sports', (req, res) =>{
  Sport.find({}, (err, sports) => {
    if(err) throw err;
    res.json(sports);
  });
})

//sports show route
router.get('/sports/:id', (req, res) =>{
  Sport.find({ _id: req.params.id}, (err, sport) => {
    if(err) throw err;

    res.json(sport);
  });
});








// ==========================
// server
// ==========================
let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('started');
});
