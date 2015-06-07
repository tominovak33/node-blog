var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('hello', function () {
	console.log('hello gulp task');
})

gulp.task('test_task', function () {
	console.log('test gulp task');
})

gulp.task('combined_task', ['hello', 'test_task'], function () {
	console.log('combined gulp task');
})

gulp.task('js', function() {
	gulp.src(['angular-src/module.js','angular-src/**/*.js'])
		.pipe(concat('app.js'))
		//.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest('assets'))
})

gulp.task('watch:js', ['js'], function () {
	gulp.watch('angular-src/**/*js', ['js'])
})