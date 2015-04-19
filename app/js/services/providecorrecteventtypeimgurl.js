var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory('provideCorrectEventTypeImgUrl',
    function () {
        return function (eventType) {
            var lowercaseEventType = eventType.toLowerCase();
            switch (lowercaseEventType) {
                case 'arriving':
                    return 'img/events/arriving.png';
                case 'departing':
                    return 'img/events/departing.png';
                case 'inspecting':
                    return 'img/events/inspecting.png';
                case 'internal moving':
                    return 'img/events/internal_moving.png';
                case 'loading':
                    return 'img/events/loading.png';
                case 'unloading':
                    return 'img/events/unloading.png';
                case 'packing':
                    return 'img/events/packing.png';
                default:
                    return 'img/events/default.png';
            }
        };
    });