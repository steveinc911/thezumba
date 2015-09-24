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

var app = angular.module('Promo', ['angular-timeline','ngRoute','nemLogging','angular-scroll-animate','ui.router','jkuri.gallery','smoothScroll','ngDialog']);

/*app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
	
	
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDXnJvicDbYXPwfbatohOiwQdTtvBimT2w',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization',
    });
}]);*/

app.config(function($stateProvider) {
  $stateProvider.state('user', {
    url:         '*path',
    controller: 'AppController',
    templateUrl: 'example.html'
  });
});


/* BOC: FB Gallery */

//Initilizations
	  var _AppId = '142809216066672';  //App id for your app 
	  
	  var _PageId = '1490322427928620'; //Page id
	  
	  var _AccessToken ='CAAXCg1gZA4vgBAMNZCmlGDMcNtrjnaf1ZCWt72xa00COCEMgpF2DZBtWZCvCO5XDOlhuoWUIMRsb9OvindAeSYPlsO6qriTKOqf1m5yharkLnB8nlDGL5ay1MzXUDzUbowClgW28fMIGYZB5nWBXwvufj6xxuOgPxPTxdTtkJD7i754hT1TKjHkrjSxo4SZBtUZD';
	  
	  
	  //Load the Facebook SDK asynchronously
	  (function(d, s, id) {
		    console.log('load sdk');
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));  
	  
	//facebook SDK initilization event fired after loading the SDK  
	window.fbAsyncInit = function() {
		  console.log('fb async init');
		  //should execute when the sdk is  loaded
		  FB.init({
			appId      : _AppId,  
			cookie     : true,  // enable cookies to allow the server to access the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.4' // use version 2.2
		  });
	};
	  
	  
	function FBFetchImageReqRes(NodeId){
		this.Query = '/' + NodeId + '?fields=height,width,images';  //Api request query
		this.HandleResponse = function(response){
			if (response && !response.error) {
				
				    //Getting the index of image link of the preferred width
				    var _PreferredWidth =  800;
				    var _WidthDiff = 0;
				    var _LowestPositiveDiff = 10000;
				     var _LowestPositiveIndex = 0;
					for(var i = 0; i < response.images.length; i++){
						
						widthDiff =  response.images[i].width - _PreferredWidth;
						
						if(widthDiff == 0){ //exact match
							_LowestPositiveIndex = i;
							break;
						} else if(widthDiff > 0){  //Positive width difference
							
							if(_LowestPositiveDiff > widthDiff){
							    _LowestPositiveDiff = widthDiff;
								_LowestPositiveIndex = i;
							}
						}
					} //end for loop
				
				//console.log("height:" + response.images[_LowestPositiveIndex].height + " " + " Width:" + response.images[_LowestPositiveIndex].width);
				var img = document.createElement("img");
				//Images have links to images of dofferent sizes
				img.setAttribute("src", response.images[_LowestPositiveIndex].source);
				img.setAttribute("height", response.images[_LowestPositiveIndex].height);
				img.setAttribute("width", response.images[_LowestPositiveIndex].width);
				
				
				var div = document.getElementById("img-frame")
				div.appendChild(img);
				
			} //end if (response && !response.error)
			
			//document.getElementById("resp").innerHTML = JSON.stringify(response);
			
		} //end this.HandleResponse
	}
	  
	 
	//contains the image info needed to fetch the image
	function ImageInfo(Height, Width, Url){
		this.height = Height;
		this.width = Width;
		this.url = Url;
	}
	  
	//This will contain FB image info
	function FBGalleryImage(ThumbInfo, ImageInfo, LikeCount, CommentCount, LikesUserIDArray, Description, FBImageID){
		this.thumb = ThumbInfo;  //will contain height width and link
		this.image = ImageInfo;  //height width and link
		this.likes = LikeCount;
		this.commentcount = CommentCount;
		this.likedUserID = LikesUserIDArray;
		this.description = Description;
		this.fbID = FBImageID;
	}
	  
	function getPreferredImageIndex(ImageArray, PreferredWidth){
		/*
		  Gets the index of the image object with width equal to or greater then preferred width
		*/
		
		var _WidthDiff = 0;
		var _ImageIndex = 0;
		var _LowestPositiveWidthDiff = 10000;
		
		for(var i = 0; i < ImageArray.length; i++){
			
			_WidthDiff =  ImageArray[i].width - PreferredWidth;

			if(_WidthDiff == 0){
				_ImageIndex = i;
				break;
			} else if(_WidthDiff > 0){  //Positive width difference

				//finding the lowest positive width difference
				if(_LowestPositiveWidthDiff > _WidthDiff){ 
					_LowestPositiveWidthDiff = _WidthDiff;
					_ImageIndex = i;
				}
			}
		} //end loop
		
		return _ImageIndex;
		
	}//end getImageIndex
	  
	function FetchAlbumPhotos(AlbumID){
		this.Query = '/' + AlbumID + '?fields=photos{name,images,likes.summary(true),comments.summary(true)}';
		this.CallBackFunction = function(ImageArray){ console.log('do nothing'); };
		this.HandleResponse = function(response){
			
			if (response && !response.error) {
				
				_GallaryImageArray = [];
				
				var _ResponseData = response.photos.data;
				
				//console.log('response data: ' + JSON.stringify(_ResponseData));
				
				var preferredThumbWidth = 240;
				var thumbIndex = 0;
				
				var preferredImageWidth = 800;
				var imageIndex = 0;
				
				var _ThumbInfo;
				var _ImageInfo;
				var _GallaryImage;
				
				var _Desc = '';
				
				//loops through photo list
				for(var i = 0; i < _ResponseData.length; i++){

					thumbIndex = getPreferredImageIndex(_ResponseData[i].images, preferredThumbWidth);
					
					// console.log(' thumb index: ' + thumbIndex);
					_ThumbInfo = new ImageInfo( _ResponseData[i].images[thumbIndex].height, 
											   	_ResponseData[i].images[thumbIndex].width,
											   _ResponseData[i].images[thumbIndex].source
											  );
					
				    //console.log(' thumb info: ' + JSON.stringify(_ThumbInfo));
					
					imageIndex = getPreferredImageIndex(_ResponseData[i].images, preferredImageWidth);
					
					_ImageInfo = new ImageInfo( _ResponseData[i].images[imageIndex].height, 
											   	_ResponseData[i].images[imageIndex].width,
											   _ResponseData[i].images[imageIndex].source
											  );
					
					//console.log(' image info: ' + JSON.stringify(_ImageInfo));
					
					
					
					if(_ResponseData[i].name){
						_Desc = _ResponseData[i].name;
					}else{
						_Desc = '';
					}
					
					_GallaryImage = new FBGalleryImage(_ThumbInfo, 
													   _ImageInfo, 
													   _ResponseData[i].likes.summary.total_count,   //Likes
													   _ResponseData[i].comments.summary.total_count,   //CommentCount
													   _ResponseData[i].likes.data,   //LikesUserIDArray
													   _Desc,  //Description this can be undefined if there is no descripton
													   _ResponseData[i].id); //FBImageID
					
					//console.log(' image info: ' + JSON.stringify(_GallaryImage));
					
					//setting thumb details
					_GallaryImageArray.push(_GallaryImage);
					
				}//for loop
				
				console.log(' calling back');
				
				this.CallBackFunction(_GallaryImageArray);
				
			}else{
				
				this.CallBackFunction(response); //Error passed down
			}// end if (response && !response.error)
			
			
			
			
		}// end this.HandleResponse
	}
	  
	function FBLikePhoto(FBPhotoID, LikeArray){
		
	}
	  
	//object to handle FB get API calls
	function FBApiGetCall( AccessToken, //valid access token
						   ApiReqResHandler)  //function that can handle the response
	{
		FB.api(ApiReqResHandler.Query,
			   'get',
			   { access_token : AccessToken },
			   function(response) {
			       ApiReqResHandler.HandleResponse(response);
               });
	}	  
	  
	function FBApiPostCall(AccessToken, ApiCallHandler){
			   FB.api(ApiCallHandler.Query,
			   'post',
			   { access_token : AccessToken },
			   function(response) {
			       ApiCallHandler.HandleResponse(response);
               });
	}

	  
	function loadAlbumData(){
		var _albumId = '1490323137928549';
		//var fbPhotoreqRes = new FBAlbumPhotosReqRes(_albumId);
		var fbPhotoreqRes = new FetchAlbumPhotos(_albumId);
		fbPhotoreqRes.CallBackFunction = function(ImageArray){console.log(ImageArray);};
		FBApiGetCall(_AccessToken, fbPhotoreqRes);
	}

	 
	function FBGetPageLikes(pageId){
		this.Query = pageId + "?fields=likes";
		this.Callback = function(likeCount){};
		this.HandleResponse = function(response){
		   console.log(response);
		   if(response && !response.error){
				this.Callback(response.likes);
		   }else{
				this.Callback(0);
		   }
		};
	}

	function displayFBLikes(){
	    var _PageId = "1490322427928620";
		var likeApiReq = new FBGetPageLikes(_PageId);
		likeApiReq.Callback = function(response){
			$(".no-of-likes b").html(response);
		};
		FBApiGetCall(_AccessToken, likeApiReq);
	}
	
	function loadImage(){
		var _ImageId = '1490583157902547';
		var fbImageReqRes = new FBFetchImageReqRes(_ImageId);
		FBApiGetCall(_AccessToken, fbImageReqRes);
	}
	  
	  
	function FBLikeAction(){
		
		FB.getLoginStatus(function(reponse){
		
			console.log(reponse);
		
		});
	}

