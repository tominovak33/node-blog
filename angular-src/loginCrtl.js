angular.module('app')
	.controller('LoginCtrl' , ["$scope" , "UserSvc" , function ($scope, UserSvc) {
		$scope.login = function (username, password) {
			UserSvc.login(username, password)
				.then(function (response){
					$scope.$emit('userLoggedIn', response.data);
					window.location.href = '#/'
				},
				function(error){
				  $scope.loginValidation = 'Incorrect username & password combination';
				})

		}

		$scope.logout = function () {
			UserSvc.logout()
		}
	}])