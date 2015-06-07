var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.get('/api/posts', function (request, response) {
	response.json([
		{
			username: 'tomi4',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit one.'
		}
	])
})

var Post = require('./models/post');


app.post('/api/posts', function (request, response) {
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
	/*
	console.log('Post recieved');
	console.log(request.body.username);
	console.log(request.body.body);
	response.send();
	*/
})

var port =  (process.argv[2] || 3000);

app.listen(port, function () {
	console.log('Server listening on port: ', port);
})
