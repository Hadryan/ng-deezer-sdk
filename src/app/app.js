angular.module('ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ui.router',
  'gianarb.deezer'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  '$deezerProvider',
  function myAppConfig($stateProvider, $urlRouterProvider, $deezerProvider) {
    $deezerProvider.setChannelUrl('/channel.html');
    $deezerProvider.setAppId('122065');
    $urlRouterProvider.otherwise('/home');
  }
]).run(function run() {
}).controller('AppCtrl', [
  '$scope',
  '$location',
  function AppCtrl($scope, $location) {
  }
]);