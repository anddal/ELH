(function (module, angular) {
    module.factory("interceptor", function ($timeout, $rootScope, $q) {
        return {
            'request': function (config) {
                if (config.method === 'GET') {
                    var requestUrl = config.url.toString();
                    var n = requestUrl.lastIndexOf('/');
                    requestUrl = requestUrl.substring(n + 1);

                    if (requestUrl.match(/[0-9]+/)) {
                        $rootScope.isLoadingRequest = false;
                        return config;
                    }
                }
                $rootScope.isLoadingRequest = true;
                return $timeout(function () {
                    return config;
                }, 500);
            },
            'requestError': function (rejection) {
                $rootScope.isLoadingRequest = true;
                return $q.reject(rejection);
            },
            'response': function (response) {
                $rootScope.isLoadingRequest = false;
                return response;
            },
            'responseError': function (rejection) {
                $rootScope.isLoadingRequest = false;
                return $q.reject(rejection);
            }
        };
    })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push("interceptor");
        });
    angular.module('ELHApp').requires.push('ELHAppInterceptor');

}(angular.module('ELHAppInterceptor', ['ELHApp']), angular));
