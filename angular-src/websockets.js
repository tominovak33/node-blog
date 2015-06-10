angular.module('app')
	.run(["$rootScope", function ($rootScope) {
		var url = 'ws://localhost:3000'

		var connection = new WebSocket(url)

		connection.onopen = function () {
			console.log('Websocket connected')
		}

		connection.onmessage = function (e) {
			console.log(e);
			var message = JSON.parse(e.data);
			$rootScope.$broadcast('ws:'+ message.topic, message.data)
		}
	}])