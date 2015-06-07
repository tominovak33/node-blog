var app = angular.module('app', []);
app.controller('PostsCtrl', function ($scope, $http) {
	$scope.addPost = function (argument) {
		if ($scope.postBody) {
			$http.post('/api/posts', {
				username: 'tomi6',
				body: $scope.postBody
			})
			.success(function (post) {
				$scope.posts.unshift(post);
				$scope.postBody = null;
			})
		}
	}

	$http.get('/api/posts')
	.success(function (posts) {
		$scope.posts = posts;
	})
	.error (function (error) {
		//todo: error handling here later
	})
});