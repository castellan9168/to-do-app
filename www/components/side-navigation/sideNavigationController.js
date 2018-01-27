angular.module('toDoApp')

.controller('sideNavigationController', function($scope, sharedProperties) {
	$scope.close = function() {
		sharedProperties.sideNav.style.display = 'none';
	}
});
