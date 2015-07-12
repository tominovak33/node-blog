var db = require('../db');

var user = db.Schema({
	username: String,
	password: {type: String, select: false},
	first_name: String,
	last_name: String,
	bio: String,
	permissions: {
    	verified: { type: Boolean, default: false }, //Ability to create posts
    	editor: { type: Boolean, default: false }, //Everything listed above + ability to edit/delete other users posts
    	admin: { type: Boolean, default: false }, //Everything listed above + ability to edit/delete other users (including verification)
    	superuser: { type: Boolean, default: false } //Should be able to do anything that is possible with the system
  	}
})

module.exports = db.model('User', user);