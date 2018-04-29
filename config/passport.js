const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')

// Add local strategy to Passport
passport.use(new LocalStrategy((username, password, done) => {
  // Find user by username
  db.User.findOne({ username }, (err, user) => {
    // If err
    if (err) return done(err)
    // If user not found
    if (!user) return done(null, false)
    // If user found but no password match
    if (!user.verifyPassword(password)) return done(null, false)
    // User is authenticated
    return done(null, user)
  })
}))

passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

module.exports = passport
