'use strict';

var ELHAppDirectives = angular.module('ELHAppDirectives');

ELHAppDirectives.directive('preventInstantEscape', function(){
    return {
        restrict: "A",
        link: function(scope, elem, attrs){
            $('.sidemenu').click(function(e){
                e.stopPropagation();
            });
        }
    }
});