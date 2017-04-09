angular.module('toDoApp')

.controller('mainController', function($scope, $rootScope, saveTaskService, retrieveTasksFactory) {
	var newTaskPopUp = document.getElementById('new-task-pop-up'),
		filterProjectTypeDropdown = document.getElementById('filter-project-type-dropdown');
	$scope.task = {
		name: '',
		project: '',
		date: '',
		priority: '',
		tags: '',
		parent: '',
		comments: '',
		reminders: ''
	};

	//$scope.projectFilter = {};

	$scope.showList = false;

	$rootScope.tasksList = {};
	retrieveTasksFactory.getTasksList()
	.then(function (tasks) {
		$rootScope.tasksList = tasks;
		if (tasks.length > 0) $scope.showList = true;
		//console.log($rootScope.tasksList);
	}, function (error) {
		console.error(error);
	});

	$scope.newTask = function() {
		console.log(newTaskPopUp);
		newTaskPopUp.style.display = 'block';
	};

	$scope.filterProjectType = function () {
		filterProjecTypeDropdown.style.display = 'block';
	};

	$scope.selectProjectType = function () {
		filterProjecTypeDropdown.style.display = 'none';
	};

	$scope.taskDetails = function($event) {
		var showDetails = document.getElementById($event.target.id + '-details');
		showDetails.style.display = 'block';
	};

});
