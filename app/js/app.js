'use strict';
var ELHAppControllers = angular.module('ELHAppControllers', []);
var ELHAppDirectives = angular.module('ELHAppDirectives', []);
var ELHAppServices = angular.module('ELHAppServices', ['ngResource']);
//var ELHAppToaster = angular.module('toaster', ['ngMockE2E']);

var ELHApp = angular.module('ELHApp', [
    'ngRoute',
    'ngAnimate',
    'ELHAppFilters',
    'ELHAppServices',
    'ELHAppDirectives',
    'ELHAppControllers',
    'toaster'
]);

//var ELHAppMockDev = angular.module('ELHAppMockDev', ['ELHApp', 'ngMockE2E']);

ELHApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/search', {
                templateUrl: 'partials/ccusearch.html',
                controller: 'SearchCtrl'
            }).when('/index', {
                templateUrl: 'partials/ccusearch.html',
                controller: 'SearchCtrl'
            }).when('/', {
                templateUrl: 'partials/ccusearch.html',
                controller: 'SearchCtrl'
            }).when('/ccu/:ccuId', {
                templateUrl: 'partials/ccuinfo.html',
                controller: 'CcuInfoCtrl'
            }).when('/ccu/:ccuId/registerevent', {
                templateUrl: 'partials/registerevent.html',
                controller: 'RegisterEventCtrl'
            }).when('/error/', {
                templateUrl: 'partials/error.html',
                controller: 'ErrorCtrl'
            }).when('/contact/', {
                templateUrl: 'partials/contactinfo.html',
                controller: 'ContactCtrl'
            }).when('/manifest.appcache', {
                templateUrl: '/manifest.appcache'
            }).
            otherwise({redirectTo: '/'});
    }]);
