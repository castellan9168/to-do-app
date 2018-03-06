angular.module('toDoApp')

.controller('sideNavigationController', function($scope, sharedProperties, $timeout, $mdSidenav, $log) {
	$scope.close = function() {
		sharedProperties.sideNav.style.display = 'none';
	}
});
