angular.module('toDoApp')

.controller('taskListElementController', function($scope, $rootScope, taskActionsService, retrieveTasksFactory) {
	$scope.complete = function(task) {
		event.stopPropagation();
		taskActionsService.completeTask(task).then(function (msg) {
				retrieveTasksFactory.getTasksList()
				.then(function (tasks) {
					$rootScope.tasksList = tasks;
				}, function (error) {
					console.error(error);
				});
		}, function (errMsg) {
			alert('Unable to complete task');
		});
	}

	$scope.delete = function(task) {
		event.stopPropagation();
		taskActionsService.removeTask(task).then(function (msg) {
			retrieveTasksFactory.getTasksList()
			.then(function (tasks) {
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
