angular.module('toDoApp')

.controller('taskListElementController', function($scope, $rootScope, taskActionsService, retrieveTasksFactory) {
	$scope.confirm = function() {
		event.stopPropagation();
	}

	$scope.delete = function(task) {
		event.stopPropagation();
		taskActionsService.removeTask(task).then(function (msg) {
			retrieveTasksFactory.getTasksList().
			then(function (tasks) {
				$rootScope.tasksList = tasks;
				if (tasks.length > 0) showList = true;
			}, function (error) {
				console.error(error);
			});
		}, function (errMsg) {
			alert('Unable to delete task');
		});
	}
});
