var ELHAppServices = angular.module('ELHAppServices');

ELHAppServices.factory('checkLocalStorageForNewEventsForWatchList', ['eventService', '$q', function (eventService, $q) {
    return function (watchList) {
        var numberOfUncheckedEvents = 0,
            updatedWatchList = [];

        function getCcuFromWatchlist(ccuId) {
            for (var i in watchList) {
                if (watchList[i].ccuId == ccuId) {
                    return watchList[i];
                }
            }
        }

        if (watchList == undefined) {
            return updatedWatchList;
        } else {

            if (navigator.onLine) {
                var getCalls = [];

                for (var ccu in watchList) {
                    getCalls.push(eventService.get(watchList[ccu].ccuId));
                }
                $q.all(getCalls).then(function (results) {

                    for (var index in results) {

                        var events = results[index].data;

                        for (event in events) {
                            if(events[event] != undefined){
                            var ccu = getCcuFromWatchlist(events[event].ccuId);

                            if (events[event].timestamp > ccu.timestamp) {
                                numberOfUncheckedEvents++;
                            }
                            } else {
                                var ccu = {
                                    'ccuId': 'IE BUG o_0',
                                    'unchecked': 0,
                                    'timestamp': new Date().toISOString()
                                }
                            }
                        }
                        updatedWatchList.push({ccuId: ccu.ccuId, unchecked: numberOfUncheckedEvents, timestamp: ccu.timestamp});
                        numberOfUncheckedEvents = 0;
                    }
                });

            }

            return updatedWatchList;

        }
    }
}]);
