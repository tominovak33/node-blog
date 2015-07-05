angular.module('app')
	.controller('SinglePostCtrl', ["$scope" , "$http", "PostsService", "$routeParams", "$route", "$location" , function ($scope, $http, PostsService, $routeParams, $route, $location) {

		var post_slug = $routeParams.slug;

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});

					
		PostsService.single({
			slug: post_slug
		})
		.success(function (post) {
			$scope.post = post;
		})
	}])