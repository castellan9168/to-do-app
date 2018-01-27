angular.module('toDoApp')

.controller('mainNavigationController', function($scope, sharedProperties) {
    $scope.showSideNav = function () {
        sharedProperties.sideNav.style.display = 'block';
    }
});
