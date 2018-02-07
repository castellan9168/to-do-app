angular.module('toDoApp')

.controller("newTaskModalController", function($scope, $rootScope, taskActionsService, retrieveTasksFactory) {
	var popup = document.getElementById('new-task-pop-up');

	$scope.closePopup = function() {
		popup.style.display = 'none';
	};

	$scope.addNewTask = function() {
		taskActionsService.addTask($scope.task).then(function(msg) {
			$scope.closePopup();
			retrieveTasksFactory.getTasksList()
			.then(function (tasks) {
				$rootScope.tasksList = tasks;
				if (tasks.length > 0) showList = true;
			}, function (error) {
				console.error(error);
			});
	}, function(errMsg) {
		alert('Unable to add new task');
	});
};

});
