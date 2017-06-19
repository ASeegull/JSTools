var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat-css');
var del = require('del');
var copy  = require('gulp-copy');
var destination = 'dest';
var cssnano = require('gulp-cssnano');
var jshint = require('gulp-jshint');

gulp.task('copy', function() {
    var sourceFiles = ['dev/images/*.png', 'dev/fonts/*.*', 'dev/*.html', 'dev/styles/*.css'];
  return gulp
    .src(sourceFiles)
    .pipe(copy (destination, { prefix: 1 }))
});


gulp.task('del', function() {
  return del(destination)
});

gulp.task('sass', function(){
	return gulp.src('dev/styles/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('dev/styles'))
//    .pipe(minifyCSS())
//	.pipe(browserSync.stream())
});

gulp.task('browse', ['sass'], function() {
	browserSync.init({
		server: {
          baseDir: 'dev'
        },
      notify: false
	});
	
	gulp.watch('dev/styles/*.sass', ['sass']);
	   browserSync.watch(['dev/*.html', 'dev/styles/*.css', 'scripts/*.js']).on('change', browserSync.reload);
});

gulp.task('css-prod', function() {
  return gulp.src('dest/styles/*.css')
  .pipe(concat('style.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('dest/styles'));
})

gulp.task('default', ['browse']);
//
gulp.task('prod', ['del', 'copy']);