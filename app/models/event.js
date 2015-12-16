// app/models/event.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our event model
var eventSchema = mongoose.Schema({
    title        : String,
    content      : String,
    date         : Number,
	timestamp    : Number,
    userid       : String,
    // Fetched from FB first. Users are allowed to set their own names later.
    username     : String,
    tag          : Array
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Event', eventSchema);
