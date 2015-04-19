'use strict';

var ELHAppControllers = angular.module('ELHAppControllers');

ELHAppControllers.controller('SearchCtrl', ['$scope', '$rootScope', '$location', 'updateHeaderTitle', '$timeout', 'ccuService',
    function ($scope, $rootScope, $location, updateHeaderTitle, $timeout, ccuService) {
        $scope.master = {};

        updateHeaderTitle();

        $scope.searchLocalFirst = function () {
            ccuService.get($scope.ccu.ccuId)
                .success(function (data) {
                    if (data != undefined && data.ccuId != undefined ) {
                        ccuService.update(data);
                        $scope.errorstatus = "";
                        $location.path("ccu/" + data.ccuId);
                    }else{
                        $scope.expandme = true;
                        $scope.errorstatus = '404';
                        $scope.errormessage = "Not Found";
                    }
                }).error(function (data, status, headers, config) {
                    $scope.expandme = true;
                    $scope.errorstatus = status;
                    $scope.errormessage = data;
                })
        };

        $scope.reset = function () {
            $scope.expandme = false;
            $scope.ccu = angular.copy($scope.master);
            $scope.errormessage = "";
            $scope.errorstatus = "";
        };
        $scope.reset();
    }
]);