'use strict';

let mongoose = require('mongoose');
let bcrypt   = require('bcrypt');
const secret = process.env.SECRET;

let userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  created_at: Date,
  updated_at: Date

});

userSchema.pre('save', function (next) {
  let currentUser = this;
  let now = new Date();
  currentUser.updated_at = now;
  if(!currentUser.created_at) {
    currentUser.created_at = now;
  };

  // hash password if it's been modified (or is new)
  // if (!currentUser.isModified('password')) return next();
  if (!currentUser.isModified('password')) return next()
  // generate salt
  bcrypt.genSalt(5, (err, salt) => {
    if (err) return next(err);
    // use new salt
    bcrypt.hash(secret, salt, (err, hash) => {
      if (err) return next(err);
      // replace password placeword w/ hashed one
      currentUser.password = hash;
      next();
    });
  });
});

userSchema.methods.authenticate = function(password, callback) {
  // .authenticate - a compare method that returns boolean
  // if 1st arg (once encrpted) coresponds to 2nd arg
  bcrypt.compare(secret, this.password, function(err, isMatch) {
    callback(null, isMatch);
  });
};



// EXPORTS
module.exports = mongoose.model('users', userSchema);
