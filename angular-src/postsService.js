angular.module('app')
	.service('PostsService', ["$http" , function ($http) {
		this.get = function () {
			return $http.get('/api/posts');
		}
		this.send = function (post) {
			return $http.post('/api/posts', post);
		}
		this.single = function (parameters) {
			return $http.get('/api/posts', { params: {post_id: parameters.id} } );
		}
	}])