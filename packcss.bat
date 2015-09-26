@echo off
xcopy /y node_modules\bootstrap\dist\css\bootstrap.min.css css\addons\bootstrap.min.css
node node_modules\uglifycss\uglifycss css\reset.css > css\addons\reset.min.css
node node_modules\uglifycss\uglifycss custom_modules\fontastic\styles.css > css\addons\fontastic.min.css
node node_modules\uglifycss\uglifycss node_modules\angular-timeline\dist\angular-timeline.css > css\addons\angular-timeline.min.css
node node_modules\uglifycss\uglifycss node_modules\angular-timeline\dist\angular-timeline-bootstrap.css > css\addons\angular-timeline-bootstrap.min.css
node node_modules\uglifycss\uglifycss node_modules\angular-timeline\dist\angular-timeline-animations.css > css\addons\angular-timeline-animations.min.css
node node_modules\uglifycss\uglifycss bower_components\ngGallery\src\css\ngGallery.css > css\addons\ngGallery.min.css
node node_modules\uglifycss\uglifycss node_modules\ng-dialog\css\ngDialog.css > css\addons\ngDialog.min.css
node node_modules\uglifycss\uglifycss node_modules\ng-dialog\css\ngDialog-theme-default.css > css\addons\ngDialog-theme-default.min.css
node node_modules\less\bin\lessc css\style.less css\style.css
node node_modules\uglifycss\uglifycss css\style.css > css\addons\style.min.css


cd css\addons
copy /b reset.min.css+bootstrap.min.css+fontastic.min.css+angular-timeline.min.css+angular-timeline-bootstrap.min.css+angular-timeline-animations.min.css+ngGallery.min.css+ngDialog.min.css+ngDialog-theme-default.min.css+style.min.css ..\allcss.css
cd ..\..
time /t


