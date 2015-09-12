app = angular.module('app', ['cycleGallery'])

app.controller 'AppController', ($scope) ->

  $scope.otherItems = [
    {text: 'First'}
    {text: 'Second'}
  ]

  $scope.gallery = [
    {text: 'Item 1', color: 'red'}
    {text: 'Item 2', color: 'blue'}
    {text: 'Item 3', color: 'green'}
    {text: 'Item 4', color: 'yellow'}
    {text: 'Item 5', color: 'black'}
    {text: 'Item 6', color: 'grey'}
    {text: 'Item 7', color: 'purple'}
    {text: 'Item 8', color: 'darkgreen'}
    {text: 'Item 9', color: 'darkblue'}
    {text: 'Item 10', color: 'yellow'}
    {text: 'Item 11', color: 'darkgrey'}
  ]

  $scope.baseIndex = 5
  $scope.showGallery = true

  _gallery = null

  $scope.onGalleryInit = (gallery) -> _gallery = gallery

  $scope.add = ->
    count = $scope.gallery.length
    $scope.gallery.push text: "Item #{count}"
    _gallery.setIndex(1)

  $scope.toggleGallery = ->
    $scope.showGallery = !$scope.showGallery