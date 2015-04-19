var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory('provideGetPostImgUrl',
    function () {
        return function (type) {
            var lowercaseType = type.toLowerCase();
            switch (lowercaseType) {
                case 'getjourney':
                    return 'img/getSymbols/GetJourney.png';
                case 'getleg':
                    return 'img/getSymbols/GetLeg.png';
                case 'getdocumentwhite':
                    return 'img/getSymbols/get-document-white.png';
                case 'getinspectionwhite':
                    return 'img/getSymbols/get-inspection-white.png';
                case 'getjourneywhite':
                    return 'img/getSymbols/get-journey-white.png';
                case 'getlegwhite':
                    return 'img/getSymbols/get-leg-white.png';
                case 'getorganizationwhite':
                    return 'img/getSymbols/get-organisation-white.png';
                case 'getreadingwhite':
                    return 'img/getSymbols/get-reading-white.png';
                case 'getccuwhite':
                    return 'img/getSymbols/get-ccu-white.png';

                default:
                    return 'img/events/default.png';
            }
        };
    });