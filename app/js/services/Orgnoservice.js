'use strict';

var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory("orgNoService", function ($http, $q) {
    return {
        get: function (orgnr) {
            var requestString
            if(orgnr==undefined){
                requestString = "/error/";
            }else{
                requestString = "/orgnr/" + orgnr.toString();
            }
            return $http({url: requestString, cache: true});
        },
        getAll: function (orgnrList) {
            var getCalls = [];
            for (var orgnr in orgnrList) {
                getCalls.push(this.get(orgnrList[orgnr]));
            }
            return $q.all(getCalls);
        }
    }
});