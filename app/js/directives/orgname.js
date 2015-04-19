'use strict';

var ELHAppDirectives = angular.module('ELHAppDirectives');

ELHAppDirectives.directive('orgNameByOrgNr', [ 'orgNoService', function (orgNoService) {
    return function (input) {
        orgNoService.get(input).
            success(function (data) {
                return data.organizationName;
            }).
            error(function (data, status, headers, config) {
                return "Unknown";
            });
    };
}]);