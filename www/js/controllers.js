angular.module('toDoApp')

.controller('mainController', function($scope, $rootScope, $mdDialog, $mdSidenav, $mdColorPalette, taskActionsService, retrieveTasksFactory) {
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

	$scope.customFullScreen = false;

	$scope.showNewTask = function(ev) {
		$mdDialog.show({
			templateUrl: 'components/new-task-modal/newTaskModal.html',
			controller: 'newTaskModalController',
			parent: angular.element(document.body),
			targeEvent:  ev,
			clickOutsideToClose: true,
			fullscreen: $scope.customFullScreen // only for -xs, -sm breakpoints
		})
		.then(function(answer) {

		}, function() {

		});
	};

	$rootScope.projectName = [];
	$rootScope.projectName.push(['','All']);

	$scope.showList = false;

	$rootScope.tasksList = {};
	retrieveTasksFactory.getTasksList()
	.then(function (tasks) {

		$rootScope.tasksList = tasks;
		if (tasks.length > 0) $scope.showList = true;

		taskActionsService.getProjectsFilter();

	}, function (error) {
		console.error(error);
	});

});
