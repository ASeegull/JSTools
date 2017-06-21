/* requirements */

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  concat = require('gulp-concat-css'),
  del = require('del'),
  copy = require('gulp-copy'),
  destination = 'dist',
  cssnano = require('gulp-cssnano'),
  jshint = require('gulp-jshint'),
  prefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify');


// ----- dev-tasks


// compils sass to css and adds vendor prefixes 
gulp.task('sass', () => {
  return gulp.src('dev/styles/*.sass')
    .pipe(sass())
    .pipe(prefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dev/styles'))
});


// looks for errors and warnings and compiles .js to es5
gulp.task('js', () => {
  return gulp.src('es6/script.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dev/scripts/script.js'));
});

// reloads browser-sync on change of html, css, js files 
gulp.task('browse', ['sass'], () => {
  browserSync.init({
    server: {
      baseDir: 'dev'
    },
    notify: false
  });

  gulp.watch('dev/styles/*.sass', ['sass']);
  gulp.watch('dev/es6/*.js'), ['js'];
  browserSync.watch(['dev/*.html', 'dev/styles/*.css', 'scripts/*.js']).on('change', browserSync.reload);
});


// prepares files for release

// cleans dir for release
gulp.task('del', () => {
  return del(destination)
});

// simply copies files, that don't need additional processing

gulp.task('copy', () => {
  var sourceFiles = ['dev/images/*.png', 'dev/fonts/*.*', 'dev/*.html'];
  return gulp
    .src(sourceFiles)
    .pipe(copy(destination, {
      prefix: 1
    }))
});

// gathers all css to one file and minifies them 
gulp.task('css-prod', function() {
  return gulp.src('dev/styles/*.css')
    .pipe(concat('style.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'));
})

// gathers all js files (already babelified) to one file and minifies them 
gulp.task('js-prod', () => {
  return gulp.src(['dev/scripts/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
})


gulp.task('default', ['browse']);
//
gulp.task('prod', ['del', 'copy', 'css-prod', 'js-prod']);
