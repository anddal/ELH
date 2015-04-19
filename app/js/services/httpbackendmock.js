'use strict';

(function (module, angular) {
    var state = true;

    module.factory('getCcuFromResource', ['$resource',
        function ($resource) {
            return $resource('testdata/:ccuId.json', {}, {
                get: {method: 'GET', params: {ccuId: 'ccuId'},
                    isArray: false }
            })
        }]);

    module.factory('MockEventStateService',
        function () {
            return {
                setState: function (inputState) {
                    state = inputState;
                },
                getState: function () {
                    return state;
                }
            }
        });

    module.factory('TESTaddCcuToStorage',
        function () {
            return function () {
                var past = "2011-03-12T08:21:00Z";
                localStorage.setItem(365891, past);
                return null;
            }
        }
    );

    module.run(function ($httpBackend, MockEventStateService, TESTaddCcuToStorage) {
        if (MockEventStateService.getState() == true) {
            TESTaddCcuToStorage();
            MockEventStateService.setState(false);
        }
        var eventsRegEx = /\/events\/[0-9]+/,
            ccuRegEx = /\/ccu\/[0-9]+/,
            orgNrRegEx = /\/orgnr\/[0-9]+/,
            journeyRegEx = /\/journey\/[0-9]+/;

        $httpBackend.whenPOST('/events').respond(function (method, url, data) {
            var newEvent = angular.fromJson(data);
            events.push(newEvent);
            return [201, newEvent, {}];
        });

        $httpBackend.whenGET(eventsRegEx).respond(function (method, url) {
            var ccuId = getIdFromURL(url),
                returnList = [];

            for (var event in events) {
                if (events[event].ccuId == ccuId) {
                    returnList.push(events[event]);
                }
            }
            if (returnList.length == 0) {
                return [404, "Not Found!", {}];
            }

            return [200, returnList, {}];
        });

        $httpBackend.whenGET(ccuRegEx).respond(function (method, url) {
            var ccuId = getIdFromURL(url);

            for (var ccu in ccus) {
                if (ccus[ccu].ccuId == ccuId) {
                    return [200, ccus[ccu], {}];
                }
            }
            return [404, "Not Found!", {}];
        });


        $httpBackend.whenGET(orgNrRegEx).respond(function (method, url) {
            var orgnrId = getIdFromURL(url);
            for (var orgnr in orgnrList) {
                if (orgnrList[orgnr].organizationNumber == orgnrId) {
                    return [200, orgnrList[orgnr], {}];
                }
            }
            return [404, "Not Found!", {}];
        });

        $httpBackend.whenGET(journeyRegEx).respond(function (method, url) {
            var journeyId = getIdFromURL(url);
            for (var id in journeyList) {
                if (journeyList[id].ccuId == journeyId) {
                    return [200, journeyList[id], {}];
                }
            }
            return [404, "Not Found!", {}];
        });

        $httpBackend.whenGET(/.*/).passThrough();
        $httpBackend.whenPOST(/.*/).passThrough();

        function getIdFromURL(url) {
            var returnList = [];
            var n = url.lastIndexOf('/');
            return url.substring(n + 1);
        }
    });

    var events = [
        {
            "eventId": 1111234232,
            "timestamp": "2014-02-06T13:21:00Z",
            "ccuId": 141705,
            "eventType": "arriving",
            "eventReadPoint": "geo:59.917774,10.706177;crs=wgs84;u=5",
            "eventLocation": 5555548887979
        },
        {
            "eventId": 2222234232,
            "timestamp": "2014-03-12T08:21:00Z",
            "ccuId": 763851,
            "eventType": "inspecting",
            "eventReadPoint": "geo:59.738731,10.226898;crs=wgs84;u=5",
            "eventLocation": 1222267890123
        },
        {
            "eventId": 3353234232,
            "timestamp": "2012-03-13T11:11:00Z",
            "ccuId": 141705,
            "eventType": "departing",
            "eventReadPoint": "geo:61.934504,5.107613;crs=wgs84;u=5",
            "eventLocation": 1111117890123
        },
        {
            "eventId": 5655534232,
            "timestamp": "2012-03-12T08:21:00Z",
            "ccuId": 365891,
            "eventType": "packing",
            "eventReadPoint": "geo:60.809846,5.031910;crs=wgs84;u=5",
            "eventLocation": 8888867890123
        },
        {
            "eventId": 1121234232,
            "timestamp": "2014-02-06T13:21:00Z",
            "ccuId": 141705,
            "eventType": "arriving",
            "eventReadPoint": "geo:60.809846,5.031910;crs=wgs84;u=5",
            "eventLocation": 5555548887979
        },
        {
            "eventId": 3333234232,
            "timestamp": "2012-03-13T11:11:00Z",
            "ccuId": 763851,
            "eventType": "departing",
            "eventReadPoint": "geo:60.809846,5.031910;crs=wgs84;u=5",
            "eventLocation": 1111117890123
        },
        {
            "eventId": 5555534232,
            "timestamp": "2012-03-12T08:21:00Z",
            "ccuId": 365891,
            "eventType": "packing",
            "eventReadPoint": "geo:60.809846,5.031910;crs=wgs84;u=5",
            "eventLocation": 8888867890123
        },
        {
            "eventId": 1121234232,
            "timestamp": "2014-02-06T13:21:00Z",
            "ccuId": 123456,
            "eventType": "arriving",
            "eventReadPoint": "geo:60.809846,5.031910;crs=wgs84;u=5",
            "eventLocation": 5555548887979
        },
        {
            "eventId": 3333234232,
            "timestamp": "2012-03-13T11:11:00Z",
            "ccuId": 123456,
            "eventType": "departing",
            "eventReadPoint": "geo:61.934504,5.107613;crs=wgs84;u=5",
            "eventLocation": 1111117890123
        },
        {
            "eventId": 5555534232,
            "timestamp": "2012-03-12T08:21:00Z",
            "ccuId": 123456,
            "eventType": "packing",
            "eventReadPoint": "geo:61.934504,5.107613;crs=wgs84;u=5",
            "eventLocation": 8888867890123
        }
    ];
    var ccus = [
        {
            "ccuId": 123456,
            "orgNo": 223456789,
            "gln": 1234567890123,
            "ccuClass": "Basket",
            "ccuSubClass": "Half High Basket",
            "ccuOwnerId": 139428,
            "payload": 4300,
            "tareWeight": 1700,
            "maxGrossWeight": 6000,
            "length": 4,
            "width": 4,
            "height": 2.8,

            "r002Compliance": true,
            "certificate": {
                "certificateNumber": 133609,
                "expiryDate": "2015-05-30T09:30:10Z"
            },
            "imoCertificate": {
                "certificateNumber": 133643,
                "expiryDate": "2017-05-30T09:30:10Z"
            },
            "link": {
                "href": "events.json",
                "method": "get",
                "rel": "Events",
                "type": "application/pdf"
            }
        },
        {
            "ccuId": 141705,
            "orgNo": 223456789,
            "gln": 1234567890123,
            "ccuClass": "Basket",
            "ccuSubClass": "Half High Basket",
            "ccuOwnerId": 133428,
            "payload": 4300,
            "tareWeight": 1700,
            "maxGrossWeight": 6000,
            "length": 4,
            "width": 4,
            "height": 2.8,

            "r002Compliance": true,
            "certificate": {
                "certificateNumber": 133609,
                "expiryDate": "2015-05-30T09:30:10Z"
            },
            "imoCertificate": {
                "certificateNumber": 133643,
                "expiryDate": "2002-05-30T09:30:10Z"
            },
            "link": {
                "href": "events.json",
                "method": "get",
                "rel": "Events",
                "type": "application/pdf"
            }
        },
        {
            "ccuId": 365891,
            "orgNo": 223456789,
            "gln": 1234567890123,
            "ccuClass": "Basket",
            "ccuSubClass": "Chemical Basket",
            "ccuOwnerId": 133428,
            "payload": 4300,
            "tareWeight": 1700,
            "maxGrossWeight": 6000,
            "length": 4,
            "width": 4,
            "height": 2.8,

            "r002Compliance": true,
            "certificate": {
                "certificateNumber": 133609,
                "expiryDate": "2015-02-03"
            },
            "imoCertificate": {
                "certificateNumber": 133643,
                "expiryDate": "2014-08-03"
            },
            "link": {
                "href": "events.json",
                "method": "get",
                "rel": "Events",
                "type": "application/pdf"
            }
        },
        {
            "ccuId": 763851,
            "orgNo": 223456789,
            "gln": 1234567890123,
            "ccuClass": "Container",
            "ccuSubClass": "Nuclear Container",
            "ccuOwnerId": 133428,
            "payload": 4300,
            "tareWeight": 1700,
            "maxGrossWeight": 6000,
            "length": 4,
            "width": 4,
            "height": 2.8,

            "r002Compliance": true,
            "certificate": {
                "certificateNumber": 133609,
                "expiryDate": "2015-02-03"
            },
            "imoCertificate": {
                "certificateNumber": 133643,
                "expiryDate": "2014-08-03"
            },
            "link": {
                "href": "events.json",
                "method": "get",
                "rel": "Events",
                "type": "application/pdf"
            }
        }
    ];
    var orgnrList = [
        {
            "organizationNumber": 123456789,
            "organizationName": "Chevron"
        },
        {
            "organizationNumber": 223456789,
            "organizationName": "Statoil ASA"
        },
        {
            "organizationNumber": 323456789,
            "organizationName": "AS Norske Shell"
        },
        {
            "organizationNumber": 423456789,
            "organizationName": "ConocoPhillips AS"
        },
        {
            "organizationNumber": 523456789,
            "organizationName": "Total E&P Norge AS"
        },
        {
            "organizationNumber": 623456789,
            "organizationName": "Lundin Norway AS"
        }
    ];

    var journeyList = [
        {
            "ccuId": 123456,
            "enclosingHireIds": {
                "id": "a9"
            },
            "originGln": 1234567890123,
            "destinationGln": 2345678901234,
            "eta": "2013-10-09T15:02:33Z",
            "ata": "2014-11-08T02:14:32Z",
            "hire": 523456789,
            "legs": [
                {
                    "id": 140,
                    "transportOrgNo": 223456789,
                    "etd": "2014-09-01T09:30:10Z",
                    "eta": "2014-09-02T09:30:10Z",
                    "ata": "2014-10-08T02:14:32Z"
                },
                {
                    "id": 141,
                    "transportOrgNo": 223456789,
                    "etd": "2013-09-14T09:30:10Z",
                    "eta": "2013-09-21T09:30:10Z",
                    "ata": "2013-10-01T02:14:32Z"
                }
            ]
        },
        {
            "ccuId": 141705,
            "enclosingHireIds": {
                "id": "a1"
            },
            "originGln": 1234567890123,
            "destinationGln": 2345678901234,
            "eta": "2013-10-09T15:02:33Z",
            "ata": "2013-11-08T02:14:32Z",
            "hire": 323456789,
            "legs": [
                {
                    "id": 123,
                    "transportOrgNo": 323456789,
                    "etd": "2013-09-01T09:30:10Z",
                    "eta": "2013-09-02T09:30:10Z",
                    "ata": "2013-09-08T02:14:32Z"
                },
                {
                    "id": 124,
                    "transportOrgNo": 223456789,
                    "etd": "2013-09-14T09:30:10Z",
                    "eta": "2013-09-21T09:30:10Z",
                    "ata": "2013-10-01T02:14:32Z"
                }
            ]
        },
        {
            "ccuId": 365891,
            "enclosingHireIds": {
                "id": "a2"
            },
            "originGln": 1234567890123,
            "destinationGln": 2345678901234,
            "eta": "2014-06-09T15:02:33Z",
            "ata": "2014-06-27T02:14:32Z",
            "hire": 423456789,
            "legs": [
                {
                    "id": 126,
                    "transportOrgNo": 223456789,
                    "etd": "2014-06-05T09:30:10Z",
                    "eta": "2014-06-06T09:30:10Z",
                    "ata": "2014-06-27T02:14:32Z"
                }
            ]
        },
        {
            "ccuId": 763851,
            "enclosingHireIds": {
                "id": "a3"
            },
            "originGln": 1234567890123,
            "destinationGln": 2345678901234,
            "eta": "2013-10-09T15:02:33Z",
            "ata": "2013-11-08T02:14:32Z",
            "hire": 423456789,
            "legs": [
                {
                    "id": 127,
                    "transportOrgNo": 123456789,
                    "etd": "2013-09-01T09:30:10Z",
                    "eta": "2013-09-02T09:30:10Z",
                    "ata": "2013-09-08T02:14:32Z"
                },
                {
                    "id": 128,
                    "transportOrgNo": 223456789,
                    "etd": "2013-09-14T09:30:10Z",
                    "eta": "2013-09-21T09:30:10Z",
                    "ata": "2013-10-01T02:14:32Z"
                },
                {
                    "id": 129,
                    "transportOrgNo": 123456789,
                    "etd": "2013-09-28T09:30:10Z",
                    "eta": "2013-10-03T09:30:10Z"
                }
            ]
        }
    ];


    angular.module('ELHApp').requires.push('ELHAppMockDev');

}(angular.module('ELHAppMockDev', ['ELHApp', 'ngMockE2E']), angular));
