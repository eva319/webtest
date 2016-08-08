var gulp = require('gulp');  
  
browserSync = require('browser-sync');  
   
// Start the server  
gulp.task('browser-sync', function() {  
    browserSync({  
        server: {  
            baseDir: "./app"  
        }  
    });  
});  
  
// 将bower的库文件对应到指定位置  
gulp.task('refBowerComponents',function() {  
    gulp.src('./bower_components/angularjs/angular.min.js')  
        .pipe(gulp.dest('./app/vender/js'));  
    gulp.src('./bower_components/angularjs/angular.min.js.map')  
        .pipe(gulp.dest('./app/vender/js'));  
    gulp.src('./bower_components/bootstrap/dist/js/bootstrap.min.js')  
        .pipe(gulp.dest('./app/vender/js'));  
    gulp.src('./bower_components/jquery/dist/jquery.min.js')  
        .pipe(gulp.dest('./app/vender/js'));  
    gulp.src('./bower_components/jquery/dist/jquery.min.map')  
        .pipe(gulp.dest('./app/vender/js'));  
    //css  
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')  
        .pipe(gulp.dest('./app/vender/css/'));  
});  
// Compile SASS & auto-inject into browsers  
gulp.task('sass', function () {  
    return gulp.src('./app/sass/*.scss')  
        .pipe(sass({includePaths: ['scss']}))  
        .pipe(gulp.dest('./app/styles/style.css'))  
        .pipe(browserSync.reload({stream:true}));  
});  
  
// Reload all Browsers  
gulp.task('bs-reload', function () {  
    browserSync.reload();  
});  
 var files = [  
    './app/*.html',  
    './app/images/**/*.*',  
    './app/views/**/*.html',  
    './app/scripts/**/*.js',  
    './app/styles/**/*.css'  
  ];  
// Watch scss AND html files, doing different things with each.  
gulp.task('default', ['browser-sync'], function () {  
    gulp.watch("scss/*.scss", ['sass']);  
    gulp.watch(files, ['bs-reload']);
});