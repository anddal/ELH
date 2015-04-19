'use strict';

var ELHAppControllers = angular.module('ELHAppControllers');

ELHAppControllers.controller('CcuInfoCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$filter', 'eventService', 'checkStorageForCcu', 'updateHeaderTitle', 'addCcuToStorage', 'getAllStoredCcus', 'provideCorrectEventTypeImgUrl', 'updateLocalStorage', 'ccuService', 'orgNoService', 'journeyService', 'provideGetPostImgUrl', 'toaster', 'createEventStateService', '$timeout',
    function ($scope, $location, $rootScope, $routeParams, $filter, eventService, checkStorageForCcu, updateHeaderTitle, addCcuToStorage, getAllStoredCcus, provideCorrectEventTypeImgUrl, updateLocalStorage, ccuService, orgNoService, journeyService, provideGetPostImgUrl, toaster, createEventStateService, $timeout) {
        $scope.orderProp = '-timestamp';
        $scope.openTab = 'eventhistory';
        $scope.openEvent = '';

        $scope.setActiveTab = function(tab){
            if(tab == $scope.openTab){
                $scope.openTab = '';
            } else {
                $scope.openTab = tab;
            }
        };

        $scope.setActiveEvent = function(event){
            if(event == $scope.openEvent){
                $scope.openEvent = '';
            }else {
                $scope.openEvent = event;
            }
        };

        ccuService.get($routeParams.ccuId)
            .success(function (ccu) {
                $scope.ccu = ccu;
                //ccuService.update(ccu);
                updateLocalStorage(ccu.ccuId);
                updateHeaderTitle('CCU Id: ' + ccu.ccuId);

                eventService.get(ccu.ccuId).
                    success(function (data) {
                        $scope.events = data;
                    }).
                    error(function (data, status, headers, config) {
                    });

                journeyService.get(ccu.ccuId).
                    success(function (data) {
                        var orgNrList = [];
                        $scope.journey = data;

                        orgNrList.push(ccu.orgNo, data.hire);
                        orgNoService.getAll(orgNrList).then(function (orgNameList) {
                            for (var org in orgNameList) {
                                if (ccu.orgNo = orgNameList[org].data.organizationNumber) {
                                    $scope.ccu.orgName = orgNameList[org].data.organizationName;
                                }
                                if (data.hire = orgNameList[org].data.organizationNumber) {
                                    $scope.journey.hireName = orgNameList[org].data.organizationName;
                                }
                            }
                            ;
                        });

                        orgNrList = [];
                        for (var leg in data.legs) {
                            orgNrList.push(data.legs[leg].transportOrgNo);
                        }
                        orgNoService.getAll(orgNrList).then(function (orgNameList) {
                            for (var leg in data.legs) {
                                if (data.legs[leg].transportOrgNo = orgNameList[leg].data.organizationNumber) {
                                    $scope.journey.legs[leg].transportOrgName = orgNameList[leg].data.organizationName;
                                }
                            }
                            ;

                        });

                    }).error(function () {

                    });

                $scope.checkExpiracy = function () {
                    return (
                        $filter('isExpired')($scope.ccu.certificate.expiryDate) ||
                        $filter('isExpired')($scope.ccu.imoCertificate.expiryDate));
                };
                favoriteCheck();
                addCcuToStorage($scope.ccu.ccuId, "session");
                $rootScope.sessionList = getAllStoredCcus("session");
            }).error(function (data, status) {
                $rootScope.errorstatus = status;
                $rootScope.errormessage = data;
                $location.path("/error/");
            });

        $scope.getEventTypeImageUrl = function (type) {
            return provideCorrectEventTypeImgUrl(type);
        };

        $scope.GetPostImgUrl = function (type) {
            return provideGetPostImgUrl(type);
        };

        $scope.$on('$viewContentLoaded', function () {
            if (createEventStateService.getState()) {
                var e = createEventStateService.getEvent();
                $timeout(function(){
                    toaster.pop('info', "Success", "Successfully added " + e + " event");
                },200);
            }
            createEventStateService.setState(false);
        });

        $scope.addToFavorites = function () {
            updateLocalStorage($scope.ccu.ccuId);
            $scope.favoritsBtnText = addCcuToStorage($scope.ccu.ccuId, "local");
            $rootScope.favoritsList = getAllStoredCcus("local");
        };

        $scope.updateLocalStorage = function () {
            updateLocalStorage($scope.ccu.ccuId);
        };



        /* Map handling */
        $scope.sendLatLng = function (readpoint) {

            var split = readpoint.split(';');
            var geo = split[0].split(':');
            var coords = geo[1].split(',');

            $rootScope.map = {
                lat: coords[0],
                long: coords[1]
            };
        };

        jQuery(function ($) {
            $(document).ready(function () {
                var map, mapDiv, marker;

                var appCache = window.applicationCache;
                switch (appCache.status) {
                    case appCache.UNCACHED: // UNCACHED == 0
                        console.log('UNCACHED');
                        break;
                    case appCache.IDLE: // IDLE == 1
                        console.log('IDLE');
                        break;
                    case appCache.CHECKING: // CHECKING == 2
                        console.log('CHECKING');
                        break;
                    case appCache.DOWNLOADING: // DOWNLOADING == 3
                        console.log('DOWNLOADING');
                        break;
                    case appCache.UPDATEREADY:  // UPDATEREADY == 4
                        console.log('UPDATEREADY');
                        break;
                    case appCache.OBSOLETE: // OBSOLETE == 5
                        console.log('OBSOLETE');
                        break;
                    default:
                        console.log('UKNOWN CACHE STATUS');
                        break;
                };


                function initialize(lat, long) {
                    var latlng = new google.maps.LatLng(lat, long);
                    var mapOptions = {
                        center: latlng,
                        zoom: 12,
                        mapTypeId: 'roadmap'
                    };

                    mapDiv = document.getElementById("map_canvas");
                    map = new google.maps.Map(mapDiv, mapOptions);

                    marker = new google.maps.Marker({
                        position: mapOptions.center,
                        map: map
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: "Latitude: " + lat + " / Longitude: " + long
                    });
                    infowindow.open(map, marker);
                }

                $('#myModal').on('shown.bs.modal', function () {
                    initialize($scope.map.lat, $scope.map.long);
                    google.maps.event.trigger(map, "resize");
                    map.setCenter(marker.getPosition());
                });
            });
        });
        /* End map handling */



        $rootScope.sessionList = getAllStoredCcus("session");
        $rootScope.favoritsList = getAllStoredCcus("local");

        function favoriteCheck() {
            $scope.favoritsBtnText = checkStorageForCcu($scope.ccu.ccuId, "local");
        }
    }])
;