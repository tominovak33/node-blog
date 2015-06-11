angular.module('app')
.run(["$rootScope", "$timeout" , "$window" , function ($rootScope, $timeout, $window) {
	
		//Create a websocket connection with the server
		var host = "ws://" + $window.location.host
		  
		var connection = new WebSocket(host)

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