angular.module('toDoApp')

.component("newTaskModal", {
	templateUrl: 'components/new-task-modal/newTaskModal.html',
	controller: 'newTaskModalController'
})

.component("taskListElement", {
	templateUrl: 'components/task-list-element/taskListElement.html',
	bindings: {
		data: '='
	},
	controller: 'taskListElementController'
})

.component("sideNavigation", {
	templateUrl: 'components/side-navigation/sideNavigation.html',
	controller: 'sideNavigationController'
})

.component("mainNavigation", {
	templateUrl: 'components/navigation/mainNavigation.html',
	controller: 'mainNavigationController',
});
