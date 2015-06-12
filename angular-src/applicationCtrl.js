angular.module('app')
	.controller('ApplicationCtrl' , ["$scope", "UserSvc", function ($scope, UserSvc) {
		if (window.localStorage.token) {
			UserSvc.getUser()
				.then(function (response){
					//console.log(response.data);
					$scope.$emit('userLoggedIn', response.data);
				})
		}

		$scope.$on('userLoggedIn', function(event, user) {
			$scope.currentUser = user;
		})
	}])