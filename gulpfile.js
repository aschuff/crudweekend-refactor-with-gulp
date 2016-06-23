var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var beautify = require('gulp-jsbeautify');
// VALIDATORS
var validate = require('gulp-w3c-css');
var htmlhint = require('gulp-htmlhint');
var jsValidate = require('gulp-jsvalidate');

// SPECIFYING DEPENDENCIES
// gulp.task('default',['html', 'css', 'js'])
gulp.task('default', ['html', 'css', 'js'])

// SASS TO CSS
gulp.task('css', function (){
  gulp.src('./scss/styles.scss')
  .pipe(sass())
  .pipe(gulp.dest('./public'))
  .pipe(validate())
  .pipe(gulp.dest('./temp'));
});

// MINIFY
gulp.task('html', function(){
  gulp.src('./index.html')
    .pipe(htmlhint())
    // .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest('./public'))
});

//JS
gulp.task('js', function(){
  gulp.src('./js/app.js')
    .pipe(jsValidate())
    .pipe(concat('./js/app.js'))
    .pipe(babel({
      presets: ['es2015']
      }))
    .pipe(beautify({indent_Size: 2}))
    .pipe(gulp.dest('./public'))
});

// WATCH CHANGES
gulp.task('watch', function(){
  gulp.watch('./scss/styles.scss', ['css']);
  gulp.watch('./index.html', ['html']);
  gulp.watch('./js/app.js', ['js']);
});
