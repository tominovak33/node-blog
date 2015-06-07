var app = angular.module('app', []);

app.controller('PostsCtrl', function ($scope, $http, PostsService) {
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

	PostsService.get()
	.success(function (posts) {
		$scope.posts = posts;
	})

});

app.service('PostsService', function ($http) {
	this.get = function () {
		return $http.get('/api/posts');
	}
	this.send = function (post) {
		return $http.post('/api/posts', post);
	}
})