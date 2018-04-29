const express = require('express')
const isAuthenticated = require('../config/isAuthenticated')
const router = express.Router()

// Home page
router.route('/')
  .get((req, res, next) => res.render('index'))

// Sign in/Sign up
router.route('/login')
  .get((req, res, next) => {
    if (req.user) res.redirect('/dashboard')
    res.render('signupLogin')
  })

// Dashboard
router.route('/dashboard')
  .get(isAuthenticated, (req, res, next) => res.render('dashboard'))

// Beer log
router.route('/beerlog')
  .get(isAuthenticated, (req, res, next) => res.render('beerLog'))

// Beer discovery
router.route('/discovery')
  .get(isAuthenticated, (req, res, next) => res.render('discovery'))

// Social beer log
router.route('/social')
  .get(isAuthenticated, (req, res, next) => res.render('social'))
