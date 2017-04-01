angular.module('toDoApp')

.service('saveTaskService', function($q, $http, API_ENDPOINT) {

	var addTask = function(task) {
		return $q(function(resolve, reject) {
			$http.post(API_ENDPOINT.url + '/newTask', task).then(function(result) {
				if(result.data.success) {
					resolve(result.data.msg);
				} else {
					reject(result.data.msg);
				}
			});
		});
	};

	return {
		addTask: addTask
	};

});