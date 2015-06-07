var Post = require('../../models/post');
var router = require('express').Router();



router.get('/api/posts', function (request, response, next) {
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

router.post('/api/posts', function (request, response, next) {
	var post = new Post({
		username: request.body.username,
		body: request.body.body
	});
	post.save(function (error, post) {
		if (error) {
			return next(error);
		}
		response.status(201);
		response.json(post);
	});
})

module.exports = router;