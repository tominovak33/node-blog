angular.module('app')
	.config(["$routeProvider", function ($routeProvider) {
		$routeProvider
			.when('/' , {controller: 'PostsCtrl', templateUrl: 'posts.html'})
			//.when('/register' , {controller: 'RegisterCtrl', templateUrl: 'register.html'})
			.when('/login' , {controller: 'LoginCtrl', templateUrl: 'login.html'})
			.when('/logout' , {controller: 'LoginCtrl', templateUrl: 'logout.html'})
			.when('/post/:year/:month/:day/:slug' , {controller: 'SinglePostCtrl', templateUrl: 'singlePost.html'})
			.when('/post/id/:id' , {controller: 'SinglePostCtrl', templateUrl: 'singlePost.html'})
			.when('/user/:username' , {controller: 'ProfileCtrl', templateUrl: 'user.html'})
			.when('/tag/:tag' , {controller: 'TagCtrl', templateUrl: 'tagPage.html'})
			//.when('/user/:username/edit' , {controller: 'ProfileCtrl', templateUrl: 'profile/userProfile.html'})
			//.when('/user/:username/profile' , {controller: 'ProfileCtrl', templateUrl: 'profile/userView.html'})
	}])