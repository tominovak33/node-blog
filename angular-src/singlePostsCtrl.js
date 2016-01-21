angular.module('app')
	.controller('SinglePostCtrl', ["$scope" , "$http", "PostsService", "$routeParams", "$route", "$location" , function ($scope, $http, PostsService, $routeParams, $route, $location) {

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});

		$scope.deleteItem = function () {
			PostsService.removeItem({
					post_id: $scope.post._id
				})
				.success(function (response) {
					console.log(response);
					// confirm successful delete
				})
		};

        var postSlug = $routeParams.slug;
        var postID = $routeParams.id;

		if (postSlug) {
            var fullPostSlug = '';
            fullPostSlug += $routeParams.year + '/';
            fullPostSlug += $routeParams.month + '/';
            fullPostSlug += $routeParams.day + '/';
            fullPostSlug += $routeParams.slug;

            console.log(fullPostSlug);

            PostsService.single_slug({
				slug: fullPostSlug
			})
			.success(function (post) {
				$scope.post = post[0];
			})
		}
		else if (postID) {
			PostsService.single_id({
				id: postID
			})		
			.success(function (post) {
				$scope.post = post[0];
                console.log($scope.post);
			})
		}
        else {
            // the url does not contain a valid post slug or id
            // show error to user
        }

	}])