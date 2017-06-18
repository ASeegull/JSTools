var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function(){
	return gulp.src('styles/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('dest/styles'))
	.pipe(browserSync.stream())
})

gulp.task('browse', ['sass'], function() {
	browserSync.init({
		server: './'
	})
	
	gulp.watch('styles/*.sass', ['sass'])
	gulp.watch('*.html').on('change', browserSync.reload)
})

gulp.task('default', ['browse'])