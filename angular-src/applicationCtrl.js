angular.module('app')
	.controller('ApplicationCtrl' , ["$scope", "$rootScope", "UserSvc", function ($scope, $rootScope, UserSvc) {
		/*
		If we have a stored token, get the user information from it
		and emit the user loggedin messages in order to allow the UI to 
		indicate to the user that they were logged in
		*/
		
		if (window.localStorage.token) {
			UserSvc.getUser()
				.then(function (response){
					$scope.$emit('userLoggedIn', response.data);
				})
		}

		$scope.$on('userLoggedIn', function(event, user) {
			$scope.currentUser = user;
		})
	}])