var db = require('../db');

var user = db.Schema({
	username: String,
	password: {type: String, select: false},
	first_name: String,
	last_name: String,
	bio: String
})

module.exports = db.model('User', user);