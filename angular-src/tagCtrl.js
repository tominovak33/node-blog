/**
 * Created by tomi on 05/03/16.
 */

angular.module('app')
    .controller('TagCtrl', ["$scope" , "$http", "UserSvc", "PostsService" , "$routeParams", "$route", "$location" , function ($scope, $http, UserSvc, PostsService, $routeParams, $route, $location) {

        $scope.baseUrl = location.host;
        var tag = $routeParams.tag;
        $scope.new  = {};

        $scope.tagTitle = tag;

        PostsService.filtered_posts ({
                tags: tag
            })
            .success(function (taggedPosts) {
                $scope.posts = taggedPosts;
            });
    }])