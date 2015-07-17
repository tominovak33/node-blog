angular.module('app')
	.controller('ProfileCtrl', ["$scope" , "$http", "UserSvc", "PostsService" , "$routeParams", "$route", "$location" , function ($scope, $http, UserSvc, PostsService, $routeParams, $route, $location) {


		/*-------------------------------------------
		/ Get user permissions
		/-------------------------------------------*/
		$scope.editPermission = function(permission_level) {
		  	UserSvc.authorization()
				.then(function (response){
					$scope=(response);
				})
		}
		/*-------------------------------------------
		/ End user permissions
		/-------------------------------------------*/


		$scope.baseUrl = location.host;
		var username = $routeParams.username;
		$scope.new  = {};

		UserSvc.profile(username)
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
							//is the user the same as the user who's page this is or they have a higher permission level then let them edit the page
							if ($scope.user_profile._id == $scope.currentUser._id || $scope.editPermission($scope.currentUser.permission_level) ) {
								$scope.canEdit = true;
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

	  	UserSvc.authorization('10')
			.then(function (response){
				console.log(response);
			})

		/*-------------------------------------------
		/ Profile edit options 
		/-------------------------------------------*/

		$scope.saveProfile = function () {

			//get the id of the currently logged in user's ID. So we can use this to edit the user. todo: change this so the superusers can choose who is edited when they visit the page
			var profile_details = {
				_id : $scope.user_profile._id
			};

			//iterate through the new details, if they are not empty then add them to the profile details object
			for (var key in $scope.new) {
			  if ($scope.new.hasOwnProperty(key)) {
			    //alert(key + " -> " + $scope.new[key]);
			    if ($scope.new[key] != '') {
			    	profile_details[key] = $scope.new[key];
			    }
			  }
			}

			//send this profile details obeject to the user service. This then updated or adds all detail in this to the user who's ID was selected earlier
			UserSvc.profileUpdate(profile_details)
				.success(function (user) {
					//console.log(user);
					//The username is used as part of the users login token, so if the username changes the token is no longer valid (this is needed for security reasons)
					//therefore changing a username will effectively log someone out. 
					//So we need to check if their username was changed, and if it was then send them to the login page so they can log into they account agian and get a new token
					if (user.username != $scope.user_profile.username) {
						$scope.returnMessage = "Your username was changed so you must log in again";
						setTimeout(function(){ 
							window.location.href= '/#/login';
						}, 1500);
					}
					else {
						$scope.returnMessage = "Details updated successfully";
					}
					
				})
		}

		/*-------------------------------------------
		/ End profile edit options 
		/-------------------------------------------*/
	}])