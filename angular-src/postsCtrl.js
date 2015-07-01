angular.module('app')
	.controller('PostsCtrl', ["$scope" , "$http", "PostsService", "filterFilter", function ($scope, $http, PostsService, filterFilter) {
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
				$scope.paginate();
			})
		})

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});

		$scope.currentPage = 1;
		$scope.postsPerPage = 5;

		$scope.prevPage = function () {
	        if ($scope.currentPage > 1) {
	            $scope.currentPage--;
	        }
	    };
    
	    $scope.nextPage = function () {
	        if ($scope.currentPage < $scope.posts.length/$scope.postsPerPage) {
	            $scope.currentPage++;
	        }
	    };
	    
	    $scope.setPage = function (page_number) {
	        $scope.currentPage = page_number;
	    };

	    //This way I can do:  "<li ng-repeat="n in range(pages) track by $index">" and so I can display as many items as the value of a number as this returns an array of that lenght
	    $scope.range = function(n) {
        	return new Array(n);
    	};

	    $scope.currentPage = 1; //current page
	    $scope.postsPerPage = 5; //max rows for data table
	    
	    //watch to see if searching and repaginate if we are
	    //true at the end  magically makes it so that as each extra letter is added to the search we can repaginate
	    //without the 'true' it only did  that
	    $scope.$watch('search', function(term) {
	        $scope.filteredPosts = filterFilter($scope.posts, term);
	        $scope.paginate($scope.filteredPosts.length);
	    }, true);


	    $scope.paginate = function(number_of_items){
	    	if (number_of_items > 0) {
	        	$scope.numberOfPages = Math.ceil(number_of_items/$scope.postsPerPage);
	        }
	        else {
	        	$scope.numberOfPages = Math.ceil($scope.posts.length/$scope.postsPerPage);
	        }
	    };


	PostsService.get()
		.success(function (posts) {
			$scope.posts = posts;
			$scope.paginate($scope.posts.length);
		})

	}])

	.filter('output_html', ["$sce", function ($sce) {
		return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	}])

	.filter('startFrom', function() {
	    return function(input, start) {
	        if(input) {
	            start = +start; //parse to int
	            return input.slice(start);
	        }
	        return [];
	    }
	});