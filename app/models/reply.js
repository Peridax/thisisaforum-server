const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 600
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = replySchema
