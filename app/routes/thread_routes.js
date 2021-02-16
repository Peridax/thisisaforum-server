const express = require('express')
const router = express.Router()

const Subforum = require('./../models/subforum')

const passport = require('passport')
const errors = require('./../../lib/custom_errors')

const requireToken = passport.authenticate('bearer', { session: false })

// Create thread
router.post('/subforum/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  const thread = req.body.thread
  const owner = req.user._id

  Subforum.findById(id)
    .then(errors.handle404)
    .then(sub => {
      thread.owner = owner

      sub.threads.push(thread)
      return sub.save()
    })
    .then(subforum => res.status(201).json({ subforum }))
    .catch(next)
})

// Get thread
router.get('/thread/:id', requireToken, (req, res, next) => {
  const threadID = req.params.id
  const subforumID = req.query.subforum
  console.log(subforumID)

  Subforum.findById(subforumID)
    .populate('threads.owner')
    .then(errors.handle404)
    .then(subforum => {
      const thread = subforum.threads.find(thread => thread._id.toString() === threadID)

      if (thread) {
        return thread
      } else {
        throw new errors.BadParamsError()
      }
    })
    .then(thread => res.status(200).json({ thread }))
    .catch(next)
})

// Delete thread
router.delete('/thread/:id', requireToken, (req, res, next) => {
  const threadID = req.params.id
  const subforumID = req.body.id
  console.log(subforumID)

  Subforum.findById(subforumID)
    .populate('threads.owner', 'email')
    .then(errors.handle404)
    .then(subforum => {
      const threadIndex = subforum.threads.findIndex(thread => thread._id.toString() === threadID)

      if (threadIndex > -1) {
        subforum.threads.splice(threadIndex, 1)
        return subforum.save()
      } else {
        throw new errors.BadParamsError()
      }
    })
    .then(subforum => res.status(200).json({ subforum }))
    .catch(next)
})

module.exports = router
