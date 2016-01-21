angular.module('app')
	.controller('PostsCtrl', ["$scope" , "$http", "PostsService", "filterFilter", "UserSvc", function ($scope, $http, PostsService, filterFilter, UserSvc) {
		$scope.baseUrl = location.host;
		$scope.bodyLengthLimit = 250;
		$scope.postTagsArray = [];

		$scope.posts = [];
		$scope.addPost = function () {
			try {
				var postContent = CKEDITOR.instances.editor1.getData();
			}
			catch(err) {
				// ckeditor is not loaded
				console.error("CKEDITOR has not been loaded");
			}
			if (!postContent) {
				var postContent = $scope.postContent;
			}

			var date_slug = $scope.urlDate();
			var title_slug = $scope.slugify($scope.postTitle);

			var slug = date_slug + title_slug;

			if (postContent) {
				PostsService.send({
					body: postContent,
					title: $scope.postTitle,
					tags: $scope.postTagsArray,
					slug: slug
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
		};

		$scope.$on('$includeContentLoaded', function () {
			$scope.init_ckeditor();
		});

		$scope.init_ckeditor = function () {
		    CKEDITOR.replace('editor1');
		};

		$scope.$on('ws:new_post', function(_, post) {
			post = post[0];
			$scope.$apply(function () {
				$scope.posts.unshift(post);
				$scope.paginate();
			})
		});

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

	    $scope.urlDate = function(time) {
			if (time === undefined) {
				var date = new Date();
			}
			else {
				var date = new Date(time);
			}
		    var day = date.getDate();
		    var month = date.getMonth()+1; //+1 because months are 0 indexed
		    var year = date.getFullYear();

            return String(year) + '/' + String(month) + '/' + String(day) + '/' ;
        };

		$scope.$watch('postTitle', function(title) {
			if (title) {
				$scope.generateSlug(title);
			}
		}, true);

		$scope.generateSlug = function () {
			$scope.slug = $scope.urlDate() + $scope.slugify($scope.postTitle);
		};

	    $scope.slugify = function(string) {
	    	var slug =  string.toLowerCase();
	    	slug = slug.replace(/\s+/g,"-");
	    	slug = slug.replace(/\?/g, "");
	    	slug = slug.replace(/\&/g, "");
	    	slug = slug.replace(/\=/g, "");
	    	return slug;
	    };

		$scope.addTag = function(tag) {
			//console.log(tag);
			$scope.postTagsArray.push(tag);
			$scope.postTag = '';
		};

		$scope.removeTag = function(tagIndex) {
			$scope.postTagsArray.splice(tagIndex, 1);
		};

	PostsService.get()
		.success(function (posts) {
			$scope.posts = posts;
			//console.log(posts); //Log all the posts recieved from the server
			$scope.paginate($scope.posts.length);
		})

	}])