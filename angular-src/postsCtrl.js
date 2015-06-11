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
			$scope.$apply(function () {
				$scope.posts.unshift(post);
			})
		})

	PostsService.get()
		.success(function (posts) {
			$scope.posts = posts;
		})

	}])