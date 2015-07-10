angular.module('app')
	.controller('ProfileCtrl', ["$scope" , "$http", "UserSvc", "PostsService" , "$routeParams", "$route", "$location" , function ($scope, $http, UserSvc, PostsService, $routeParams, $route, $location) {

		$scope.baseUrl = location.host;

		var username = $routeParams.username;

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});

		/*-------------------------------------------
		/ Pagination 
		/------------------------------------------*/

		$scope.user_posts = [];

		$scope.currentPage = 1;
		$scope.postsPerPage = 5;

		$scope.prevPage = function () {
	        if ($scope.currentPage > 1) {
	            $scope.currentPage--;
	        }
	    };
    
	    $scope.nextPage = function () {
	        if ($scope.currentPage < $scope.user_posts.length/$scope.postsPerPage) {
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
	    

		$scope.paginate = function(number_of_items){
	    	if (number_of_items > 0) {
	        	$scope.numberOfPages = Math.ceil(number_of_items/$scope.postsPerPage);
	        }
	        else {
	        	$scope.numberOfPages = Math.ceil($scope.user_posts.length/$scope.postsPerPage);
	        }
	    };



	    //This way I can do:  "<li ng-repeat="n in range(pages) track by $index">" and so I can display as many items as the value of a number as this returns an array of that lenght
	    $scope.range = function(n) {
        	return new Array(n);
    	};

		/*-------------------------------------------
		/ End Pagination 
		/-------------------------------------------*/

				
		UserSvc.profile (username)
			.success(function (user_profile) {
				$scope.user_profile = user_profile;
				PostsService.user_posts ({
					_author: $scope.user_profile._id
				})
					.success(function (user_posts) {
						$scope.user_posts = user_posts;
						$scope.paginate($scope.user_posts.length);
					})
			})

	}])