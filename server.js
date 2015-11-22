'use strict';

// ==========================
// dependencies
// ==========================

let express     = require('express');
let path        = require('path');
let bodyParser  = require('body-parser');
let logger      = require('morgan');
let jade        = require('jade');
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

// view engine for rendering jade files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public'))); // require index.html in public folder


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


app.get('/', (req, res) => {
  res.render('sports/index.jade');
})
// app.use('/', router);

app.get('/about', (req, res) => {
  res.render('information/about.jade');
});

app.get('/contact', (req, res) => {
  res.render('information/contact.jade');
});

app.get('/users/signup', (req, res) => {
  res.render('users/signup.jade');
});

app.get('/users/login', (req, res) => {
  res.render('users/login.jade');
});



// // user show
// app.get('/users/:id', (req, res) => {
//   // let user_id = req.params.id;
//   // find user
//   res.render('users/show.jade');
// });

// // user edit
// app.post('/users/:id/edit', (req, res) => {
//   // let user_id = req.params.id;
//   // find user
//   res.render('users/edit.jade');
// });

app.get('/sports/1', (req, res) =>{
  res.render('sports/show.jade');
});


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
