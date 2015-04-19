'use strict';

var ELHAppDirectives = angular.module('ELHAppDirectives');

ELHAppDirectives.directive('sideMenu', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/sidemenu.html'
    };
});