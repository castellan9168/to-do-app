angular.module('toDoApp', ['ngRoute'])

.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
}]);
