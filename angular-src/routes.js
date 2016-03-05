angular.module('app')
	.config(["$routeProvider", function ($routeProvider) {
		$routeProvider
			.when('/' , {controller: 'PostsCtrl', templateUrl: 'post/allPosts.html'})
			//.when('/register' , {controller: 'RegisterCtrl', templateUrl: 'register.html'})
			.when('/login' , {controller: 'LoginCtrl', templateUrl: 'login.html'})
			.when('/post/:year/:month/:day/:slug' , {controller: 'SinglePostCtrl', templateUrl: 'post/singlePost.html'})
			.when('/post/id/:id' , {controller: 'SinglePostCtrl', templateUrl: 'singlePost.html'})
			.when('/post/new/' , {controller: 'PostsCtrl', templateUrl: 'post/newPost.html'})
			.when('/user/:username' , {controller: 'ProfileCtrl', templateUrl: 'post/userPosts.html'})
			.when('/tag/:tag' , {controller: 'TagCtrl', templateUrl: 'post/tagPage.html'})
			//.when('/user/:username/edit' , {controller: 'ProfileCtrl', templateUrl: 'profile/userProfile.html'})
			//.when('/user/:username/profile' , {controller: 'ProfileCtrl', templateUrl: 'profile/userView.html'})
	}])