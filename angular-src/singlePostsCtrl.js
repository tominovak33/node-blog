angular.module('app')
	.controller('SinglePostCtrl', ["$scope" , "$http", "PostsService", function ($scope, $http, PostsService) {

		//alert("Single posts controller loaded");

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});

					
		PostsService.single({
			id: 'foobar-123'
		})
		.success(function (post) {
			/*
			$scope.post = posts;
			console.log(post);
			alert(post);
			*/
		})
	}])