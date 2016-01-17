var db = require('../db');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = db.model('Post', {
	_author : { type:  Schema.Types.ObjectId, ref: 'User' },
	body: {type: String, required: true },
	title: {type: String, required: true, default:'Untitled' },
	slug: {type: String},
	//tags: {type: String},
    tags:   [String],
	date: {type: Date, required: true, default: Date.now },
	deleted: {type: Boolean, required: true, default:0 }
});

module.exports = Post;