'use strict';

var ELHAppDirectives = angular.module('ELHAppDirectives');

ELHAppDirectives.directive('loaderGif', function () {
    return {
        rootScope: {
            displayGif: '='
        },
        replace: true,
        template: '<img style="display: {{displayGif}}" src="img/ajax-loader.gif"/>'
    }
});