const express = require('express')
const db = require('../models')
const passport = require('../config/passport')
const router = express.Router()

/**
 * Path '/api/users'
 */

// User sign up
router.route('/signup')
  .post((req, res, next) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password
    }
    db.User.create(newUser)
      .then(() => res.redirect(307, '/api/users/login'))
      .catch(err => res.json(err))
  })

// User sign in
router.route('/login')
  .post(passport.authenticate('local'), (req, res, next) => {
    res.json('/dashboard')
  })

// User sign out
router.route('/logout')
  .get((req, res, next) => {
    req.logout()
    res.redirect('/')
  })

// User data
router.route('/data')
  .get((req, res, next) => {
    if (!req.user) res.json({})
    else res.json({ email: req.user.email, id: req.user.id })
  })

module.exports = router
