angular.module('app')
	.controller('PostsCtrl', ["$scope" , "$http", "PostsService", function ($scope, $http, PostsService) {
		$scope.addPost = function () {
			if ($scope.postBody) {
				PostsService.send({
					username: 'tomi7',
					body: $scope.postBody
				})
				.success(function (post) {
					$scope.posts.unshift(post);
					$scope.postBody = null;
				})
			}
		}

		$scope.$on('ws:new_post', function(_, post) {
			/*
			console.log("arg 1:")
			console.log(foo);
			console.log("arg 2:")
			console.log(post);
			console.log('end');
			*/
			alert("new post recieved")
		})

	PostsService.get()
		.success(function (posts) {
			$scope.posts = posts;
		})

	}])