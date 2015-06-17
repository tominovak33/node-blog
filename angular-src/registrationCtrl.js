angular.module('app')
	.controller('RegisterCtrl' , ["$scope" , "UserSvc" , function ($scope, UserSvc) {
		$scope.register = function (username, password) {
			UserSvc.register(username, password)
				.then(function (response){
					console.log(response);
				})
		}
	}])