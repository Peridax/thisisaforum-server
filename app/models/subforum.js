const mongoose = require('mongoose')
const thread = require('./thread')

const subforumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  threads: [thread],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toObject: {
    transform: (_doc, subforum) => {
      subforum.threadsLength = subforum.threads.length

      delete subforum.threads
      return subforum
    }
  }
})

module.exports = mongoose.model('Subforum', subforumSchema)
