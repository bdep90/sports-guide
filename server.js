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
});


app.get('/about', (req, res) => {
  res.render('information/about.jade');
});

app.get('/contact', (req, res) => {
  res.render('information/contact.jade');
});



// ==========================
// other routes
// ==========================
let usersRoute = require('./routes/users.js');
let sportsRoute = require('./routes/sports.js');

app.use('/users', usersRoute);
app.use('/sports', sportsRoute);




// ==========================
// server
// ==========================
let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('started');
});
