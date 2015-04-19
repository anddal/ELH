'use strict';

var ELHAppControllers = angular.module('ELHAppControllers');


ELHAppControllers.controller('HeaderCtrl', ['$scope', '$rootScope', 'getAllStoredCcus','checkLocalStorageForNewEventsForWatchList',
    function ($scope, $rootScope, getAllStoredCcus, checkLocalStorageForNewEventsForWatchList) {
        $scope.refreshStoredCcus = function () {
            $rootScope.sessionList = getAllStoredCcus("session");
            $rootScope.favoritsList = getAllStoredCcus("local");

            $rootScope.unCheckedEventList = checkLocalStorageForNewEventsForWatchList($rootScope.favoritsList);

        };
    }]);