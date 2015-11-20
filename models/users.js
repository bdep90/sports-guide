'use strict';

let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  created_at: Date,
  updated_at: Date

})

userSchema.pre('save', (next) => {
  let now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
})




// EXPORTS
module.exports = mongoose.model('users', userSchema);
