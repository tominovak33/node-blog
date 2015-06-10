var ws = require('ws');
var _ = require('lodash');

var clients = [];

exports.connect = function (server) {
	var ws_server = new ws.Server({server: server});
	ws_server.on('connection', function (ws) {
		clients.push(ws)
		//ws.send("Websockets working");
		exports.broadcast('new client joined')
		ws.on('close', function () {
			_.remove(clients, ws)
		})
	})
}

exports.broadcast = function (topic, data) {
	var json = JSON.stringify({topic: topic, data: data})
	clients.forEach(function (client) {
		client.send(json);
	});
}