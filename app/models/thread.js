const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 60
  },
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

module.exports = threadSchema
