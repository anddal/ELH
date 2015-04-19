'use strict';

var ELHAppDirectives = angular.module('ELHAppDirectives');

ELHAppDirectives.directive('ddslick', function () {
    return {
        scope: {
            values: "&ioSelect",
            text: "@text",
            value: "@value",
            highlight: "=highlight",
            click: "=click",
            id: "@id"
        },

        link: function (scope, element) {
            var applyToScope = function (element, scopeFn) {
                var selectedValue = angular.element(element).children("a").children("input[type=hidden]").attr("value");
                angular.forEach(scope.values, function (value) {
                    if (value[scope.value] === selectedValue) {
                        scope.$apply(function () {
                            scopeFn(value);
                        });
                    }
                });
            };

            var buildSelectElement = function () {
                element.empty();
                angular.forEach(scope.values, function (item) {
                    element.append($("<option value='" + item[scope.value] + "'>" + item[scope.text] + "</option>"));
                });
            };

            var rebuildDdslick = function (fn) {
                element.ddslick('destroy');
                if (fn()) {
                    element.ddslick();
                }
            };

            var addHandlers = function () {
                angular.element("#" + scope.id).children("ul").children("li")
                    .mouseover(function (e) {
                        applyToScope(this, function (value) {
                            scope.highlight = value;
                        });
                    })
                    .click(function (e) {
                        applyToScope(this, function (value) {
                            scope.click = value;
                        });
                    });
            };

            scope.$watchCollection(scope.values, function (newValues) {
                scope.values = newValues;

                rebuildDdslick(function () {
                    if (!angular.isArray(scope.values) || scope.values.length === 0) return false;

                    buildSelectElement();
                    return true;
                });

                addHandlers();
            });
        }
    };
});


