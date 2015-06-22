var db = require('../db');

var Post = db.model('Post', {
	_author : { type: Number, ref: 'User' },
	body: {type: String, required: true },
	date: {type: Date, required: true, default: Date.now },
});

module.exports = Post;