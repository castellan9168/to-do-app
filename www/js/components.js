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
});