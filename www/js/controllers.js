angular.module('toDoApp')

.controller('mainController', function($scope, $rootScope, saveTaskService, retrieveTasksFactory) {
	var newTaskPopUp = document.getElementById('new-task-pop-up');
	$scope.task = {
		name: '',
		project: '',
		dueDate: '',
		priority: '',
		tags: '',
		parent: '',
		comments: '',
		reminders: ''
	};

	$scope.showList = false;

	$rootScope.tasksList = {};
	retrieveTasksFactory.getTasksList()
	.then(function (tasks) {
		$rootScope.tasksList = tasks;
		if (tasks.length > 0) $scope.showList = true;
	}, function (error) {
		console.error(error);
	});

	$scope.newTask = function() {
		newTaskPopUp.style.display = 'block';
	};

	$scope.taskDetails = function() {

	};

});
