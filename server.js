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

app.post('/api/posts', function (request, response) {
	console.log('Post recieved');
	console.log(request.body.username);
	console.log(request.body.body);
	response.status(201);
	response.send();
})

var port =  (process.argv[2] || 3000);

app.listen(port, function () {
	console.log('Server listening on port: ', port);
})
