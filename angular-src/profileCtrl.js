angular.module('app')
	.controller('ProfileCtrl', ["$scope" , "$http", "UserSvc", "$routeParams", "$route", "$location" , function ($scope, $http, UserSvc, $routeParams, $route, $location) {

		var username = $routeParams.username;

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});
				
		UserSvc.profile (username)
			.success(function (user_profile) {
				$scope.user_profile = user_profile;
				console.log(user_profile);
			})

	}])