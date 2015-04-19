'use strict';

var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory("ccuService", function ($http,$q) {
    var ccuList = [],
        newCcuNotInLocalStorage;
    return {
        get: function (ccuId) {
            newCcuNotInLocalStorage = "";
            var deferral = $q.defer();
            for (var ccu in ccuList) {
          //      console.log("Ccu in list: " + ccuList[ccu].ccuId );
                if (ccuList[ccu].ccuId == ccuId) {
                    console.log("Ccu " + ccuId + " is in local session");
                }
            }
            //console.log("Ccu " + ccuId + " is NOT in local session");
            var getUrl = "/ccu/" + ccuId.toString();
            return $http( {method: 'GET', url:getUrl , cache: true});
        },
        update: function (ccu) {
            for (var storedCcu in ccuList) {
                console.log(ccuList[storedCcu].ccuId+ " == " +ccu.ccuId );
                if (ccuList[storedCcu].ccuId == ccu.ccuId) {
                    return true;
                }
            }
            ccuList.push(ccu);
            return false;
        }
    }
});
