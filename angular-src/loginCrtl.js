angular.module('app')
	.controller('LoginCtrl' , ["$scope" , "UserSvc" , function ($scope, UserSvc) {
		$scope.login = function (username, password) {
			UserSvc.login(username, password)
				.then(function (response){
					console.log(response.data);
					$scope.$emit('userLoggedIn', response.data);
				})
		}
	}])