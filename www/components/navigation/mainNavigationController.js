angular.module('toDoApp')

.controller('mainNavigationController', function($scope, sharedProperties) {
    $scope.showSideLeft = sharedProperties.toggleSideNav;
});
