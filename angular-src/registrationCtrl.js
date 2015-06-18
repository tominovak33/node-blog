angular.module('app')
	.controller('RegisterCtrl' , ["$scope" , "UserSvc" , function ($scope, UserSvc) {
		$scope.register = function (username, password, password_confirm) {
			if (password != password_confirm) {
				$scope.validationMessage = 'Your passwords did not match.';
				return;
			}
			UserSvc.register(username, password)
		}
	}])