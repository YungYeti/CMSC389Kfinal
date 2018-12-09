var mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      year: {
          type: Number,
          min: 0,
          max: 2018,
          required: true
      },
      artist: {
          type: String,
          required: true
      },
      album: {
          type: String,
          required: true
      },
      features: {
          type: [String],
          required: false
      }
});

var Song = mongoose.model('Song',songSchema);

module.exports = Song;