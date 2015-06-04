var express = require('express');
var app = express();

app.get('/', function(request, response) {
	response.status(200);
	response.send("Express server working correctly");
})

app.listen(8888);