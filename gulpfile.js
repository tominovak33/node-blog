var gulp = require('gulp');

gulp.task('hello', function () {
	console.log('hello gulp task');
})

gulp.task('test_task', function () {
	console.log('test gulp task');
})

gulp.task('combined_task', ['hello', 'test_task'], function () {
	console.log('combined gulp task');
})