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

  Promise.resolve(sub)
    .then(data => {
      if (!data) {
        throw new BadParamsError()
      }
      return sub
    })
    .then(subforum => Subforum.create(subforum))
    .then(errors.handle404)
    .then(subforum => res.status(201).json({ subforum: subforum.toObject() }))
    .catch(next)
})

// Update subforum
router.patch('/subforum/:id', requireToken, (req, res, next) => {
  const title = req.body.subforum.title
  const id = req.params.id

  Subforum.findById(id)
    .then(errors.handle404)
    .then(subforum => {
      subforum.title = title
      return subforum.save()
    })
    .then(subforum => res.status(201).json({ subforum: subforum.toObject() }))
    .catch(next)
})

// Delete subforum
router.delete('/subforum/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Subforum.findById(id)
    .then(errors.handle404)
    .then(subforum => subforum.delete())
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Get subforums
router.get('/subforum', requireToken, (req, res, next) => {
  Subforum.find()
    .then(subforums => res.status(200).json({ subforums: subforums.map(subforum => subforum.toObject()) }))
    .catch(next)
})
module.exports = router
