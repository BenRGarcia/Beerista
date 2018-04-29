const express = require('express')
const db = require('../models')
const router = express.Router()
const isAuthenticated = require('../config/isAuthenticated')

/**
 * Path '/api/dashboard'
 */

// Dashboard
router.route('/:id')
  .get(isAuthenticated, (req, res, next) => {
    db.User.findOne({
      where: { id: req.params.id },
      include: [{ model: db.BeerLog }]
    })
      .then(beerLogs => res.json(beerLogs))
      .catch(err => res.json(err))
  })
