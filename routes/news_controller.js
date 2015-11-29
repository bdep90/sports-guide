'use strict';

let express   = require('express');
// let mongoose  = require('mongoose');
// let request   = require('request');
let Twitter   = require('twitter');
let fs        = require('fs');
let mongojs   = require('mongojs');
let router    = express.Router();

const TWITKEY = process.env.TWITKEY;
const TWITSECRET = process.env.TWITSECRET;
const TWITTOKEN = process.env.TWITTOKEN;
const TWITTOKENSECRET = process.env.TWITTOKENSECRET;

// ///////// config
let connectionString  = process.env.MONGO_URL ? process.env.MONGO_URL + '/tweets' : 'tweets';
let collectionName    = 'SoccerTweets';
let hashtag           = '#Soccer';

let db = mongojs(connectionString, [collectionName]);

let client = new Twitter({
    consumer_key: TWITKEY,
    consumer_secret: TWITSECRET,
    access_token_key: TWITTOKEN,
    access_token_secret: TWITTOKENSECRET
});

client.get('/search/tweets', {q: 'soccer', count: 10}, function(error, tweets, response){
  if (error) throw error;
  db.SoccerTweets.insert(tweets);
});

router.get('/tweets', (req, res, next) => {
  db.SoccerTweets.find().sort( { created_at: -1 }, (err, tweets) => {
    res.send(tweets);
  });
});




module.exports = router;
