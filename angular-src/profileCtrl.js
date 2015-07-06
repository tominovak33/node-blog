angular.module('app')
	.controller('ProfileCtrl', ["$scope" , "$http", "UserSvc", "PostsService" , "$routeParams", "$route", "$location" , function ($scope, $http, UserSvc, PostsService, $routeParams, $route, $location) {

		$scope.baseUrl = location.host;

		var username = $routeParams.username;

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});
				
		UserSvc.profile (username)
			.success(function (user_profile) {
				$scope.user_profile = user_profile;
				console.log(user_profile);
				PostsService.user_posts ({
					_author: $scope.user_profile._id
				})
					.success(function (user_posts) {
						$scope.user_posts = user_posts;
						//console.log($scope.user_posts);
					})
			})

	}])