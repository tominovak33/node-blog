angular.module('app')
	.service('PostsService', function ($http) {
		this.get = function () {
			return $http.get('/api/posts');
		}
		this.send = function (post) {
			return $http.post('/api/posts', post);
		}
	})