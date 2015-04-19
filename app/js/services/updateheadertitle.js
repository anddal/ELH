'use strict';

var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory('updateHeaderTitle', ['$rootScope',
    function ($rootScope) {
        var defaultTitle = "Search for CCU Id";

        return function (input) {
            if (input == undefined) {
                $rootScope.headerTitle = defaultTitle;
            } else {
                $rootScope.headerTitle = input;
            }
        };
    }]);