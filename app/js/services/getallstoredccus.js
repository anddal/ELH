'use strict';

var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory('getAllStoredCcus',
    function () {
        return function (storageType) {
            if (navigator.onLine) {
                var storageList,
                    ccuList = [];
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

                for (var i in storageList) {
                    ccuList.push({ccuId: parseInt(i), timestamp: storageList[i]});
                }
               // ccuList.reverse();
                return ccuList;
            } else {
                return undefined;
            }
        }
    });