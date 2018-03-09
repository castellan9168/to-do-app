angular.module('toDoApp')

.service('taskActionsService', function($q, $http, $rootScope, sharedProperties, API_ENDPOINT) {

	var addTask = function(task) {
		return $q(function(resolve, reject) {
			console.log(task);
			$http.post(API_ENDPOINT.url + '/newTask', task).then(function(result) {
				if(result.data.success) {
					resolve(result.data.msg);
				} else {
					reject(result.data.msg);
				}
			});
		});
	};

	var removeTask = function(task) {
		return $q(function(resolve, reject) {
			$http.post(API_ENDPOINT.url+ '/removeTask', task).then(function(result) {
				if (result.data.success) {
					resolve(result.data.msg);
				} else {
					reject(result.data.msg);
				}
			})
		})
	};

	var completeTask = function(task) {
		return $q(function(resolve, reject) {
			$http.put(API_ENDPOINT.url + '/completeTask', task).then(function(result) {
				if (result.data.success) {
					resolve(result.data.msg);
				} else {
					reject(result.data.msg);
				}
			})
		})
	};

	var getProjectsFilter = function() {
		var i;
		// I am filling project's filter with values
		for (i = 0; i < $rootScope.tasksList.length; i++) {
			var temp = $rootScope.tasksList[i].project;
			if ($rootScope.projectName.indexOf(temp) == -1) {
				$rootScope.projectName.push(temp);
			}
		}
	};

	return {
		addTask: addTask,
		removeTask: removeTask,
		completeTask: completeTask,
		getProjectsFilter: getProjectsFilter
	};

});

angular.module('toDoApp')

.service('sharedProperties', function($timeout, $mdSidenav, $log) {
	var sideNav = document.getElementById('side-navigation');

	var toggleSideNav = function () {
        $mdSidenav('left').toggle();
    };

	return {
		sideNav : sideNav,
		toggleSideNav: toggleSideNav
	}
});
