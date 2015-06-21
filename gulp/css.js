var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('css', function () {
    gulp.src('css/**/*.styl')
    	.pipe(stylus())
    	.pipe(gulp.dest('assets'))
})
 
gulp.task('less', function () {
  return gulp.src('./css/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'sections') ]
    }))
    .pipe(gulp.dest('./assets'));
});

gulp.task('watch:less', ['less'], function () {
	gulp.watch('css/**/*.less', ['less'])
})