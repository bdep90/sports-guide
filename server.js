'use strict';

let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let logger = require('morgan');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sports');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  console.log('mongoose connected');
});

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('started');
});
