'use strict';

var ELHAppControllers = angular.module('ELHAppControllers');

ELHAppControllers.controller('ContactCtrl', ['updateHeaderTitle',
    function(updateHeaderTitle){
        updateHeaderTitle("Contact");

}]);