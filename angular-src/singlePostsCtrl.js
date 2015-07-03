angular.module('app')
	.controller('SinglePostsCtrl', ["$scope" , "$http", "PostsService", function ($scope, $http, PostsService) {

		alert("Single posts controller loaded");
		
		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});