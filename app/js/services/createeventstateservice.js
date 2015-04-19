'use strict';

var ELHAppServices = angular.module('ELHAppServices');
var state;
var event;

ELHAppServices.factory('createEventStateService',
    function () {
        return {
            setState: function (inputState, addedEvent) {
                state = inputState;
                event = addedEvent;
            },
            getState: function () {
                return state;
            },
            getEvent: function(){
                return event;
            }
        }
    });

