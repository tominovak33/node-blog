angular.module('app')
	.controller('PostsCtrl', ["$scope" , "$http", "PostsService", function ($scope, $http, PostsService) {
		$scope.addPost = function () {
			var ckeditor_content = CKEDITOR.instances.editor1.getData();
			if (ckeditor_content) {
				PostsService.send({
					body: ckeditor_content
				})
				.success(function (post) {
					/*
					//Removed as websocket broadcast would cause the post to appear duplicated on the browser that it was posted from 
					//as both of the functions would get executed because the client who sends the post would still recieve the websockets broadcast back from the server  
					*/
					//$scope.posts.unshift(post); 
					$scope.postBody = null;
				})
			}
		}

		$scope.$on('ws:new_post', function(_, post) {
			$scope.$apply(function () {
				$scope.posts.unshift(post);
			})
		})

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
            CKEDITOR.replace('editor1');
            document.getElementById('post-simple-input').style.display = 'none';
		});

	PostsService.get()
		.success(function (posts) {
			$scope.posts = posts;
		})

	}])

	.filter('output_html', ["$sce", function ($sce) {
		return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	}])
