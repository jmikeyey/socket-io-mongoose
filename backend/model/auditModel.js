const mongoose = require('mongoose')

const auditSchema = mongoose.Schema({
  trailId: {
    text: String,
    required: [true, 'Please add a trial id connection']
  },
  trailFrom: {
    text: String,
    required: [true, 'Please add directory']
  }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Audit', auditSchema)