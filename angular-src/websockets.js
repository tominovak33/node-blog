angular.module('app')
.run(["$rootScope", "$timeout" , "$window" , function ($rootScope, $timeout, $window) {

	var reconnect_delay = 10;
	
	(function connect(){
		//increment the reconnect delay timeer
		reconnect_delay += reconnect_delay;

		//Create a websocket connection with the server
		var host = "ws://" + $window.location.host
		  
		var connection = new WebSocket(host)

		connection.onopen = function () {
			//console.log('Websocket connected')
		}


		connection.onclose = function (e) {
			console.log('Websocket connection closed. Attempting to recconnect in ' + reconnect_delay + ' seconds' )

			$timeout(connect, reconnect_delay*1000);
		} 

		connection.onmessage = function (e) {
			//console.log(e);
			var message = JSON.parse(e.data);
			
			var name = 'ws:' + message.topic;
			var data = message.data;
			//console.log("broadcasting: ");

			$rootScope.$broadcast(name, data);
		}
	})()
}])