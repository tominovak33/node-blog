var express = require('express');
var bodyParser = require('body-parser');
var Post = require('./models/post');

var app = express();
app.use(bodyParser.json());

app.get('/api/posts', function (request, response, next) {
	Post.find(function (error, posts) {
		if (error) {
			return next(error);
		}
		response.status(200);
		response.json(posts);
	})
})

app.post('/api/posts', function (request, response, next) {
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

var port =  (process.argv[2] || 3000);

app.listen(port, function () {
	console.log('Server listening on port: ', port);
})