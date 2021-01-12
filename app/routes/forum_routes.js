const express = require('express')
const router = express.Router()

const Subforum = require('./../models/subforum')

const passport = require('passport')
const errors = require('./../../lib/custom_errors')

// Errors
const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

const requireToken = passport.authenticate('bearer', { session: false })

// Create subforum
router.post('/subforum', requireToken, (req, res, next) => {
  const sub = req.body.subforum
  sub.owner = req.user._id

  Subforum.create(sub)
    .then(subforum => res.status(201).json({ subforum: subforum.toObject() }))
    .catch(next)
})

// Get subforums
router.get('/subforum', requireToken, (req, res, next) => {
  Subforum.find()
    .then(subforums => res.status(200).json({ subforums: subforums.map(subforum => subforum.toObject()) }))
    .catch(next)
})
module.exports = router
