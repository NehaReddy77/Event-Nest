const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: {
    type: Date,
    /*get: function (val) {
      // `val` is the raw value from the database
      return val.toISOString().split('T')[0]; // Only return the date part (YYYY-MM-DD)
    },*/
    required: true
  },
  formatted_address: { type:String},
  latitude: { type:Number},
  longitude: { type:Number},
});

module.exports = mongoose.model('Event', eventSchema);
