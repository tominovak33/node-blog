angular.module('app')
.run(["$rootScope", "$timeout" , function ($rootScope, $timeout) {
	
		var url = 'ws://localhost:3000'

		var connection = new WebSocket(url)

		connection.onopen = function () {
			console.log('Websocket connected')
		}


		connection.onclose = function (e) {
			console.log('Websocket closed. Trying to reconnect...')
			//$timeout(connect, 10*1000);
		} 

		connection.onmessage = function (e) {
			console.log(e);
			var message = JSON.parse(e.data);
			
			var name = 'ws:' + message.topic;
			var data = message.data;
			console.log("broadcasting: ");

			$rootScope.$broadcast(name, data);
		}

}])