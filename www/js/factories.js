angular.module('toDoApp')

.factory('retrieveTasksFactory', function($q, $http, API_ENDPOINT) {
	return {
		getTasksList: function() {
			var deferred = $q.defer(),
				httpPromise = $http.get(API_ENDPOINT.url + '/tasksList');

				httpPromise.success(function (tasks) {
					deferred.resolve(tasks.data);
				})
					.error(function (error) {
						console.error(error);
					});

				return deferred.promise;
		}
	};
});