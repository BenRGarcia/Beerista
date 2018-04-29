const express = require('express')
const db = require('../models')
const router = express.Router()

/**
 * Path '/api/dashboard'
 */

// Dashboard
router.route('/:id')
  .get((req, res, next) => {
    if (!req.user) {
      res.json({})
    } else {
      db.findOne({ where: { id: req.params.id } })
        .then()
        .catch()
    }
  })
