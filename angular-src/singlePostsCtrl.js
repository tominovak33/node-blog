angular.module('app')
	.controller('SinglePostCtrl', ["$scope" , "$http", "PostsService", function ($scope, $http, PostsService) {

		//alert("Single posts controller loaded");

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});

					
		PostsService.single({
			id: '55945a1faf009fa45b7cafc3'
		})
		.success(function (post) {
			$scope.post = post;
			console.log($scope.post);
		})
	}])