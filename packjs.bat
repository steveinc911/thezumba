@echo off
node node_modules/uglify-js/bin/uglifyjs -o js/addons/lodash.min.js custom_modules/lodash/lodash.js
node node_modules/uglify-js/bin/uglifyjs -o js/addons/lodash.min.js bower_components/ngGallery/src/js/ngGallery.js
node node_modules/uglify-js/bin/uglifyjs -o js/addons/ngGallery.min.js node_modules/angular-sanitize/angular-sanitize.js
node node_modules/uglify-js/bin/uglifyjs -o js/addons/angular-ui-router.min.js node_modules/ui-router/angular-ui-router.js
node node_modules/uglify-js/bin/uglifyjs -o js/addons/angular-scroll-animate.min.js node_modules/angular-scroll-animate/dist/angular-scroll-animate.js
node node_modules/uglify-js/bin/uglifyjs -o js/addons/angular-smooth-scroll.min.js bower_components/ngSmoothScroll/angular-smooth-scroll.js
node node_modules/uglify-js/bin/uglifyjs -o js/addons/angular-timeline.min.js node_modules/angular-timeline/dist/angular-timeline.js
node node_modules/uglify-js/bin/uglifyjs -o js/addons/index.min.js node_modules/angular-simple-logger/dist/index.js
node node_modules/uglify-js/bin/uglifyjs -o js/addons/ngDialog.min.js node_modules/ng-dialog/js/ngDialog.js
xcopy node_modules\angular\angular.min.js js\addons\angular.min.js
xcopy js\angular-route.min.js js\addons\angular-route.min.js
xcopy node_modules\jquery\dist\jquery.min.js js\addons\jquery.min.js
cd js\addons
copy /b lodash.min.js+ngGallery.min.js+angular-route.min.js+angular-sanitize.min.js+angular-ui-router.min.js+angular-scroll-animate.min.js+angular-smooth-scroll.min.js+angular-timeline.min.js+index.min.js+ngDialog.min.js+jquery.min.js ..\alljs.js
cd ..\..
time /t