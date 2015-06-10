var Post = require('../../models/post');
var router = require('express').Router();


//No need fo /api/posts part of route as 
//app.use('/api/posts', require('./controllers/api/posts.js'));
//in server.js includes that part
router.get('/', function (request, response, next) {
	Post.find()
	.sort('-date')
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
		body: request.body.body
	});
	
	post.username=request.auth.username;

	post.save(function (error, post) {
		if (error) {
			return next(error);
		}
		response.status(201);
		response.json(post);
	});
})

module.exports = router;