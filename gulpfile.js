var gulp = require('gulp');
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

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
// Styles
gulp.task('styles', function() {
    return gulp.src('src/styles/main.scss')
        .pipe(sass({ style: 'expanded', }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});
// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
});
// Images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});
// Clean
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);
    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    // Watch image files
    gulp.watch('src/images/**/*', ['images']);
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
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