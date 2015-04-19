'use strict';

var ELHAppControllers = angular.module('ELHAppControllers');

ELHAppControllers.controller('RegisterEventCtrl', ['$resource', '$scope', 'eventService', '$location', '$routeParams', 'provideCorrectEventTypeImgUrl', 'createEventStateService',
    function ($resource, $scope, eventService, $location, $routeParams, provideCorrectEventTypeImgUrl, createEventStateService) {

        var eventListForSelectBox = eventService.getEventListForSelectBox();

        $scope.myEventType = eventListForSelectBox[0];
        $scope.eventPickerActive = false;

        $scope.activateEventPicker = function(arg) {
            console.log("TEST" + arg);
            if(arg == $scope.eventPickerActive){
            }else{
                $scope.eventPickerActive = arg;
            }
        };

        jQuery(function ($) {
            $('#myDropdown').ddslick({
                data: eventListForSelectBox,
                width: $('#myDropdown').width($('#myDropdown').parent().width()),
                selectText: "Select Event To Add",
                imagePosition: "left",
                onSelected: function (selectedData) {
                    $scope.myEventType.eventType = eventListForSelectBox[selectedData.selectedIndex].text;
                    if (selectedData.selectedIndex == 0) {
                        $('#inspectionExpand').show();
                    } else {
                        $('#inspectionExpand').hide();
                    }
                }
            });
        });

        $scope.sendPost = function () {
            $scope.newEvent = {
                "eventId": getRandomId(),
                "timestamp": new Date().toISOString(),
                "ccuId": $routeParams.ccuId,//$scope.ccu.ccuId,
                "eventType": $scope.myEventType.eventType,
                "eventReadPoint": "geo:59.912551, 10.635924;crs=wgs84;u=5",
                "eventLocation": 988767562390
                //"comment": $scope.eventCommentArea
            };

            $scope.jsonTest = angular.toJson($scope.newEvent, true);

            eventService.post($scope.newEvent).
                success(function () {
                    createEventStateService.setState(true, $scope.myEventType.eventType);
                    $location.path("/ccu/" + $routeParams.ccuId);
                }).
                error(function (data, status) {
                    createEventStateService.setState(false);
                    $scope.errorstatus = status;
                    $scope.errormessage = data;
                    $location.path("/error/");
                });
        };

        $scope.back = function () {
            $location.path("/ccu/" + $routeParams.ccuId);
        };

        $scope.getEventTypeImageUrl = function (type) {
            return provideCorrectEventTypeImgUrl(type);
        };

        function getRandomId() {
            return Math.floor((Math.random() * 6000) + Math.random() + (Math.random() * 10) + (Math.random() * 100) + (Math.random() * 90000));
        };
    }]);