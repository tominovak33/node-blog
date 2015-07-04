angular.module('app')
	.controller('SinglePostCtrl', ["$scope" , "$http", "PostsService", "$routeParams", "$route" , function ($scope, $http, PostsService, $routeParams, $route) {

		var post_id = $routeParams.id;

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});

					
		PostsService.single({
			id: post_id
		})
		.success(function (post) {
			$scope.post = post;
		})
	}])