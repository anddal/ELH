'use strict';

var ELHAppControllers = angular.module('ELHAppControllers');


ELHAppControllers.controller('ErrorCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    if ($rootScope.errorstatus != undefined && $rootScope.errormessage != undefined) {
        $scope.expandme = true;
    }else{
        $scope.expandme = false;
    };
}]);