/* EOC: FB Gallery */

app.controller('EmailController',['$scope','$http',function EmailController($scope,$http){
	$scope.email = {
		text: ''
	};
	
	$scope.addClicked=false;
	$scope.addEmail=function($event){
		
		
		if($scope.emailForm.$valid){
			$(".get-email .fa-wifi").hide();
			$(".get-email .loading-anim").show();
			$scope.addClicked=true;
			$http({
			url: '/php/addemail.php',
			method: "POST",
			data: 'email='+document.getElementById("temail").value,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function (data, status, headers, config) {
				console.log(data);
				$('.get-email').hide();
				$('.thank-you').show();
			}).error(function (data, status, headers, config) {});
			
		}
		else{
		}
		
		
	};
}]);

app.controller('AppController', ['$scope','$rootScope','$document','$timeout','$window','ngDialog','$http', function AppController($rootScope, $document, $timeout, $scope, $window, ngDialog, $http) {
	
	
	
	 
	var self = this;
	
	
	
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
	
	self.sharePage=function(socialNetwork){
		var width  = 575,
		height = 400,
		left   = ($(window).width()  - width)  / 2,
		top    = ($(window).height() - height) / 2,
		opts   = 'status=1' +
				 ',width='  + width  +
				 ',height=' + height +
				 ',top='    + top    +
				 ',left='   + left;
		var url;
		switch(socialNetwork){
			case 'twitter':
				url="https://twitter.com/intent/tweet?text=Join%20more%20than%202000%20people%20at%20the%20BIGGEST%20Zumba%20Festival%20in%20Dubai&url=http%3A%2F%2Fwww.zumbafestdxb.com&via=ZumbaFestDXB";
				break;
			case 'gplus':
				url="https://plus.google.com/share?url=http://www.zumbafestdxb.com";
				break;
		}
		
		window.open(url, 'twitter', opts);

		return false;
	};
	
	self.showDialog=function(url){
		if(url=='TERMSOFSERVICE.html'){
			styleClass='ngdialog-theme-default ngdialog-theme-wide';
		}
		else{
			styleClass='ngdialog-theme-default';
		}
		ngDialog.open({ template: url, className: styleClass });
	};
	
	
	
	$rootScope.createGallery=function(imgArray){
		$("body").ready(function(){

			self.images = imgArray;

			$rootScope.$apply();


			$(".ng-isolate-scope .ng-overlay").appendTo("body");
			$(".ng-isolate-scope .ng-overlay").remove();

			$(".ng-isolate-scope .ng-gallery-content").appendTo("body");
			$(".ng-isolate-scope .ng-gallery-content").remove();



			/*$(".ng-gallery .ng-scope").each(function(){
				$(this).append('<div class="img-overlay"><i class="fa fa-share-alt"></i><i class="fa fa-thumbs-up"></i></div>');
			});*/
		});
	};
	
	$rootScope.loadFBData=function(){
		var _albumId = '1490323137928549';
		//var fbPhotoreqRes = new FBAlbumPhotosReqRes(_albumId);
		var fbPhotoreqRes = new FetchAlbumPhotos(_albumId);
		fbPhotoreqRes.CallBackFunction = function(ImageArray){
			imgArray=[];
			ImageArray.forEach(function(img,k){
				imgArray.push({
					'thumb':img.thumb.url,
					'img':img.image.url,
					'description':img.description
				});
			});
		
		
			angular.element(document.getElementById('rt')).scope().createGallery(imgArray);
		};
		FBApiGetCall(_AccessToken, fbPhotoreqRes);
		
		displayFBLikes();
	};
	
	$rootScope.mapHeight=37;
	
	
	self.showMenu=function(){
		document.querySelector(".menu").style.display="block";	
	};
	
	self.hideMobileMenu=function(){
		document.querySelector(".menu").removeAttribute("style");	
	};
	
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



window.onload=function(){
	w=250*document.querySelectorAll(".ng-gallery img").length;
	//document.querySelector(".ng-gallery").style.width=w+"px";
	angular.element(document.getElementById('rt')).scope().loadFBData();
	
	
	
	$(document).scrollTop(0);
	$(".loading-overlay").fadeOut();
	$("body").css({'overflow-y':'scroll'});
	$(".caption").addClass("bounce-in");
	$(".tagline").addClass("bounce-in");
	
	
};

app.directive("vscroll", function () {
    return function(scope, element, attrs) {
		
        angular.element(document.querySelector(".ng-gallery")).bind("scroll", function() {
             console.log(this.scrollLeft);
            scope.$apply();
        });
    };
});