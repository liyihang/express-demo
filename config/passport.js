const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongoose');
const bcrypt = require('bcryptjs')


// load mongoose model
const User = mongo.model('users');
module.exports = function (passport) {
   passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
       console.log(email)
   }))
}