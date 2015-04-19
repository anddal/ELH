'use strict';

var ELHAppDirectives = angular.module('ELHAppDirectives');

ELHAppDirectives.directive('exitSidemenu', function(){
    return {
        restrict: "A",
        link: function(scope, elem, attrs){
            $(elem).click(function(event){
                escapeMenu();
            });

            function escapeMenu(){
                if($('#content-canvas').hasClass('show-nav')){
                    $('#content-canvas').removeClass('show-nav');
                    $('.fixed-header').removeClass('show-nav');
                    $('.sidemenu').removeClass('show-nav');
                }
            }
        }
    }
});