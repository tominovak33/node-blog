var express = require('express');
var bodyParser = require('body-parser');
var websocket = require('./websockets');
var _ =  require('lodash');

var app = express();
app.use(bodyParser.json());

app.use(require('./auth'));

//app.use('/api/sessions', require('./controllers/api/sessions'));
app.use('/api/sessions', require('./controllers/api/sessions-locked-down'));
app.use('/api/users', require('./controllers/api/users'));

//allows the controller to only have to specify the router after '/api/posts'
app.use('/api/posts', require('./controllers/api/posts.js'));
app.use(require('./controllers/static'));

var port =  process.env.PORT || 3000;

var server = app.listen(port, function () {
	console.log('Server ', process.pid ,' listening on port: ', port);
})

websocket.connect(server);