angular.module('app')
	.controller('PostsCtrl', ["$scope" , "$http", "PostsService", function ($scope, $http, PostsService) {
		$scope.posts = [];
		$scope.addPost = function () {
			var ckeditor_content = CKEDITOR.instances.editor1.getData();
			if (ckeditor_content) {
				PostsService.send({
					body: ckeditor_content,
					title: $scope.postTitle
				})
				.success(function (post) {
					/*
					//Removed as websocket broadcast would cause the post to appear duplicated on the browser that it was posted from 
					//as both of the functions would get executed because the client who sends the post would still recieve the websockets broadcast back from the server  
					*/
					//$scope.posts.unshift(post); 
					$scope.postBody = null;
					CKEDITOR.instances.editor1.setData('');
					$scope.postTitle = null;
				})
			}
		}

		$scope.init_ckedit = function () {
		    CKEDITOR.replace('editor1');
		}

		$scope.$on('ws:new_post', function(_, post) {
			post = post[0];
			$scope.$apply(function () {
				$scope.posts.unshift(post);
			})
		})

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
			//alert("foo");
		});

		$scope.currentPage = 1;
		$scope.postsPerPage = 2;

		$scope.prevPage = function () {
	        if ($scope.currentPage > 1) {
	            $scope.currentPage--;
	            $scope.paginate();
	        }
	    };
    
	    $scope.nextPage = function () {
	        if ($scope.currentPage < $scope.posts.length/$scope.postsPerPage) {
	            $scope.currentPage++;
	            $scope.paginate();
	        }
	    };
	    
	    $scope.setPage = function () {
	    	alert('setting page');
	        $scope.currentPage = this.n;
	    };

	    $scope.range = function(n) {
        	return new Array(n);
    	};

		$scope.paginate = function() {

			$scope.pagedPosts = [];
			$scope.pages = Math.ceil($scope.posts.length/$scope.postsPerPage);

			$scope.numberOfPages = function () {
				return Math.ceil($scope.posts.length / $scope.postsPerPage);
			};

			var begin = (($scope.currentPage -1 ) * $scope.postsPerPage);
			var end = begin + $scope.postsPerPage;

			$scope.pagedPosts = $scope.posts.slice(begin, end);
		}

	PostsService.get()
		.success(function (posts) {
			$scope.posts = posts;
			$scope.paginate();
		})

	}])

	.filter('output_html', ["$sce", function ($sce) {
		return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	}])