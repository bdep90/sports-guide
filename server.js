'use strict';

// ==========================
// dependencies
// ==========================

let express     = require('express');
let path        = require('path');
let logger      = require('morgan');
let bodyParser  = require('body-parser');
let jade        = require('jade');
let nodemailer  = require('nodemailer');
let expressJWT  = require('express-jwt');
let app         = express();

const secret     = process.env.SECRET;

// ==========================
// model modules
// ==========================

let User        = require('./models/users');
let Sport       = require('./models/sports');


// ==========================
// parser config
// ==========================

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// ==========================
// path config
// ==========================

// view engine for rendering jade files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public'))); // require index.html in public folder


// ==========================
// db config
// ==========================

let mongoose      = require('mongoose');
mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost/sportsDB');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  console.log('mongoose connected');
});


// ==========================
// root routes
// ==========================

app.get('/', (req, res) => {
  res.render('index.jade');
});

// app.get('/about', (req, res) => {
//   res.render('information/about.jade');
// });
//
// app.get('/contact', (req, res) => {
//   res.render('information/contact.jade');
// });


// ==========================
// other routes
// ==========================

let usersRoute    = require('./routes/users_controller');
let sportsRoute   = require('./routes/sports_controller');
let contactRoute  = require('./routes/contact_controller')

// app.use('/users/authenticate', expressJWT({ secret: secret,
// userProperty: 'auth' }));
// app.use((error, req, res, next) => { //edit err msg
//   if (error.name === 'UnauthorizedError') {
//     res.status(401)
//     .json({ message: 'You need an Auth token!' });
//   }
// });
app.use('/users', usersRoute);
app.use('/sports', sportsRoute);
app.use('/contact', contactRoute);


// ==========================
// server
// ==========================
let server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('started');
});
