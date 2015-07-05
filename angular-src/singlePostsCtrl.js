angular.module('app')
	.controller('SinglePostCtrl', ["$scope" , "$http", "PostsService", "$routeParams", "$route", "$location" , function ($scope, $http, PostsService, $routeParams, $route, $location) {

		var post_slug = $routeParams.slug;
		var post_id = $routeParams.id;

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});

		if (post_id){ 
			console.log("ID " +  post_id);
		}

		if (post_slug){ 
			console.log("Slug " +  post_slug);
		}

	
		if (post_slug) {
			PostsService.single_slug({
				slug: post_slug
			})
			.success(function (post) {
				$scope.post = post;
			})
		}
		else {
			PostsService.single_id({
				id: post_id
			})		
			.success(function (post) {
				$scope.post = post;
			})
		}				

	}])