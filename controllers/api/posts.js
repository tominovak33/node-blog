var Post = require('../../models/post');
var router = require('express').Router();
var websocket = require('../../websockets');
var mongoose = require('mongoose');


//No need fo /api/posts part of route as 
//app.use('/api/posts', require('./controllers/api/posts.js'));
//in server.js includes that part
router.get('/', function (request, response, next) {

	var post_param = get_query_post_param(request._parsedUrl.query);

	post_param.deleted = false;
	console.log(post_param);

	Post.find(post_param)
	.sort('-date')
	.populate('_author')
	.exec(function (error, posts) {
		if (error) {
			return next(error);
		}
		response.status(200);
		response.json(posts);
	})
})

//No need fo /api/posts part of route as 
//app.use('/api/posts', require('./controllers/api/posts.js'));
//in server.js includes that part
router.post('/', function (request, response, next) {
	var post = new Post({
		body: request.body.body,
		title: request.body.title,
		slug: request.body.slug,
		tags: request.body.tags,
		_author: request.auth.user_id,   // assign the _id from the person
		post_username: request.auth.username
	});
		
	post.save(function (error, post) {
		//Post.find({ "_id": ObjectId("123456789101112131415") })
		Post.find({ "_id": post._id })
		.populate('_author')
		.exec(function (error, post) {
			if (error) {
				return next(error);
			}
		//console.log(post);
		websocket.broadcast('new_post', post);
		response.status(201);
		response.json(post);
		})
	});
});


router.post('/removeItem', function (request, response, next) {
	console.log("trying to remove item");
	var _authorID = request.auth.user_id;
	var itemID = request.body.params.post_id;

	Post.update({_id: itemID, _author:_authorID}, {'deleted': true}, {upsert: true}, function(error){
		if(error) {
			return (error);
		}
		Post.findOne({_id: itemID}, function (error, post) {
			response.json(post);
		})
	});

	//Post.find({
	//		_id:itemID,
	//		_author:_authorID
	//	})
	//	.remove(function(error, result) {
	//		if (error) {
	//			response.status(501);
	//			return next(error);
	//		}
	//		response.status(201);
	//		response.json(result);
	//	});
});

var get_query_post_param = function(query_string){
	if (!query_string) {
		return {};
	}
	var queries = query_string.split("&");

	for (var item in queries) {
		var query = queries[item];
		var query_parts = query.split("=");

		var name = query_parts[0];
		var value = query_parts[1];

		value = decodeURIComponent(value);

		if (name == 'post_slug') {
			return { "slug":  value };
		}

		if (name == '_author') {
			return { "_author":  value };
		}

		if (name == 'post_id') {
			return { "_id":  value };
		}		
	}

	return {};
};

var build_post_query = function(post_slug){

	return { "slug":  post_slug };
};



module.exports = router;