'use strict';

var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory("journeyService", function ($http) {
    return {
        get: function (journeyId) {
            var requestString = "/journey/" + journeyId.toString();
            return $http({url: requestString, cache: true});
        }
    }
});