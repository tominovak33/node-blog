angular.module('app')
	.controller('ProfileCtrl', ["$scope" , "$http", "UserSvc", "PostsService" , "$routeParams", "$route", "$location" , function ($scope, $http, UserSvc, PostsService, $routeParams, $route, $location) {

		$scope.baseUrl = location.host;
		var username = $routeParams.username;
		$scope.new  = {};

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


		/*-------------------------------------------
		/ Check currently logged in user 
		/------------------------------------------*/

		$scope.checkLogin = function() {
			//is anyone logged in
		  	if (window.localStorage.token) {
			  	//get current user
			  	UserSvc.getUser()
					.then(function (response){
						$scope.currentUser = response.data;
							//is the user the same as the user who's page this is
							if ($scope.user_profile._id == $scope.currentUser._id ) {
								$scope.pageOwner = true;
							}
					})
			}
		};

		/*-------------------------------------------
		/ End user check 
		/------------------------------------------*/

		$scope.currentUser = [];

		$scope.checkLogin();

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

		/*-------------------------------------------
		/ Profile edit options 
		/-------------------------------------------*/

		if ($scope.pageOwner) {

		}

		$scope.saveProfile = function () {

			var profile_details = {
				_id : $scope.currentUser._id
			};

			for (var key in $scope.new) {
			  if ($scope.new.hasOwnProperty(key)) {
			    //alert(key + " -> " + $scope.new[key]);
			    if ($scope.new[key] != '') {
			    	profile_details[key] = $scope.new[key];
			    }
			  }
			}

			//console.log($scope.new);
			//console.log(profile_details);

			UserSvc.profileUpdate(profile_details)
				.success(function (user) {
					alert('done');
				})
		}

		/*-------------------------------------------
		/ End profile edit options 
		/-------------------------------------------*/

	

	}])