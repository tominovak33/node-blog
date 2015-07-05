angular.module('app')
	.service('PostsService', ["$http" , function ($http) {
		this.get = function () {
			return $http.get('/api/posts');
		}
		this.send = function (post) {
			return $http.post('/api/posts', post);
		}
		this.single_slug = function (parameters) {
			return $http.get('/api/posts', { params: {post_slug: parameters.slug} } );
		}
		this.single_id = function (parameters) {
			return $http.get('/api/posts', { params: {post_id: parameters.id} } );
		}
		this.user_posts = function (parameters) {
			return $http.get('/api/posts', { params: {_author: parameters._author} } );
		}
	}])