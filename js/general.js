/**
 * 
 */

var gmap;
var gmarker;
function initMap() {
  gmap = new google.maps.Map(document.getElementById('mapcontainer'), {
    center: {lat: 25.235125, lng: 55.297963},
	scrollwheel: false,
    zoom: 16,
	draggable: true
  });
	
  gmarker = new google.maps.Marker({
    position: {lat: 25.235125, lng: 55.297963},
    map: gmap,
    title: 'Zumba Festival 2016, Zabeel Park'
  });
}

function showVenue(){
	gmap.setCenter({lat: 25.235125, lng: 55.297963});
	gmarker.setAnimation(google.maps.Animation.DROP);
	//setTimeout('gmarker.setAnimation(google.maps.Animation.BOUNCE)',2000);
};

var app = angular.module('Promo', ['angular-timeline','ngRoute','nemLogging','angular-scroll-animate','ui.router','jkuri.gallery','smoothScroll']);

/*app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
	
	
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDXnJvicDbYXPwfbatohOiwQdTtvBimT2w',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization',
    });
}]);*/

app.config(function($stateProvider) {
  $stateProvider.state('user', {
    url:         '',
    controller: 'AppController',
    templateUrl: 'example.html'
  });
});






app.controller('AppController', ['$scope','$rootScope','$document','$timeout','$window', function AppController($rootScope, $document, $timeout, $scope, $window) {
	
	var self = this;
 	
    self.images = [
        {thumb: 'images/thumbs/1.jpg', img: 'images/1.jpg', description: 'Image 1'},
        {thumb: 'images/thumbs/2.jpg', img: 'images/2.jpg', description: 'Image 2'},
        {thumb: 'images/thumbs/3.jpg', img: 'images/3.jpg', description: 'Image 3'},
        {thumb: 'images/thumbs/4.jpg', img: 'images/4.jpg', description: 'Image 4'},
		{thumb: 'images/thumbs/5.jpg', img: 'images/5.jpg', description: 'Image 5'},
        {thumb: 'images/thumbs/6.jpg', img: 'images/6.jpg', description: 'Image 6'},
        {thumb: 'images/thumbs/7.jpg', img: 'images/7.jpg', description: 'Image 7'},
        {thumb: 'images/thumbs/8.jpg', img: 'images/8.jpg', description: 'Image 8'},
		{thumb: 'images/thumbs/9.jpg', img: 'images/9.jpg', description: 'Image 9'},
        {thumb: 'images/thumbs/10.jpg', img: 'images/10.jpg', description: 'Image 10'},
        {thumb: 'images/thumbs/11.jpg', img: 'images/11.jpg', description: 'Image 11'}
    ];
	
	$(".ng-isolate-scope .ng-overlay").appendTo("body");
	$(".ng-isolate-scope .ng-overlay").remove();
	
	$(".ng-isolate-scope .ng-gallery-content").appendTo("body");
	$(".ng-isolate-scope .ng-gallery-content").remove();
	
	//BOC: time animations
	self.animateElementIn = function($el) {
		$el.removeClass('hidden');
		$el.addClass('bounce-in');
	};

	self.animateElementOut = function($el) {
		$el.addClass('hidden');
		$el.removeClass('bounce-in');
	};
	//EOC: time animations
	
	/*var areaLat      = 44.2126995,
      areaLng      = -100.2471641,
      areaZoom     = 3;

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map     = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
    $scope.options = { scrollwheel: false };
  });*/
	
	
	
}]);



app.directive('resize', function ($window) {
    return function (scope, element, attr) {

        var w = $window;
		
        scope.$watch(function () {
            return {
                'h': (document.querySelectorAll("body")[0]).offsetHeight, 
                'w': (document.querySelectorAll("body")[0]).offsetWidth
            };
        }, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.resizeHeight = function (percentH,marginTop,marginBottom,mode) {
                scope.$eval(attr.notifier);
				if(marginTop>0){
					scope.mTop=(newValue.w*marginTop/100);
				}
				else{
					scope.mTop=marginTop;
				}
				if(mode==0){
					return { 
						'height': (newValue.w*percentH/100) + 'px',
						'top': scope.mTop + 'px'
					};
				}
				else{
					return { 
						'height': (newValue.w*percentH/100) + 'px',
						'margin-top': scope.mTop + 'px'
					};
				}
				
                
            };
			
			
			

        }, true);
		
		

        angular.element(w).bind('resize', function () {
            scope.$apply();
        });
    }
}); 
//angular.element(document.querySelectorAll("#schedule")[0])
app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
		
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 200) {
                 scope.scrollTopClass = 'show';
             } else {
                 scope.scrollTopClass = 'hide';
             }
            scope.$apply();
        });
    };
});