/**
 * Created by tomi on 19/01/16.
 */
angular.module('app')
    .directive('staticInclude', ['$http', '$templateCache', '$compile', function ($http, $templateCache, $compile) {
            return function(scope, element, attrs) {
                var templatePath = attrs.staticInclude;
                $http.get(templatePath, { cache: $templateCache }).success(function(response) {
                    var contents = element.html(response).contents();
                    $compile(contents)(scope);
                });
            };
    }])
    .directive('afterRender', ['$timeout', function ($timeout) {
        var def = {
            restrict: 'A',
            terminal: true,
            transclude: false,
            link: function (scope, element, attrs) {
                $timeout(scope.$eval(attrs.afterRender), 0);
            }
        };
        return def;
        //http://gsferreira.com/archive/2015/03/angularjs-after-render-directive/
    }])