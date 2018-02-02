angular.module('toDoApp')

.controller('taskListElementController', function($scope) {
	$scope.confirm = function() {
		event.stopPropagation();
		
	}

	$scope.delete = function() {
		event.stopPropagation();
	}
});
