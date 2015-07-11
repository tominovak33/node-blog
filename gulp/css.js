var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('./css /*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'css', 'variables'),  path.join(__dirname, 'css', 'global'), path.join(__dirname, 'css', 'sections') ]
    }))
    .pipe(gulp.dest('./assets'));
});

gulp.task('watch:less', ['less'], function () {
	gulp.watch('css/**/*.less', ['less'])
})