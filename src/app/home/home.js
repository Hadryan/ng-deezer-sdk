angular.module('ngBoilerplate.home', ['ui.router']).config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        'main': {
          controller: 'HomeCtrl',
          templateUrl: 'home/home.tpl.html'
        }
      },
      data: { pageTitle: 'Home' }
    });
  }
]).controller('HomeCtrl', [
  '$scope',
  '$http',
  'deezer',
  function HomeController($scope, $http, deezer) {
    deezer.initPlayer({
      player: {
        container: 'player',
        format: 'horizontal',
        playlist: false,
        cover: false,
        height: 80
      }
    });
    $scope.play = function () {
      DZ.player.playAlbum('7723488');
    };
    deezer.api('album/7723488').then(function (resp) {
      $scope.album = resp;
    });
  }
]);