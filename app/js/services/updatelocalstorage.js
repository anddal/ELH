'use strict';

var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory('updateLocalStorage', ['checkStorageForCcu',
    function (checkStorageForCcu) {
        return function (ccuId) {
            var isAlreadyStored;
            isAlreadyStored = checkStorageForCcu(ccuId, "local");
            if (isAlreadyStored) {
                localStorage[ccuId] = new Date().toISOString();
                return true;
            } else {
                return false;
            }
        }
    }
]);