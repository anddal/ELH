'use strict';

var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory('checkStorageForCcu',
    function () {
        return function (ccuId, storageType) {
            if (navigator.onLine && ccuId != undefined) {
                var storageList = {};

                switch(storageType){
                    case 'local':
                        storageList = localStorage;
                        break;
                    case 'session':
                        storageList = sessionStorage;
                        break;
                    default:
                        return undefined;
                }

                for (var key in storageList) {

                    if (key == ccuId) {
                        return true;
                    }
                }
                return false;

            } else {
                return false;
            }
        }
    });
