var gulp = require('gulp')
var vuize = require('./lib/index')
var gulpif = require('gulp-if')
var stylus = require('gulp-stylus')
var path = require('path')

var isStylus = function(file) {
  return path.extname(file.path) == 'styl'
}

gulp.task('default', function() {
  gulp.src('./*.+(js|styl|html)')
    .pipe(gulpif(isStylus, stylus()))
    .pipe(vuize())
    .pipe(gulp.dest('./'))
})

