'use strict';

var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory('addCcuToStorage', ['checkStorageForCcu',
    function (checkStorageForCcu) {
        return function (ccuId, storageType) {
            var maxNumberOfLastSearches = 4,
                storageList = {},
                isAlreadyStored = false,
                nullKey;

            if (navigator.onLine) {

                if (storageType == "local") {
                    storageList = localStorage;
                    isAlreadyStored = checkStorageForCcu(ccuId, storageType);
                } else if (storageType == "session") {
                    storageList = sessionStorage;
                    isAlreadyStored = checkStorageForCcu(ccuId, storageType);
                } else {
                    return false;
                }
                if (!isAlreadyStored) {
                    storageList.setItem(ccuId, new Date().toISOString());
                    for (var i = 0; i < storageList.length; i++) {
                        if (i == 0) {
                            nullKey = storageList.key(i);
                        }
                        if (i > maxNumberOfLastSearches) {
                            storageList.removeItem(nullKey);
                        }
                    }
                    return true;
                } else if (isAlreadyStored && storageType == "local") {
                    for (var i in localStorage) {
                        if (i == ccuId) {
                            localStorage.removeItem(i);
                            return false;
                        }
                    }
                }
                return true;
            } else {
                return undefined;
            }
        }
    }]);