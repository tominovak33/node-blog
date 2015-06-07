var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('hello', function () {
	console.log('hello gulp task');
})

gulp.task('test_task', function () {
	console.log('test gulp task');
})

gulp.task('combined_task', ['hello', 'test_task'], function () {
	console.log('combined gulp task');
})

gulp.task('js-concat', function() {
	gulp.src('angular-src/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('assets'))
})