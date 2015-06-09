angular.module('app')
	.controller('ApplicationCtrl' , ["$scope", function ($scope) {
		$scope.$on('userLoggedIn', function(event, user) {
			$scope.currentUser = user;
		})
	}])