angular.
  module('twitchSearch').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          template: '<stream-list></stream-list>'
        }).
        when('/:search/:perPage/:page', {
          template: '<stream-list></stream-list>'
        }).
        otherwise('/');
    }
  ])
