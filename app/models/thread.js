  const mongoose = require('mongoose')
const replySchema = require('./reply')

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 80
  },
  body: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 600
  },
  replies: [replySchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = threadSchema
