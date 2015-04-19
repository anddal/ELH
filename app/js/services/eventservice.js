'use strict';

var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory("eventService", function ($http) {
    return {
        get: function (ccuId) {
            var requestString = "/events/"+ccuId.toString();
            return $http.get(requestString);
        },
        post: function (event) {
            return $http.post("/events",event);
        },
        getEventListForSelectBox: function(){
            return [
                {
                    text: "Inspecting",
                    value: 1,
                    selected: true,
                    imageSrc: "img/events/Inspecting.png"
                },
                {
                    text: "Arriving",
                    value: 2,
                    selected: false,
                    imageSrc: "img/events/Arriving.png"
                },
                {
                    text: "Departing",
                    value: 3,
                    selected: false,
                    imageSrc: "img/events/Departing.png"
                },
                {
                    text: "Unloading",
                    value: 4,
                    selected: false,
                    imageSrc:  "img/events/Unloading.png"
                },{
                    text: "Loading",
                    value: 5,
                    selected: false,
                    imageSrc: "img/events/Loading.png"
                },{
                    text: "Internal Moving",
                    value: 6,
                    selected: false,
                    imageSrc: "img/events/Internal_Moving.png"
                },{
                    text: "Packing",
                    value: 7,
                    selected: false,
                    imageSrc: "img/events/Packing.png"
                }
            ];
        }
    }
});
