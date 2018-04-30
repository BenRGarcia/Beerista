const express = require('express')
const db = require('../models')
const router = express.Router()
const isAuthenticated = require('../config/isAuthenticated')
const request = require('request')
const untappdAPI = `https://api.untappd.com/v4`
const untappedAuth = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`

// Middleware to call 'Untappd' API for breweries
const fetchBreweries = (req, res, next) => {
  // Normalize user input
  const brewery = req.body.brewery.trim().replace(/\s+/g, '+')
  // Compose query for API request
  const untappdEndpoint = `/search/${brewery}`
  const query = `${untappdAPI}${untappdEndpoint}?${untappedAuth}`
  try {
    // Make API call
    request(query, (err, response, body) => {
      if (err) throw err
      next(JSON.parse(body))
    })
  } catch (err) {
    next(err)
  }
}

// Middleware to call 'Untappd' API for brews
const fetchBrews = (req, res, next) => {
  // Normalize user input
  const brewery = req.body.brewery.trim().replace(/\s+/g, '+').concat('+') || ''
  const brew = req.body.brew.trim().replace(/\s+/g, '+')
  // Compose query for API request
  const untappdEndpoint = `/search/${brewery}${brew}`
  const query = `${untappdAPI}${untappdEndpoint}?${untappedAuth}`
  try {
    // Make API call
    request(query, (err, response, body) => {
      if (err) throw err
      next(JSON.parse(body))
    })
  } catch (err) {
    next(err)
  }
}

// Middleware to call 'Untappd' API for one specific brewery
const fetchBrewery = (req, res, next) => {

}

// Middleware to call 'Untappd' API for one specific brew
const fetchBrew = (req, res, next) => {

}

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
