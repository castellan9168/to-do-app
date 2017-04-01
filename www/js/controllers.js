angular.module('toDoApp')

.controller('mainController', function($scope, saveTaskService, retrieveTasksFactory) {
	var overlay = document.getElementById('overlay');
	var popup = document.getElementById('popup');
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

	$scope.tasksList = {};
	retrieveTasksFactory.getTasksList()
		.then(function (tasks) {
			$scope.tasksList = tasks;
			if (tasks.length > 0) $scope.showList = true;
		}, function (error) {
			console.error(error);
		});

	$scope.addNewTask = function() {
		saveTaskService.addTask($scope.task).then(function(msg) {
			alert('New task added!');
			//closePopup();
		}, function(errMsg) {
			alert('Unable to add new task');
		});
	};

	$scope.newTask = function() {
		overlay.style.display = 'block';
		popup.style.display = 'block';
	};

	$scope.closePopup = function() {
		overlay.style.display = 'none';
		popup.style.display = 'none';
	};

	$scope.taskDetails = function() {

	};

});
